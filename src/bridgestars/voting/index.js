// react
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useId } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// @mui material components
import {
  Modal,
  Skeleton,
  Box,
  Card,
  Grid,
  Container,
  Button,
  Icon,
  Input,
  IconButton,
  Tabs,
  Tab,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  InputBase,
  ListItemText,
  paperClasses
} from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';
const { dark } = colors;

// About Us page sections
import Information from '../download/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/vote.svg';

//BRIDGESTARS
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import IssueCard from './sections/card';
import SigninForm from 'bridgestars/auth/sign-in';
import SearchBar from 'bridgestars/components/SearchBar';

//STYLE

//DATABASE
// import { firebaseApp } from 'firebase-config';
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
// } from 'firebase/auth';
import Parse from 'parse';
import { useParseQuery } from '@parse/react';
// import { useCollectionOnce } from 'react-firebase-hooks/firestore';

// import {
//   collection,
//   doc,
//   setDoc,
//   getDoc,
//   getFirestore,
//   query,
//   getDocs,
//   orderBy,
//   limit,
//   updateDoc,
//   increment,
//   arrayUnion,
//   arrayRemove,
// } from 'firebase/firestore';
import MKButton from 'otis/MKButton';

function parseDate(ms) {
  const d = new Date();
  d.setTime(ms);
  const month = d.toLocaleString('default', { month: 'short' });
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}

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
        ...rest
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
  // const auth = getAuth(firebaseApp);
  // const db = getFirestore(firebaseApp);

  // const requestsRef = collection(db, 'feedback/voting_app/requests');
  // const commentsRef = collection(db, 'feedback/voting_app/comments');
  // const usersRef = collection(db, 'feedback/voting_app/users');

  //TEMP
  // const q = query(requestsRef, orderBy('votes'), limit(10));
  const parseQuery = new Parse.Query('Post')
    .equalTo('type', 1)
    .select(
      'title',
      'votes',
      'comments',
      'author',
      'data',
      'reactions'
    )
    .include('author')
    .select('author.img', 'author.dispName');

  const {
    isLive, // Indicates that Parse Live Query is connected
    isLoading, // Indicates that the initial load is being processed
    isSyncing, // Indicates that the library is getting the latest data from Parse Server
    results, // Stores the current results in an array of Parse Objects
    count, // Stores the current results count
    error, // Stores any error
    reload // Function that can be used to reload the data
  } = useParseQuery(
    parseQuery, // The Parse Query to be used
    {
      enabled: true, // Enables the parse query (default: true)
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: false // Enables live query for real-time update (default: true)
    }
  );

  useEffect(() => {
    console.log('isLoading: ' + isLoading);
    console.log('isLive: ' + isLive);
    console.log('isSyncing: ' + isSyncing);
    console.log('count: ' + count);
    console.log('error: ' + error);
    console.log("...")

  }, [isLoading, isLive, isSyncing, count, error]);

  useEffect(() => {
    if (results && !isLoading && !error) {
      console.log(JSON.stringify(results))
      setLoadedDocs(results.map(r => { return { obj: r, votes: r.get("reactions")["1"] ?? 0, id: r.id } }));
      getUserVotes(Parse.User.current().id, results.map(r => r.id))
    }
  }, [results]);

  const [votedIssues, setVotedIssues] = useState([]);
  const [votedComments, setVotedComments] = useState([]);
  const [userData, setUserData] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (Parse.User.current()) {
      setSignedIn(true);
      setUserData(Parse.User.current());
    }
  }, [])


  useEffect(() => {
    if (Parse.User.current()) downloadUserDoc(userData.uid);
  }, [signedIn]);

  const [showSignin, setShowSignin] = useState(false);

  const [loadedDocs, setLoadedDocs] = useState([]);

  async function getUserVotes(uid, postIds) {
    const votes = await new Parse.Query('Reaction').equalTo('user', uid).equalTo("type", 1).containedIn("target", postIds).find(); //find posts which this user has voted
    console.log("FETCHED VOTED ISSUES: " + JSON.stringify(votes))
    console.log("contained in " + JSON.stringify(postIds))
    const posts = votes.map(vote => vote.get('target'));
    setVotedIssues([...posts, ...votedIssues]);
    //TODO load comments when opening issue, query specifaclly for that issue
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

  let downloadedUserData = false;
  async function downloadUserDoc(uid) {
    //TRY?
    try {
      //not needed I guess
    } catch (e) {
      if (e.code == 'permission-denied') {
        alert(
          'Permission denied. You are not signed in. If you just signed up the email might already be in use. In that case try to reset your password and sign in.'
        );
        await userData.logOut();
        setShowSignin(false);
        setShowSignin(true);
      } else if (e.code == 'not-found') {
        //IS THIS RIGHT?
        //create document
      } else if (e.toString().includes('offline')) {
        alert('You are offline, please try again later.');
      }
      else {
        alert(e.message);
      }
      console.log(JSON.stringify(e));
    }
  }

  async function handleVote(post) {
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
    console.log("signedin:" + signedIn)
    if (signedIn && votedIssues != null) {
      if (votedIssues.includes(postid)) {
        //local
        const v = votedIssues.filter((x) => x != postid);
        setVotedIssues(v);
        updateDocLocal(-1)
        var reactions = await new Parse.Query("Reaction")
          .equalTo("type", 1)
          .equalTo("target", postid)
          .equalTo("user", Parse.User.current().id)
          .find()
        if (reactions) await Parse.Object.destroyAll(reactions)
      } else {
        //local
        let v = [];
        v.push(...votedIssues);
        v.push(postid);
        setVotedIssues(v);
        updateDocLocal(1)
        await new Parse.Object("Reaction", { data: 1, type: 1, target: postid }).save()
        //remote
        // await Promise.all([
        //   updateDoc(doc(requestsRef, requestId), {
        //     votes: increment(1),
        //   }),
        //   updateDoc(doc(usersRef, userData.uid), {
        //     votedIssues: arrayUnion(requestId),
        //   }),
        // ]);
      }
    } else {
      setShowSignin(true);
    }
  }

  async function handleCommentVote(requestId, commentId) {
    // const updateDocs = (inc) => {
    //   const incr = (doc) => {
    //     doc.votes += inc;
    //     return doc;
    //   };
    //   setLoadedDocs(
    //     loadedDocs.map((doc) => (doc.id == requestId ? incr(doc) : doc))
    //   );
    // };
    const id = requestId + '/' + commentId;
    if (signedIn && votedComments != null) {
      if (votedComments.includes(id)) {
        //remove local
        setVotedComments(votedComments.filter((x) => x != id));
        // updateDocs(-1);

        //remote
        // await Promise.all([
        //   updateDoc(doc(commentsRef, requestId), {
        //     votes: increment(-1),
        //   }),
        //   updateDoc(doc(usersRef, userData.uid), {
        //     votedComments: arrayRemove(id),
        //   }),
        // ]);
        //console.log(votes.filter((x) => x != requestId));
      } else {
        //local
        let v = [];
        v.push(...votedIssues);
        v.push(requestId);
        setVotedIssues(v);
        // updateDocs(1);

        //remote
        // await Promise.all([
        //   updateDoc(doc(requestsRef, requestId), {
        //     votes: increment(1),
        //   }),
        //   updateDoc(doc(usersRef, userData.uid), {
        //     votedIssues: arrayUnion(requestId),
        //   }),
        // ]);
      }
    } else {
      setShowSignin(true);
    }
  }

  async function handleNewRequest(requestId) {
    if (signedIn) {
    } else {
      setShowSignin(true);
    }
  }

  async function getComments(id) {
    // if (signedIn) {
    try {
      // const res = await getDoc(doc(commentsRef, id));
      // if(res)
      // console.log(JSON.stringify(res.data().comments));
      // return res.data().comments.map((x) => {
      //   return {
      //     likes: x.likes,
      //     text: x.text,
      //     author: x.author,
      //     creationTime: parseDate(x.creationTime),
      //   };
      // });
    } catch (e) {
      console.log(e);
    }
    // } else {
    //   setShowSignin(true);
    // }
    return null;
  }


  const [sortBy, setSortBy] = useState(0);
  const [filterBy, setFilterBy] = useState('');
  return (
    <>
      <Modal
        open={showSignin}
        onClose={() => setShowSignin(false)}
        sx={{
          // outline: 'none',
          outline: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'scroll',
        }}
      // style={{
      //   outline: 0
      // }}
      >
        {/* <MKBox
          sx={{
            outline: 'none',
          }}
        > */}
        <Box sx={{ outline: 0 }}>
          <SigninForm
            modal
            modalexitcallback={() => setShowSignin(false)}
            header='To vote, please sign in to your Bridgestars account'
          />
        </Box>
        {/* </MKBox> */}
      </Modal>
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
                  variant='h2'
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
                    value={sortBy}
                    onChange={(e, n) => {
                      setSortBy(n);
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
                      value={filterBy}
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
                      onChange={(e) => setFilterBy(e.target.value)}
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
                  <SearchBar onSubmit={() => { }} onClick={() => { }} />
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
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
                    {loadedDocs.length == 0 && count != 0 &&
                      [1, 2, 3].map((k) => (
                        <Box mb={1.5} key={k}>
                          <IssueCard loading={true} key={k + '1'}></IssueCard>
                        </Box>
                      ))}
                    {loadedDocs.length != 0 &&
                      loadedDocs.map((doc) => (
                        <Box mb={1.5} key={doc.id.substring(0, 11)}>
                          <IssueCard
                            voted={votedIssues.includes(doc.id)}
                            nbrVotes={doc.votes}
                            nbrComments={doc.obj.get("num_comments")}
                            key={doc.id.substring(0, 10)}
                            getComments={() => getComments(doc.id)}
                            title={doc.obj.get("title")}
                            description={doc.obj.get("data")}
                            author={doc.obj.get("author")}
                            status={doc.obj.get("status")}
                            creationTime={parseDate(doc.obj.createdAt)}
                            handleVote={() => handleVote(doc)}
                            handleCommentVote={handleCommentVote}
                          ></IssueCard>
                        </Box>
                      ))}
                    {count == 0 &&
                      <Box
                        textAlign='center'
                      >
                        <MKTypography my={2} variant='h4'>No results found</MKTypography>
                      </Box>
                    }
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
