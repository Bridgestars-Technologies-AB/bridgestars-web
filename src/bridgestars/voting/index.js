

import { useEffect, useRef } from 'react';

// rellax
import Rellax from 'rellax';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

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

import { collection, doc, setDoc, getDoc, getFirestore, query, getDocs, orderBy, limit } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom';
import SigninForm from 'bridgestars/auth/sign-in';

import { useState } from 'react';
import { Modal } from '@mui/material';
import { Button } from '@mui/material';
import {Icon} from '@mui/material';
import { Input } from '@mui/material';
import { IconButton } from '@mui/material';

function parseDate(ms) {
  const d = new Date();
  d.setTime(ms);
  const month = d.toLocaleString('default', { month: 'short' });
  return `${d.getDate()} ${month} ${d.getFullYear()}`; 
}




function VotingPage() {

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  const requestsRef = collection(db, "feedback/voting_app/requests")
  const commentsRef = collection(db, 'feedback/voting_app/comments')
  const usersRef = collection(db, "feedback/voting_app/users")
  const q = query(requestsRef, orderBy("votes"), limit(10))
  const [value, loading, error] = useCollectionOnce(q)
  const [votes, setVotes] = useState({ id: true });
  const [userData, setUserData] = useState({})
  const [signedIn, setSignedIn] = useState(false);
  const [showSignin, setShowSignin] = useState(false)
  const [loadedDocs, setLoadedDocs] = useState({})

  async function handleVote(requestId) {
    if (signedIn) {

      // const docRef = doc(requestsRef, requestId);
      // const doc = await getDoc(docRef)
      // await setDoc(docRef, {
      //   votes: doc.data().votes + 1
      // })
      // //await setDoc()
      // setVotes({ requestId: true })
    }
    else {
      setShowSignin(true)
    }
  }
  async function handleNewRequest(requestId) {
    if (signedIn) {
      const docRef = doc(requestsRef, requestId);
      const doc = await getDoc(docRef);
      await setDoc(docRef, {
        votes: doc.data().votes + 1,
      });
      //await setDoc()
      setVotes({ requestId: true });
    }
    else {
      setShowSignin(true)
    }
  }


  onAuthStateChanged(auth, (user) => {
    //signOut(auth); //RELOAD WITH THIS TO SIGN OUT

    if (!signedIn && user) {
      console.log(user)
      setUserData(user)
      setSignedIn(true);
      setShowSignin(false)
      
    } else if(!user) {
      console.log("signed out")
      setUserData(null)
      setSignedIn(false);
    }
  });



  const style = {
    position: 'absolute',
    //top: '20%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'white',
    border: '0px',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={showSignin}
        onClose={() => setShowSignin(false)}
        style={{ overflow: 'scroll' }}
      >
        <MKBox
          style={style}
          mt={3}
          //textAlign='center'
          width={{ xs: '100%', sm: '100%', md: '70%' }}
        >
          <Button
            mx='auto'
            mb={-1}
            width={{ xs: '100%', sm: '100%', md: '70%' }}
            variant='contained'
            fullWidth
            size='large'
            color='error'
            onClick={() => setShowSignin(false)}
          >
            Close <Icon>close</Icon>
          </Button>
          <SigninForm modal={true} />
          {/* <Button
            fullWidth
            variant='contained'
            size='large'
            color='error'
            onClick={() => setShowSignin(false)}
          >
            Close <Icon>close</Icon>
          </Button> */}
        </MKBox>
      </Modal>
      <Grid container width='100%' justifyContent='center'>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: 4,
            mb: 4,
            width: { xxl: 1600, xl: '100%' },
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <BridgestarsNavbar
            routes={routes.filter((r) => r.name != 'Download')}
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
            //relative
            //transparent
          />
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
          <MKBox p={3}>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value &&
              // setLoadedDocs(value.docs) &&
              value.docs.map((doc) => (
                <IssueCard
                  // voted={votes[doc.id]}
                  key={doc.id}
                  mb={2}
                  title={doc.data().title}
                  description={doc.data().description}
                  author={doc.data().author}
                  status={doc.data().status}
                  creationTime={parseDate(doc.data().creationTime)}
                  handleVote={() => handleVote(doc.id)}
                ></IssueCard>
              ))}
          </MKBox>
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default VotingPage;
