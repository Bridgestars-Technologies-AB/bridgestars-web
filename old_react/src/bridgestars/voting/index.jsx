// react
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

// @mui material components
import {
  Button,
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
import MKButton from 'otis/MKButton';
import colors from 'assets/theme/base/colors';
const { dark } = colors;
// About Us page sections

// Routes
import routes from 'constants/routes';

import { useSearchParams } from 'react-router-dom';
// Images
import bgImage from 'assets/images/bridgestars/vote.svg';

//BRIDGESTARS
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import IssueCard from './sections/card';
import SigninForm from 'bridgestars/auth/sign-in';
import SearchBar from 'bridgestars/components/SearchBar';
import handleInvalidSession from 'bridgestars/tools/handleInvalidSession';
import NewRequestDialog from 'bridgestars/voting/newRequest';
import SigninModal from 'bridgestars/components/modal';
//STYLE

import { useSnackbar } from 'notistack';
// import { balancer } from 'react-wrap-balancer';
//DATABASE
import * as STATUS from 'bridgestars/voting/status';

function VotingPage() {
  //search filter etc
  function getDefaultQuery() {
    return new Parse.Query('Post')
      .equalTo('type', 1)
      .equalTo('archived', false)
      .select(
        'info',
        'title',
        'comments',
        'author',
        'data',
        'reactions',
        'chat',
        'subtype'
      );
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [parseQuery, setParseQuery] = useState(getDefaultQuery());

  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState();
  const [count, setCount] = useState();
  const [counts, setCounts] = useState();
  const [error, setError] = useState();

  const [searchBarText, setSearchBarText] = useState('');
  const [searchVal, setSearchVal] = useState(undefined);
  const [filterVal, setFilterVal] = useState('');
  const [sortVal, setSortVal] = useState(0);

  function getFilteredQuery(props) {
    let q;
    if (searchVal) {
      q = Parse.Query.or(
        getDefaultQuery().contains('title', searchVal),
        // getDefaultQuery().fullText('title', searchVal),
        // getDefaultQuery().fullText('title', searchVal),
        getDefaultQuery().contains('data', searchVal)
      );
    } else q = getDefaultQuery();
    if (
      (filterVal && filterVal !== 'all') ||
      (props?.subType && props?.subType !== 'all')
    ) {
      const types = {
        unknown: 0,
        new: 1,
        reviewed: 2,
        planned: 3,
        'in progress': 4,
        'in beta': 5,
        done: 6,
        'already exists': 7,
        live: 8,
      };

      q.equalTo('subtype', types[props?.subType || filterVal]);
    }
    if (sortVal === 0 || sortVal === 1) {
      if (sortVal === 0) q.descending('createdAt');
      if (sortVal === 1) q.descending('reactions.1');
    }
    return q;
  }

  useEffect(() => {
    setIsLoading(true);
    setLoadedDocs([]);
    setParseQuery((_) => {
      const q = getFilteredQuery();
      loadQuery(q);
      getNewCounts();
      return q;
    });
  }, [searchVal, filterVal, sortVal]);

  useEffect(() => {
    setSearchBarText(searchVal);
  }, [searchVal]);

  const getNewCounts = () => {
    Promise.all(
      ['all', ...STATUS.getAllSubTypes()].map((x) =>
        getFilteredQuery({ subType: x }).count()
      )
    ).then(setCounts);
  };
  const loadQuery = (q) => {
    console.log('Fetching requests');
    setIsLoading(true);
    setCount(0);
    setResults(undefined);
    (q || parseQuery)
      .include('author')
      .select('author.img', 'author.dispName')
      .find()
      .then((res) => {
        setResults(() => {
          //makes erverything load at the same time! much nicer
          setCount(res.length);
          setIsLoading(false);
          return res;
        });
      })
      .catch((e) => {
        setError(e);
      });
  };

  // const [reload, setReload] = useState(loadQuery);

  async function onSignedOut() {
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

  const [urlParams, setUrlParams] = useSearchParams();
  const [linkedPost, setLinkedPost] = useState(undefined);
  useEffect(() => {
    // balanceText();
    if (urlParams.get('post')) {
      console.log('trying to find post');
      getDefaultQuery()
        .equalTo('objectId', urlParams.get('post'))
        .find()
        .then((x) => {
          if (x.length === 0) throw new Error('Linked post could not be found');
          enqueueSnackbar('Opening linked post...', { variant: 'success' });
          setLinkedPost({ doc: x[0], expanded: true });
        })
        .catch((e) => enqueueSnackbar(e.message, { variant: 'error' }));
    }
    // if (request) {
    //   alert('tring to fetch requset: ', request);
    // }
  }, []);

  useEffect(() => {
    // console.log('isLoading: ' + isLoading);
    // console.log('count: ' + count);
    // console.log('error: ' + error);
    // console.log('results: ', results);
    // console.log('...');
    // if (error?.message?.includes('Invalid session token')) onSignedOut();
    // handleInvalidSession(error, onSignedOut)
  }, [isLoading, count, error, results]);

  useEffect(() => {
    // console.log('updating loadedDocs');
    // console.log(Boolean(results));
    // console.log(Boolean(isLoading));
    // console.log(Boolean(error));
    if (results && !isLoading && !error) {
      // console.log('updating loadedDocs');
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
      //console.log('results where updated but query has errors??');
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
    // console.log('Parse.user.current(): ' + !!Parse.User.current());
  }, [signedIn]);

  async function getUserVotes(uid, postIds) {
    if (postIds.length > 0 && Parse.User.current()) {
      try {
        const votes = await new Parse.Query('Reaction')
          .equalTo('user', uid)
          .equalTo('type', 1)
          .containedIn('target', postIds)
          .find(); //find posts which this user has voted
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
        setShowSignin('vote');
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
          header={`To ${showSignin}, please sign in to your Bridgestars account`}
        />
      </SigninModal>
      <NewRequestDialog
        show={showNewRequest}
        setShow={setShowNewRequest}
        createdCallback={loadQuery}
        editDoc={editDoc}
        setEditDoc={setEditDoc}
      />

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
              {/* <Balancer> */}
              <MKTypography variant='h2' mb={1} fontSize='40px'>
                The platform where{' '}
                <MKTypography
                  // component={'span'}
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
              {/* </Balancer> */}
            </Grid>
            {/* 
            <Grid textAlign='center'>
              <MKTypography variant='h4'>Browse Requests</MKTypography>
              <MKButton variant='gradient' color='info'>
                New Request
              </MKButton>
            </Grid> */}

            <Grid textAlign='center' mt='85px' mb='15px'>
              <MKTypography variant='h2'>Browse Requests</MKTypography>
              {/* <MKButton variant='gradient' color='info'>
                New Request
              </MKButton> */}
              <MKTypography
                variant='body1'
                onClick={() =>
                  Parse.User.current()
                    ? setShowNewRequest('view')
                    : setShowSignin('add a request')
                }
                color='bluegreen'
                fontWeight='medium'
                textGradient
                // sx={{ textDecoration: 'underline' }}
                sx={{ cursor: 'pointer' }}
                style={{
                  display: 'inline-flex',
                }}
              >
                <Box pr='4px' mt='6px' style={{ fontSize: '15px' }}>
                  {'⇒'}
                </Box>
                or create one here{' '}
                <Box pl='4px' mt='5px' style={{ fontSize: '15px' }}>
                  {'⇐'}
                </Box>
              </MKTypography>
              {/* <Box pr='4px' mt='-4px' style={{ fontSize: '25px' }}> */}
              {/*   {'>'} */}
              {/* </Box> */}
              {/* or create one here{' '} */}
              {/* <Box pl='4px' mt='-4px' style={{ fontSize: '25px' }}> */}
              {/*   {'<'} */}
              {/* </Box> */}
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
                      {STATUS.generateMenuItems(filterVal, counts)}
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
                      setSearchVal(val);
                    }}
                    onChange={(val) => {
                      setSearchBarText(val);
                      if (!val && searchVal) setSearchVal('');
                    }}
                    onClick={() => { }}
                    value={searchBarText}
                  />
                </Grid>
              </Grid>
              <Grid container mt={2.5}>
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
                        <MKTypography variant='h4'>
                          {JSON.stringify(error)}
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
                      <Box my={5} px='auto' sx={{ textAlign: 'center' }}>
                        <MKTypography variant='h3'>No posts found</MKTypography>
                        <MKTypography
                          variant='body1'
                          onClick={() => {
                            setFilterVal('');
                            setSearchBarText('');
                            setSearchVal('');
                          }}
                          color='bluegreen'
                          fontWeight='medium'
                          textGradient
                          // sx={{ textDecoration: 'underline' }}
                          sx={{ cursor: 'pointer' }}
                          style={{
                            display: 'inline-flex',
                          }}
                        >
                          reset filters
                          <Box pl='8px' mt='-5px' style={{ fontSize: '25px' }}>
                            {'↻'}
                          </Box>
                        </MKTypography>
                      </Box>
                    )}
                    {linkedPost && linkedPost.doc && (
                      <IssueCard
                        voted={votedIssues.includes(linkedPost.doc.id)}
                        nbrVotes={linkedPost.doc.get('reactions')?.['1']}
                        nbrComments={linkedPost.doc.get('comments')}
                        setNbrComments={(x) =>
                          linkedPost.doc.set('comments', x)
                        }
                        key={linkedPost.doc.id.substring(0, 10)}
                        post={linkedPost.doc}
                        title={linkedPost.doc.get('title')}
                        description={linkedPost.doc.get('data')}
                        author={linkedPost.doc.get('author')}
                        status={linkedPost.doc.get('subtype')}
                        creationTime={linkedPost.doc.createdAt}
                        handleVote={() => handleVote(doc)}
                        setShowSignin={setShowSignin}
                        archive={() =>
                          setLoadedDocs((docs) =>
                            docs.filter((x) => x.id != doc.id)
                          )
                        }
                        edit={() => {
                          setEditDoc((_) => linkedPost.doc);
                          setShowNewRequest((_) => true);
                        }}
                        expanded={linkedPost.expanded}
                        setExpanded={(t) => {
                          const post = linkedPost;
                          post.expanded = t;
                          setLinkedPost(post);
                        }}
                      ></IssueCard>
                    )}
                    {loadedDocs.length != 0 &&
                      loadedDocs.map((doc) => (
                        <Box mb={1.5} key={doc.id.substring(0, 11)}>
                          <IssueCard
                            voted={votedIssues.includes(doc.id)}
                            nbrVotes={doc.votes}
                            nbrComments={doc.obj.get('comments')}
                            setNbrComments={(x) => doc.obj.set('comments', x)}
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
