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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import Steps from './Steps';
import { Icon } from '@mui/material';

function Information() {
  return (
    <>
      <MKBox component='section' py={6} mt={6}>
        <Container>
          <Grid container spacing={3} item xs={12} lg={8} mx='auto'>
            <MKTypography
              component='h6'
              variant='button'
              opacity={0.7}
              textTransform='uppercase'
              fontWeight='bold'
            >
              The idea
            </MKTypography>
            <MKTypography variant='h4' mb={3}>
              A unified platform for playing bridge online that is free and
              accessible for everyone
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              Why should you use Bridgestars instead of Bridge Base Online
              (BBO), Funbridge, RealBridge or any other bridge platform? That is
              an excellent question. For the past 20 years BBO has been
              dominating the online market of bridge, essentially having a
              monopoly on the market. The reason for this is that BBO offers a
              platform for bridge players around the world to play for free and
              as much as they want. This concept is very important, because we
              believe that bridge should always be accessible to everyone,
              regardless of the depth of their pockets.
              <br /> <br />
              The problem with BBO is that it is outdated. It was developed over
              20 years ago and has not kept up with the rest of the world when
              it comes to technological advancements. Therefore, Bridgestars
              offer a modern alternative to BBO, that is free for everyone and
              uses modern technology to maximize the user experience. Most
              importantly, we at Bridgestars have a very high priority on
              providing a user interface that is intuitive and easy to learn and
              use. All this, without lacking any functionality that is otherwise
              available on BBO, such as tournaments, live and delayed kibitzing,
              and ranking.
              <br /> <br />
              Other platforms have already noticed that BBO lacks this modern
              aspect. Funbridge is a great example of a platform that has
              implemented a more modern approach to its user interface. However,
              funbridge requires users to pay a monthly subscription fee in
              order to be able to play. We on the Bridgestars developer team
              want to combine the best of both worlds, offering a new and
              improved modern platform for bridge players, that is free to use
              for everyone!
              <br /> <br />
              <br /> <br />
            </MKTypography>

            <MKTypography variant='h4' mb={3}>
              For clubs and organizations
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              On top of all of this, we at Bridgestars have not forgotten about
              the needs of bridge federations, clubs and other groups that want
              to host tournaments online. Hosting a tournament on for example
              BBO or Realbridge can be hard and unintuitive. We want to provide
              these types of organizations a simple interface for setting up
              tournaments, and also to fetch results easily by providing an API
              that allows programmers to easily integrate results to a website.
              We also want to provide easy downloads of results through the
              click of a button, for people who are not programmers but would
              like to view their own or other peoples results.
              <br /> <br />
              <br /> <br />
            </MKTypography>

            <MKTypography variant='h4' mb={3}>
              Features of Bridgestars
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              What features can be expected of Bridgestars? Well, besides a
              modern, smooth and easy to use user interface, we provide a wide
              range of features and functionality. The list of features is
              continuously growing as we are constantly working to improve the
              platform, but as of now, the list of features can be seen below:
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Steps
        steps={[
          { label: 'Ranking System', number: '01' },
          { label: 'Friends System', number: '02' },
        ]}
        slides={[
          {
            content: (
              <Icon sx={{ transform: 'scale(7)', width: '100%' }}>
                military_tech
              </Icon>
            ),
            //image:
            //'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80',
            label: '',
            title: 'Ranking System',
            description:
              'With our integrated ranking system you can compete on a global ranking ladder and earn rewards.',
          },
          {
            content: (
              <Icon sx={{ transform: 'scale(7)', width: '100%' }}>groups</Icon>
            ),
            //image:
            //'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80',
            label: '',
            title: 'Friends System',
            description:
              'Practice with your friends in private lobbies or cooperate to conquer global tournaments.',
          },
        ]}
      />

      <MKBox component='section' py={6} mt={6}>
        <Container>
          <Grid container spacing={3} item xs={12} lg={8} mx='auto'>
            <MKTypography variant='h4' mb={3}>
              Integrated Ranking System
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              We at bridgestars want to provide both a casual and a competitive
              environment, allowing casual players to play as much as they want
              in a non.competitive setting, while also allowing players who are
              interested in competitive bridge to be able to do so in a way that
              feels fun and rewarding. We are therefore introducing a new and
              improved ranking system that is a bit different from what some
              bridge players might be used to. It is a system that is inspired
              from the ELO-system that is widely used in other games, such as
              chess.
              <br /> <br />
              When players play a competitive game of bridge, they play for
              ranking points. Players with similar ranking points get matched
              with each other when playing competitively, and by winning games
              you gain ranking points, but if you lose games, you lose ranking
              points. In this way, people can not get a very high rank through
              lots and lots of games alone, they also need to be skilled enough
              to defeat their opponents consistently. And since people of
              similar ranks get matched against each other, the ranking ladder
              will be balanced. We hope that this ranking can be viewed as an
              accurate measurement of player skill. Of course, cheating in
              competitive bridge will be penalized and with our integrated
              anti-cheating software and cheat detection modules, we hope to
              maintain a fair competitive environment.
              <br /> <br />
              <br /> <br />
            </MKTypography>
            <MKTypography variant='h4' mb={3}>
              Improved Friends System
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              Playing bridge is fun, but playing with friends is even more fun.
              Therefore we at Bridgestars have put a lot of work into developing
              a friends system that allows users to add friends on our platform.
              Furthermore, interacting with your friends on Bridgestars is easy
              and functional. With our integrated messenger you can easily
              overview all your messages with your friends, your messages will
              be saved over sessions so you will be able to view old messages
              even after reconnecting. With our messenger, you will also be able
              to easily tell apart conversations with different people. As
              opposed to other platforms, where all messages appear in the same
              text box, our messenger allows you to easily view different
              conversations in separate windows, allowing a smooth messaging
              experience.
              <br /> <br />
              Creating games and lobbies to play with your friends in is also
              improved in Bridgestars. We allow for an interactive lobby user
              interface, where you can invite friends to your lobby and see them
              join in realtime. In the lobby, you can chat with everyone that is
              in that same lobby. Creating a team game is easier than ever, and
              solving the issue where it can be quite tricky to make sure
              everyone is ready to play when it’s time to start.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Steps
        steps={[
          { label: 'Extensive Analytics', number: '01' },
          { label: 'Video Tutorials', number: '02' },
        ]}
        slides={[
          {
            content: (
              <Icon sx={{ transform: 'scale(7)', width: '100%' }}>
                insights
              </Icon>
            ),
            //image:
            //'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80',
            label: '',
            title: 'Extensive Analytics',
            description:
              'Analyze and simulate deals or review your own deals with feedback.',
          },
          {
            content: (
              <Icon sx={{ transform: 'scale(7)', width: '100%' }}>school</Icon>
            ),
            //image:
            //'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80',
            label: '',
            title: 'Video Tutorials',
            description:
              'Learn bridge from the beginning or improve your skills with our video tutorials - adapted for everyone from beginners to advanced players',
          },
        ]}
      />
      <MKBox component='section' py={6} mt={6}>
        <Container>
          <Grid container spacing={3} item xs={12} lg={8} mx='auto'>
            <MKTypography variant='h4' mb={3}>
              Extensive Analytics
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              Playing bridge might be fun, but improving your skills is a
              crucial part of what a lot of players enjoy about the game.
              Therefore we provide an extensive analytics tool for players to
              review their played deals, as well as simulating deals and
              analyzing leads and declarer plays. Our tool will give you
              automatic feedback after a played match about your mistakes and
              potential improvements.
              <br /> <br />
              For premium users, an improved Analytics tool will be available
              for even better analytics that can further improve your skills.
              <br /> <br />
              <br /> <br />
            </MKTypography>
            <MKTypography variant='h4' mb={3}>
              Video Tutorials for Learning and Improving
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              We at Bridgestars want to welcome new players as well as veterans.
              Therefore we provide an integrated environment for learning,
              directly on our platform. Video tutorials for every level of
              players will be available. Anything from learning the basics of
              bridge to advanced declarer and defensive plays will be available.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Steps
        steps={[
          { label: 'Daily Puzzles ', number: '01' },
          { label: 'Content and Rewards', number: '02' },
        ]}
        slides={[
          {
            content: (
              <Icon sx={{ transform: 'scale(7)', width: '100%' }}>
                emoji_objects
              </Icon>
            ),
            //image:
            //'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80',
            label: '',
            title: 'Daily Puzzles',
            description:
              'Solve daily puzzles directly in the Bridgestars application',
          },
          {
            content: (
              <Icon sx={{ transform: 'scale(7)', width: '100%' }}>
                emoji_events
              </Icon>
            ),
            //image:
            //'https://images.unsplash.com/photo-1609365635346-524d0024684f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80',
            label: '',
            title: 'Content and Rewards',
            description:
              'Earn rewards for playing challenges, team games and tournaments',
          },
        ]}
      />
      <MKBox component='section' py={6} mt={6}>
        <Container>
          <Grid container spacing={3} item xs={12} lg={8} mx='auto'>
            <MKTypography variant='h4' mb={3}>
              Daily Puzzles
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              In order for people to feel like there is always something that
              they can do on the Bridgestars platform, we provide daily bridge
              puzzles that players can solve and earn rewards for solving. These
              puzzles can be anything from suit combinations to declaring
              problems, bidding problems, defensive problems or double dummy
              problems.
              <br /> <br />
              <br /> <br />
            </MKTypography>
            <MKTypography variant='h4' mb={3}>
              In Game Content and Rewards
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              By playing on Bridgestars, we want players to get a feeling of
              progress. Therefore we offer in game perks and rewards that can be
              unlocked by playing. Every day, there will be some daily goals
              that, if achieved, will reward the player with some type of in
              game content. These rewards could be new looks for the playing
              cards, or emotes that can be used in the game to show off what you
              have achieved.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default Information;
