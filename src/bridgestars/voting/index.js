import { useEffect, useRef } from 'react';

// rellax
import Rellax from 'rellax';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';

// Otis Kit PRO examples

// About Us page sections
import Information from '../download/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/home_page.svg';
import BridgestarsFooter from 'bridgestars/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import IssueCard from './sections/card';
import React from 'react';
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

import { useNavigate } from 'react-router-dom';
import SigninForm from 'bridgestars/auth/sign-in';

import { useState } from 'react';
import { Modal } from '@mui/material';
import { Button } from '@mui/material';
import { Icon } from '@mui/material';
import { Input } from '@mui/material';
import { IconButton } from '@mui/material';
import { useId } from 'react';

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
      setLoadedDocs(value.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      }))
    }
  }, [value]);

  const [votes, setVotes] = useState([]);
  const [userData, setUserData] = useState({});

  const [signedIn, setSignedIn] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const [loadedDocs, setLoadedDocs] = useState([]);

  let downloadedUserData = false;
  async function downloadUserData(uid) {
    //TRY?
    console.log(1);
    console.log(uid);
    downloadedUserData = true;
    const d = await getDoc(doc(usersRef, uid));
    console.log(JSON.stringify(d.data()));
    console.log(2);
    //IF DOES NOT EXIST CREATE DOCUMENT
    setVotes(d.data().votes);
    console.log(3);
  }

  async function handleVote(requestId) {
    const updateDocs = (inc) => {
      const incr = (doc) => {
        doc.votes += inc
        return doc
      }
      setLoadedDocs(
        loadedDocs.map((doc) =>
          doc.id == requestId ? incr(doc) : doc
        )
      );
      
    };
    if (signedIn && votes != null) {
      if (votes.includes(requestId)) {
        //local
        const v = votes.filter((x) => x != requestId);
        setVotes(v);
        updateDocs(-1)

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

  onAuthStateChanged(auth, (user) => {
    //signOut(auth); //RELOAD WITH THIS TO SIGN OUT
    if (!signedIn && user && !downloadedUserData) {
      setUserData(user);
      setSignedIn(true);
      downloadUserData(user.uid);
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
          display:'flex',
          alignItems: 'center',
          justifyContent:'center'
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
            mt: 4,
            mb: 4,
            width: { xxl: 1600, xl: '100%' },
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
              <Grid item xs={12} sx={{ fontSize: '0.5vw' }}>
                <MKBox p={{ sx: 0, sm: 1, md: 2 }}>
                  {error && <strong>Error: {JSON.stringify(error)}</strong>}
                  {loading && <span>Collection: Loading...</span>}
                  {loadedDocs.length != 0 &&
                    loadedDocs.map((doc) => (
                      <Box mb={3}>
                        <IssueCard
                          voted={votes.includes(doc.id)}
                          nbrVotes={doc.votes}
                          nbrComments={doc.comments}
                          key={doc.id}
                          title={doc.title}
                          description={doc.description}
                          author={doc.author}
                          status={doc.status}
                          creationTime={parseDate(doc.creationTime)}
                          handleVote={() => handleVote(doc.id)}
                        ></IssueCard>
                      </Box>
                    ))}
                </MKBox>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={7} sx={{ fontSize: '0.5vw' }}>
                <MKBox p={{ sx: 0, sm: 1, md: 2 }}>
                  {error && <strong>Error: {JSON.stringify(error)}</strong>}
                  {loading && <span>Collection: Loading...</span>}
                  {loadedDocs.length != 0 &&
                    loadedDocs.map((doc) => (
                      <Box mb={3}>
                        <IssueCard
                          voted={votes.includes(doc.id)}
                          nbrVotes={doc.votes}
                          nbrComments={doc.comments}
                          key={doc.id}
                          title={doc.title}
                          description={doc.description}
                          author={doc.author}
                          status={doc.status}
                          creationTime={parseDate(doc.creationTime)}
                          handleVote={() => handleVote(doc.id)}
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
