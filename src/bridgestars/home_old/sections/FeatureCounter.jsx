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

// @mui material components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";
// Images
import image from "assets/images/examples/blog2.jpg";
import React, { useState } from 'react';
import { useRef } from 'react';

 
function FeatureCounter() {

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              color="primary"
              count={1000}
              duration="3"
              separator={":"}
              useEasing = "true"
              formattingFn={(value) => value === 1000 ? "unlimited" : value}
              title="Games"
              description="Of “high-performing” level are led by a certified project manager"
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <DefaultCounterCard
              color="primary"
              count={1000}
              duration="3"
              separator={":"}
              useEasing = "true"
              formattingFn={(value) => value === 1000 ? "unlimited" : value}
              title="Games"
              description="Of “high-performing” level are led by a certified project manager"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
            color="primary"
              count={30}
              title="Support"
              description="Actively engage team members that finishes on time"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FeatureCounter;
