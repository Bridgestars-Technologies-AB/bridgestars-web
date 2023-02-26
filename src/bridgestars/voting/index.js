// react
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

// @mui material components
import {
  Modal,
  Box,
  Card,
  Grid,
  Icon,
  Tabs,
  Tab,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';
const { dark } = colors;
// About Us page sections

// Routes
import routes from 'constants/routes';

// Images
import bgImage from 'assets/images/bridgestars/vote.svg';

//BRIDGESTARS
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import IssueCard from './sections/card';
import SigninForm from 'bridgestars/auth/sign-in';
import SearchBar from 'bridgestars/components/SearchBar';
import handleInvalidSession from 'bridgestars/tools/handleInvalidSession';
import DrawNewRequestDialog from 'bridgestars/voting/newRequest';
import SigninModal from 'bridgestars/components/modal';
//STYLE

//DATABASE
import Parse from 'parse';
import { useParseQuery } from '@parse/react';

function drawCountBadge({ nbr, ...rest }) {
  return (
    <MKBox
      width='min-content'
      height='min-content'
      mt={0.3}
      pt={0.2}
      pb={0.35}
      px={{ sm: 0.9, xs: 0.75 }}
      bgColor='primary'
      sx={{
        position: 'absolute',
        left: { sm: '30px', xs: '15px' },
        top: { sm: '-2px', xs: '-1.5px' },
        zIndex: 1000,
        borderRadius: '20px',
        ...rest,
      }}
    >
      <MKTypography
        position='relative'
        variant='h3'
        color='white'
        sx={{ fontSize: { sm: '12px', xs: '10px' } }}
      >
        {nbr}
      </MKTypography>
    </MKBox>
  );
}

function VotingPage() {
  //search filter etc

  const queryDefault = new Parse.Query('Post')
    .equalTo('type', 1)
    .equalTo('archived', false)
    .select(
      'title',
      'comments',
      'author',
      'data',
      'reactions',
      'chat',
      'subtype',
      'info'
    );

  const [parseQuery, setParseQuery] = useState(queryDefault);

  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState();
  const [count, setCount] = useState();
  const [error, setError] = useState();
  const [reload, setReload] = useState(loadQuery);

  const [searchVal, setSearchVal] = useState(undefined);
  const [filterVal, setFilterVal] = useState(undefined);
  const [sortVal, setSortVal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setLoadedDocs([]);
    console.log('usesEffect search');
    setParseQuery((_) => {
      let q = queryDefault;
      if (searchVal) {
        // q = Parse.Query.or(
        // q.fullText('title', searchVal),
        q = q.fullText('data', searchVal);
        // );
      }
      if (filterVal && filterVal != 'All') {
        q = q.equalTo('subtype', filterVal);
      }
      if (sortVal) {
        if (sortVal === 0) q = q.descending('createdAt');
        if (sortVal === 1) q = q.descending('reactions.1');
      }
      loadQuery(q);
      return q;
    });
  }, [searchVal, filterVal, sortVal]);

  function loadQuery(q) {
    (q || parseQuery)
      .include('author')
      .select('author.img', 'author.dispName')
      .find()
      .then((res) => {
        setIsLoading(false);
        setCount(res.length);
        setResults(res);
      })
      .catch((e) => {
        setError(e);
      });
  }

  async function onSignedOut() {
    console.log(error);
    if (signedIn) {
      // if (Parse.User.current() && error.message.includes("Invalid session token")) reload()
      setSignedIn(false);
      try {
        await Parse.User.logOut();
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    console.log('isLoading: ' + isLoading);
    console.log('count: ' + count);
    console.log('error: ' + error);
    console.log('results: ', results);
    console.log('...');
    // if (error?.message?.includes('Invalid session token')) onSignedOut();
    // handleInvalidSession(error, onSignedOut)
  }, [isLoading, count, error, results]);

  useEffect(() => {
    console.log('updating loadedDocs');
    console.log(Boolean(results));
    console.log(Boolean(!isLoading));
    console.log(Boolean(!error));
    if (results && !isLoading && !error) {
      console.log('updating loadedDocs');
      setLoadedDocs(
        results.map((r) => {
          return { obj: r, votes: r.get('reactions')['1'] ?? 0, id: r.id };
        })
      );
      if (Parse.User.current())
        getUserVotes(
          Parse.User.current().id,
          results.map((r) => r.id)
        );
    } else {
      console.log('results where updated but query has errors??');
    }
  }, [results]);

  const [votedIssues, setVotedIssues] = useState([]);
  const [userData, setUserData] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [loadedDocs, setLoadedDocs] = useState([]);

  useEffect(() => {
    // if (Parse.User.current()) {
    if (Parse.User.current()) setSignedIn(true);
    setUserData(Parse.User.current());
    // }
  }, [showSignin]);

  useEffect(() => {
    if (
      signedIn &&
      results &&
      !isLoading &&
      !error &&
      votedIssues.length == 0
    ) {
      // getUserVotes(
      //   userData?.id,
      //   loadedDocs.map((r) => r.id)
      // );
    }
  }, [signedIn]);

  useEffect(() => {
    console.log('signedIn: ' + signedIn);
    console.log('Parse.user.current(): ' + !!Parse.User.current());
  }, [signedIn]);

  async function getUserVotes(uid, postIds) {
    if (postIds.length > 0 && Parse.User.current()) {
      try {
        const votes = await new Parse.Query('Reaction')
          .equalTo('user', uid)
          .equalTo('type', 1)
          .containedIn('target', postIds)
          .find(); //find posts which this user has voted
        console.log('FETCHED VOTED ISSUES: ' + JSON.stringify(votes));
        console.log('contained in ' + JSON.stringify(postIds));
        const posts = votes.map((vote) => vote.get('target'));
        setVotedIssues([...posts, ...votedIssues]);
      } catch (error) {
        // if (!handleInvalidSession(error, onSignedOut)) {
        if (error?.message?.includes('Invalid session token')) {
          console.log('invalid session token when getting user votes');
          console.log('sessionid: ' + Parse.User.current().getSessionToken());
          return onSignedOut();
        }
        console.log(error);
        if (error.message.includes('Unable to connect to the Parse API'))
          alert('Could not connect, please check your internet connection.');
        else alert(error.message);
      }
      // }
    }
    // setVotedComments(votes.get("comments"));
  }

  // onAuthStateChanged(auth, (user) => {
  //   //signOut(auth); //RELOAD WITH THIS TO SIGN OUT
  //   if (!signedIn && user && !downloadedUserData) {
  //     setUserData(user);
  //     setSignedIn(true);
  //   } else if (!user) {
  //     console.log('signed out');
  //     setUserData(null);
  //     setSignedIn(false);
  //   }
  // });

  // let downloadedUserData = false;
  // async function downloadUserDoc(uid) {
  //   //TRY?
  //   try {
  //     //not needed I guess
  //   } catch (e) {
  //     if (e.code == 'permission-denied') {
  //       alert(
  //         'Permission denied. You are not signed in. If you just signed up the email might already be in use. In that case try to reset your password and sign in.'
  //       );
  //       await userData.logOut();
  //       setShowSignin(false);
  //       setShowSignin(true);
  //     } else if (e.code == 'not-found') {
  //       //IS THIS RIGHT?
  //       //create document
  //     } else if (e.toString().includes('offline')) {
  //       alert('You are offline, please try again later.');
  //     }
  //     else {
  //       alert(e.message);
  //     }
  //     console.log(JSON.stringify(e));
  //   }
  // }

  async function handleVote(post) {
    try {
      const postid = post.id;
      const updateDocLocal = async (inc) => {
        const incr = (doc) => {
          doc.votes += inc;
          return doc;
        };
        setLoadedDocs(
          loadedDocs.map((doc) => (doc.id == postid ? incr(doc) : doc))
        );
      };
      console.log('signedin:' + signedIn);
      if (Parse.User.current()) {
        if (votedIssues == null) setVotedIssues([]);
        if (votedIssues.includes(postid)) {
          //local
          const v = votedIssues.filter((x) => x != postid);
          setVotedIssues(v);
          updateDocLocal(-1);
          var reactions = await new Parse.Query('Reaction')
            .equalTo('type', 1)
            .equalTo('target', postid)
            .equalTo('user', userData?.id)
            .find();
          if (reactions) await Parse.Object.destroyAll(reactions);
        } else {
          //local
          let v = [];
          v.push(...votedIssues);
          v.push(postid);
          setVotedIssues(v);
          updateDocLocal(1);
          await new Parse.Object('Reaction', {
            data: 1,
            type: 1,
            target: postid,
          }).save();
        }
      } else {
        setShowSignin(true);
      }
    } catch (error) {
      // if (!handleInvalidSession(error, onSignedOut)) {
      console.log(error);
      if (error.message.includes('Unable to connect to the Parse API'))
        return alert(
          'Could not connect, please check your internet connection.'
        );
      alert(error.message);
    }
    // }
  }

  async function handleNewRequest(requestId) {
    if (signedIn) {
    } else {
      setShowSignin(true);
    }
  }

  const [editDoc, setEditDoc] = useState(undefined);
  return (
    <>
      <SigninModal open={showSignin} onClose={() => setShowSignin(false)}>
        <SigninForm
          open={showSignin}
          modal
          modalexitcallback={() => setShowSignin(false)}
          header='To vote, please sign in to your Bridgestars account'
        />
      </SigninModal>
      {DrawNewRequestDialog(
        showNewRequest,
        setShowNewRequest,
        reload,
        editDoc,
        setEditDoc
      )}

      <Grid container width='100%' justifyContent='center'>
        <Card
          sx={{
            // px: { xs: 0, sm: 1, lg: 2 },
            pt: 2,
            mx: { xs: 0, sm: 1, md: 2, lg: 3 },
            mt: { xs: 0, sm: 1, md: 2, lg: 3 },
            mb: { xs: 0, sm: 1, md: 2, lg: 3 },
            width: '100%',
            maxWidth: '1250px',
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <BridgestarsNavbar
            routes={routes.filter((r) => r.name != 'Vote')}
            sticky
            dark
            fullWidth
          />
          <Box sx={{ px: { xs: 0, sm: 1, lg: 3 } }}>
            <Grid container item alignItems='center' flexDirection='column'>
              <MKBox
                mt={10}
                component='img'
                src={bgImage}
                width={{ xs: '75%', sm: '45%', xl: '35%' }}
              ></MKBox>
            </Grid>
            <Grid
              container
              item
              flexDirection='column'
              alignItems='center'
              textAlign={'center'}
              xs={12}
              lg={8}
              sx={{ textAlign: 'center', mx: 'auto' }}
              mb={6}
              mt={4}
            >
              <MKTypography variant='h2' mb={1} fontSize='40px'>
                The platform where{' '}
                <MKTypography
                  variant='inherit'
                  display='inline-block'
                  // color='primary'
                  mb={1}
                  fontSize='40px'
                  style={{ textDecorationLine: 'underline' }}
                >
                  you
                </MKTypography>{' '}
                decide what's next{' '}
              </MKTypography>
              <MKTypography variant='body2' color='text' px={1}>
                This page is for you who want to contribute to the Bridgestars
                platform. You can interact with existing requests or submit your
                own. We read everything and will take great consideration to
                this page when developing Bridgestars.
              </MKTypography>
            </Grid>
            {/* 
            <Grid textAlign='center'>
              <MKTypography variant='h4'>Browse Requests</MKTypography>
              <MKButton variant='gradient' color='info'>
                New Request
              </MKButton>
            </Grid> */}

            <Grid textAlign='center'>
              <MKTypography variant='h2'>Browse Requests</MKTypography>
              {/* <MKButton variant='gradient' color='info'>
                New Request
              </MKButton> */}
              <MKTypography
                variant='body2'
                onClick={() =>
                  Parse.User.current()
                    ? setShowNewRequest(true)
                    : setShowSignin(true)
                }
                color='info'
                fontWeight='medium'
                textGradient
                style={{ textDecorationLine: 'underline' }}
                sx={{ cursor: 'pointer' }}
              >
                or create one here
              </MKTypography>
            </Grid>

            <MKBox
              p={{ sx: 0, sm: 1, md: 2 }}
              sx={{ maxWidth: '800px' }}
              mx='auto'
            >
              <Grid
                container
                item
                md={12}
                spacing={1.1}
                justifyContent={'space-between'}
              >
                <Grid item sm={4} xs={12} order={{ xs: 1, sm: 0 }}>
                  <Tabs
                    value={sortVal}
                    onChange={(e, n) => {
                      setSortVal(n);
                    }}
                  >
                    <Tab label='Recent' icon={<Icon>schedule</Icon>} />
                    <Tab label='Popular' icon={<Icon>trending_up</Icon>} />
                  </Tabs>
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                  justifyContent='center'
                  display='flex'
                  order={{ xs: 2, sm: 1 }}
                >
                  <FormControl fullWidth={false}>
                    <InputLabel
                      id='demo-simple-select-label'
                      sx={{
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '14px',
                        fontFamily: '"Roboto Slab", sans-serif',
                        color: dark.main,
                        // width:'100%',
                        // verticalAlign:'middle',
                        // textAlign:'center',
                        // lineHeight:'100%'
                      }}
                    >
                      Select Filter
                      {/* <MKTypography  variant='h3' fontSize='18px'>Select Filter</MKTypography> */}
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      value={filterVal}
                      label='selectfilte'
                      width='auto'
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa',
                        height: '42px',
                        fontSize: '18px',
                        fontFamily: '"Roboto Slab", sans-serif',
                        minWidth: '130px',
                        color: dark.main,
                        textAlign: 'center',
                      }}
                      onChange={(e) => setFilterVal(e.target.value)}
                      onClose={() => {
                        /*run query */
                      }}
                    >
                      <MenuItem value={'all'}>All</MenuItem>
                      <MenuItem value={'Reviewed'}>Reviewed</MenuItem>
                      <MenuItem value={'Planned'}>Planned</MenuItem>
                      <MenuItem value={'In Progress'}>In Progress</MenuItem>
                      <MenuItem value={'In Beta'}>In Beta</MenuItem>
                      <MenuItem value={'Already Exists'}>
                        Already Exists
                      </MenuItem>
                      <MenuItem value={'Live'}>
                        Live
                        {drawCountBadge(3)}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {/* <Select display='inline-block'>By Status</Select> */}
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                  justifyContent={{ xs: 'center', sm: 'end' }}
                  display='flex'
                  order={{ xs: 0, sm: 2 }}
                >
                  {/* <Button display='inline-block'>Search</Button> */}
                  <SearchBar
                    onSubmit={(val) => {
                      console.log('Searching for: ' + val);
                      setSearchVal(val);
                    }}
                    onClick={() => { }}
                  />
                </Grid>
              </Grid>
              <Grid container mt={1.5}>
                <Grid
                  item
                  xs={12}
                  sx={{ fontSize: '0.5vw' }}
                  justifyContent='center'
                  alignItems='center'
                  display='flex'
                >
                  <MKBox width='100%'>
                    {error && (
                      <Box my={1.5} px='auto' sx={{ textAlign: 'center' }}>
                        <MKTypography variant='h3'>
                          {error.message}
                        </MKTypography>
                      </Box>
                    )}
                    {isLoading &&
                      [1, 2, 3].map((k) => (
                        <Box mb={1.5} key={k}>
                          <IssueCard loading={true} key={k + '1'}></IssueCard>
                        </Box>
                      ))}
                    {!isLoading && !error && loadedDocs.length == 0 && (
                      <Box my={1.5} px='auto' sx={{ textAlign: 'center' }}>
                        <MKTypography variant='h3'>No posts found</MKTypography>
                      </Box>
                    )}
                    {loadedDocs.length != 0 &&
                      loadedDocs.map((doc) => (
                        <Box mb={1.5} key={doc.id.substring(0, 11)}>
                          <IssueCard
                            voted={votedIssues.includes(doc.id)}
                            nbrVotes={doc.votes}
                            nbrComments={doc.obj.get('comments')}
                            key={doc.id.substring(0, 10)}
                            post={doc.obj}
                            title={doc.obj.get('title')}
                            description={doc.obj.get('data')}
                            author={doc.obj.get('author')}
                            status={doc.obj.get('subtype')}
                            creationTime={doc.obj.createdAt}
                            handleVote={() => handleVote(doc)}
                            setShowSignin={setShowSignin}
                            archive={() =>
                              setLoadedDocs((docs) =>
                                docs.filter((x) => x.id != doc.id)
                              )
                            }
                            edit={() => {
                              setEditDoc((_) => doc.obj);
                              setShowNewRequest((_) => true);
                            }}
                          ></IssueCard>
                        </Box>
                      ))}
                  </MKBox>
                </Grid>
              </Grid>
            </MKBox>
          </Box>
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default VotingPage;
