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
  InputBase
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

//STYLE

//DATABASE
import { firebaseApp } from 'firebase-config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getFirestore,
  query,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

function parseDate(ms) {
  const d = new Date();
  d.setTime(ms);
  const month = d.toLocaleString('default', { month: 'short' });
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}


function VotingPage() {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const requestsRef = collection(db, 'feedback/voting_app/requests');
  const commentsRef = collection(db, 'feedback/voting_app/comments');
  const usersRef = collection(db, 'feedback/voting_app/users');

  //TEMP
  const q = query(requestsRef, orderBy('votes'), limit(10));
  const [value, loading, error] = useCollectionOnce(q);
  useEffect(() => {
    if (value && !loading && !error) {
      setLoadedDocs(
        value.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    }
  }, [value]);

  const [votedIssues, setVotedIssues] = useState([]);
  const [votedComments, setVotedComments] = useState([]);
  const [userData, setUserData] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    if (signedIn) downloadUserDoc(userData.uid);
  }, [signedIn]);
  const [showSignin, setShowSignin] = useState(false);

  const [loadedDocs, setLoadedDocs] = useState([]);

  let downloadedUserData = false;
  async function downloadUserDoc(uid) {
    //TRY?
    try {
      console.log(1);
      console.log(uid);
      downloadedUserData = true;
      const d = await getDoc(doc(usersRef, uid));
      console.log(JSON.stringify(d.data()));
      console.log(2);
      //IF DOES NOT EXIST CREATE DOCUMENT
      setVotedIssues(d.data().votedIssues);
      setVotedComments(d.data().votedComments);
      console.log(3);
    } catch (e) {
      if (e.code == 'permission-denied') {
        alert(
          'Permission denied. You are not signed in. If you just signed up the email might already be in use. In that case try to reset your password and sign in.'
        );
        signOut(auth);
        setShowSignin(false);
        setShowSignin(true);
      } else if (e.code == 'not-found') {
        //IS THIS RIGHT?
        //create document
      } else if (e.toString().includes('offline')) {
        alert('You are offline, please try again later.');
      }
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }

  async function handleVote(requestId) {
    const updateDocs = (inc) => {
      const incr = (doc) => {
        doc.votes += inc;
        return doc;
      };
      setLoadedDocs(
        loadedDocs.map((doc) => (doc.id == requestId ? incr(doc) : doc))
      );
    };
    if (signedIn && votedIssues != null) {
      if (votedIssues.includes(requestId)) {
        //local
        const v = votedIssues.filter((x) => x != requestId);
        setVotedIssues(v);
        updateDocs(-1);

        //remote
        await Promise.all([
          updateDoc(doc(requestsRef, requestId), {
            votes: increment(-1),
          }),
          updateDoc(doc(usersRef, userData.uid), {
            votedIssues: arrayRemove(requestId),
          }),
        ]);
        //console.log(votes.filter((x) => x != requestId));
      } else {
        //local
        let v = [];
        v.push(...votedIssues);
        v.push(requestId);
        setVotedIssues(v);
        updateDocs(1);

        //remote
        await Promise.all([
          updateDoc(doc(requestsRef, requestId), {
            votes: increment(1),
          }),
          updateDoc(doc(usersRef, userData.uid), {
            votedIssues: arrayUnion(requestId),
          }),
        ]);
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
        await Promise.all([
          updateDoc(doc(commentsRef, requestId), {
            votes: increment(-1),
          }),
          updateDoc(doc(usersRef, userData.uid), {
            votedComments: arrayRemove(id),
          }),
        ]);
        //console.log(votes.filter((x) => x != requestId));
      } else {
        //local
        let v = [];
        v.push(...votedIssues);
        v.push(requestId);
        setVotedIssues(v);
        updateDocs(1);

        //remote
        await Promise.all([
          updateDoc(doc(requestsRef, requestId), {
            votes: increment(1),
          }),
          updateDoc(doc(usersRef, userData.uid), {
            votedIssues: arrayUnion(requestId),
          }),
        ]);
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
    if (signedIn) {
      try {
        const res = await getDoc(doc(commentsRef, id));
        console.log(JSON.stringify(res.data().comments));
        return res.data().comments.map((x) => {
          return {
            likes: x.likes,
            text: x.text,
            author: x.author,
            creationTime: parseDate(x.creationTime),
          };
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      setShowSignin(true);
    }
    return null;
  }

  onAuthStateChanged(auth, (user) => {
    //signOut(auth); //RELOAD WITH THIS TO SIGN OUT
    if (!signedIn && user && !downloadedUserData) {
      setUserData(user);
      setSignedIn(true);
    } else if (!user) {
      console.log('signed out');
      setUserData(null);
      setSignedIn(false);
    }
  });

  const [sortBy, setSortBy] = useState(0);
  const [filterBy, setFilterBy] = useState('');
  return (
    <>
      <Modal
        open={showSignin}
        onClose={() => setShowSignin(false)}
        sx={{
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'scroll',
        }}
      >
        {/* <MKBox
          sx={{
            outline: 'none',
          }}
        > */}
        <SigninForm
          modal
          modalExitCallback={() => setShowSignin(false)}
          header='To vote, please sign in to your Bridgestars account'
        />
        {/* </MKBox> */}
      </Modal>
      <Grid container width='100%' justifyContent='center'>
        <Card
          sx={{
            // px: { xs: 0, sm: 1, lg: 2 },
            py: 2,
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

            <MKBox
              p={{ sx: 0, sm: 1, md: 2 }}
              sx={{ maxWidth: '800px' }}
              mx='auto'
            >
              <Grid
                container
                item
                md={12}
                spacing={1.4}
                justifyContent={'space-between'}
              >
                <Grid item sm={4} xs={12}>
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
                        height: '42px',
                        fontSize: '18px',
                        backgroundColor: '#f8f9fa',
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
                      <MenuItem value={'planned'}>Planned</MenuItem>
                      <MenuItem value={3}>New</MenuItem>
                      <MenuItem value={3}>MNEw axldasd asD </MenuItem>
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
                >
                  {/* <Button display='inline-block'>Search</Button> */}
                  <InputBase
                    sx={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: 3,
                      px: `12px`,
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '14px',
                      fontFamily: '"Roboto Slab", sans-serif',
                      color: dark.main,
                    }}
                    // sx={{
                    //   root: {},
                    //   input: {
                    //     fontSize: 16,
                    //   },
                    //   adornedStart: {
                    //     '& > *:first-child': {
                    //       // * is the icon at the beginning of input
                    //       fontSize: 20,
                    //       color: 'white',
                    //       marginRight: '10px',
                    //     },
                    //   },
                    // }}
                    placeholder={'Search...'}
                    endAdornment={
                      <IconButton
                        size='small'
                        sx={{
                          backgroundColor: '#e8e9ea',
                          '&:hover': {
                            backgroundColor: '#d8d9da',
                          },
                        }}
                      >
                        <Icon style={{ color: dark.main }}>search</Icon>
                      </IconButton>
                    }
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
                  <MKBox>
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
                    {true &&
                      [1, 2].map((k) => (
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
                            nbrComments={doc.comments}
                            key={doc.id.substring(0, 10)}
                            getComments={() => getComments(doc.id)}
                            title={doc.title}
                            description={doc.description}
                            author={doc.author}
                            status={doc.status}
                            creationTime={parseDate(doc.creationTime)}
                            handleVote={() => handleVote(doc.id)}
                            handleCommentVote={handleCommentVote}
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
