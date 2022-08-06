// react
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useId } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import { Button } from '@mui/material';
import { Icon } from '@mui/material';
import { Input } from '@mui/material';
import { IconButton } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';


// About Us page sections
import Information from '../download/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/home_page.svg';

//BRIDGESTARS
import BridgestarsFooter from 'bridgestars/footer/BridgestarsFooter';
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

  const [votes, setVotes] = useState([]);
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
      setVotes(d.data().votes);
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
      }
      else if (e.toString().includes("offline")) {
        alert("You are offline, please try again later.")
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
    if (signedIn && votes != null) {
      if (votes.includes(requestId)) {
        //local
        const v = votes.filter((x) => x != requestId);
        setVotes(v);
        updateDocs(-1);

        //remote
        await Promise.all([
          updateDoc(doc(requestsRef, requestId), {
            votes: increment(-1),
          }),
          updateDoc(doc(usersRef, userData.uid), {
            votes: arrayRemove(requestId),
          }),
        ]);
        //console.log(votes.filter((x) => x != requestId));
      } else {
        //local
        let v = [];
        v.push(...votes);
        v.push(requestId);
        setVotes(v);
        updateDocs(1);

        //remote
        await Promise.all([
          updateDoc(doc(requestsRef, requestId), {
            votes: increment(1),
          }),
          updateDoc(doc(usersRef, userData.uid), {
            votes: arrayUnion(requestId),
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
        console.log(JSON.stringify(res.data().comments))
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
            px: { xs: 0, sm: 1, lg: 3 },
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
            // action={
            //   window.innerWidth > 370
            //     ? {
            //         type: 'internal',
            //         route: '/home',
            //         label: 'back',
            //         color: 'primary',
            //       }
            //     : false
            // }
            sticky
            dark
            fullWidth
            // relative
            // transparent
          />
          <Box>
            <Grid container item alignItems='center' flexDirection='column'>
              <MKBox
                mt={10}
                mb={-2}
                component='img'
                src={bgImage}
                width={{ xs: '75%', sm: '45%', xl: '35%' }}
              ></MKBox>
            </Grid>
            <Grid container item md={12} justifyContent={'space-between'}>
              <Grid item md={3}>
                <Button>new request</Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ fontSize: '0.5vw' }}
                justifyContent='center'
                alignItems='center'
                display='flex'
              >
                <MKBox p={{ sx: 0, sm: 1, md: 2 }}>
                  {error && <strong>Error: {JSON.stringify(error)}</strong>}
                  {loading && <span>Collection: Loading...</span>}
                  {loadedDocs.length != 0 &&
                    loadedDocs.map((doc) => (
                      <Box mb={1.5} key={doc.id.substring(0, 11)}>
                        <IssueCard
                          voted={votes.includes(doc.id)}
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
                          maxWidth='850px'
                        ></IssueCard>
                      </Box>
                    ))}
                </MKBox>
              </Grid>
            </Grid>
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
