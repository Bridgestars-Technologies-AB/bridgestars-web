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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Coworking page sections
import Information from "bridgestars/home/sections/Information";
import Testimonials from "bridgestars/home/sections/Testimonials";
import AboutUs from "bridgestars/home/sections/AboutUs";
import Places from "bridgestars/home/sections/Places";

// Routes
import routes from "constants/routes";
import footerRoutes from "constants/footer.routes";

// Images
import bgImage from "assets/images/bridgeBG0.webp";
import linearHomepageGradient from "assets/theme/functions/linearHomepageGradient";
import FeatureCounter from "./sections/FeatureCounter.js";


export default function BridgestarsHome() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "internal",
          route: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
          label: "sign in",
          color: "primary",

                 /* "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",*/
        }}
        
        sticky
        brand="Bridgestars"
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: {linearHomepageGradient,rgba}, palette: { gradients } }) =>
            `${linearHomepageGradient([
              {color: rgba(gradients.primary.main, 0.6), percentage: 0},
              {color: `rgba(0, 0, 0, 0.25)`, percentage: 30},
              {color: `rgba(0, 0, 0, 0.25)`, percentage: 65},
              {color: rgba(gradients.secondary.main, 1), percentage: 100},
              //{color: `rgba(255, 0, 0, 0.5)`, percentage: 0},
              // {color: `rgba(0, 0, 0, 0.15)`, percentage: 35}
            ],135)}
            , url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            md={7}
            justifyContent={{ xs: "center", md: "start" }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <MKTypography
              variant="h1"
              color="primary"
              textGradient="true"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["5xl"],
                },
              })}
            >
              Bridgestars
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              mt={1}
              pr={{ md: 12, lg: 24, xl: 32 }}
              opacity={0.8}
            >
              The time is now. We are taking Contract Bridge to the next level.
            </MKTypography>
            <Stack direction="row" spacing={1} mt={6} mb={3}>
              <MKButton variant="gradient" color="primary">
                sign up for closed beta
              </MKButton>
              <MKButton variant="text" color="white">
                read more
              </MKButton>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <FeatureCounter/>
        <Information />
        <Testimonials />
        <AboutUs />
        <Places />
        <Container>
          <MKBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="xl"
            my={24}
            p={6}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8} lg={5}>
                <MKTypography variant="h5" color="white" fontWeight="bold">
                  For being a bright color. For standing out. But the time is now to be okay to be
                  the greatest you.
                </MKTypography>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ ml: "auto" }}>
                <MKBox width="12rem" ml="auto">
                  <MKButton variant="gradient" color="warning" fullWidth sx={{ boxShadow: "none" }}>
                    start now
                  </MKButton>
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
