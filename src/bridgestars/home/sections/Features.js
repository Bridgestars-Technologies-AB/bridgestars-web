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
import Stack from "@mui/material/Stack";
import CountUp from "react-countup";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

// Otis Kit PRO examples
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import CounterInfoCard from "examples/Cards/InfoCards/CounterInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

function Features() {
  return (
    <MKBox component="section">
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={5} justifyContent={"space-evenly"} wrap={""}>
          <Grid item xs={4}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <CounterInfoCard
                countUp={{
                  end: 1000,
                  duration: "1.5",
                  useEasing: "false",
                  formattingFn: (value) =>
                    value === 1000 ? "UNLIMITED" : value,
                }}
                color="primary"
                icon="payment"
                title="Modular Components"
                description="The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever."
              />
              <SimpleInfoCard
                icon="insights"
                title="Great Features"
                description="People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest."
              />
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <SimpleInfoCard
                color="primary"
                count={1000}
                duration="3"
                useEasing="false"
                formattingFn={(value) => (value === 1000 ? "free" : value)}
                title="Analytics"
                description="Free analytics tool for improvning your play"
              />
              <SimpleInfoCard
                icon="sentiment_satisfied"
                title="Modern Interface"
                description="If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration."
              />
            </Stack>
          </Grid>

          <Grid item xs={4} sm={4}>
            <CenteredBlogCard
              image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              title="Get insights on Search"
              description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards."
              action={{
                type: "internal",
                route: "pages/company/about-us",
                color: "info",
                label: "find out more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Features;
