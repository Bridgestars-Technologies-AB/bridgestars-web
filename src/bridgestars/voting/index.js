/*
=========================================================
* Otis Kit PRO - v2.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
import { Fragment } from 'react';
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
  const q = query(requestsRef, orderBy("votes"), limit(10))
  const [value, loading, error] = useCollectionOnce(q)


  return (
    <>
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
          <MKBox p={3}>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value &&
              value.docs.map((doc) => (
                <span>
                  {JSON.stringify(doc)}
                  <IssueCard
                    key={doc.id}
                    mb={2}
                    title={doc.data().title}
                    description={doc.data().description}
                    author={doc.data().author}
                    status={doc.data().status}
                    creationTime={parseDate(doc.data().creationTime)}
                  ></IssueCard>
                </span>
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
