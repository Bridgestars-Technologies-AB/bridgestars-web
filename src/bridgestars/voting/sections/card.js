//REACT
import { useState } from 'react';
import { useEffect } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { IconButton, Icon, Modal, Skeleton } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';

//BRIDGESTARS
import commentIcon from 'assets/images/bridgestars/Comments.png';
import drawCommentArea from './cardSections/comments';
import { drawXSVoter, drawVoter } from './cardSections/voter';
import { drawAuthor } from './cardSections/author';
// import { editorStyle } from 'bridgestars/text-editor/editorStyles.js';

function IssueCard({
  title,
  description,
  author,
  status,
  creationTime,
  handleVote,
  voted,
  nbrVotes,
  nbrComments,
  getComments,
  loading,
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleVoteBtnPress = (e) => {
    e.stopPropagation();
    handleVote();
  };

  async function handleCommentVote(commentId) {
    const updateDocLocal = async (inc) => {
      const incr = (doc) => {
        doc.votes += inc;
        return doc;
      };
      setComments(
        comments.map((doc) => (doc.id == commentId ? incr(doc) : doc))
      );
    };
    if (Parse.User.current() && comments != null) {
      const comment = comments.find((c) => c.id == commentId);
      if (!comment) throw new Error("Comment not found");
      if (comment.voted) {
        //local
        updateDocLocal(-1)
        console.log("remove vote: " + commentId)
        console.log("local state: " + JSON.stringify(comments))
        var reactions = await new Parse.Query("Reaction")
          .equalTo("type", 2)
          .equalTo("target", commentId)
          .equalTo("user", Parse.User.current().id)
          .find()
        if (reactions) await Parse.Object.destroyAll(reactions)
      } else {
        //local
        updateDocLocal(1)
        console.log("add vote: " + commentId)
        console.log("local state: " + JSON.stringify(comments))
        await new Parse.Object("Reaction", { data: 1, type: 2, target: commentId }).save()
      }
    } else {
      setShowSignin(true);
    }
  }

  const updateCommentText = (html) => {
    setCommentText(html);
    console.log(html);
    var cont = html.replace(/<[^>]*>/g, ' ');
    cont = cont.replace(/\s+/g, ' ');
    cont = cont.trim();
    var n = cont.length;
    setCharCount(n);
  };

  useEffect(() => {
    console.log(commentText);
  }, [commentText]);

  const [commentLoaderState, setCommentLoaderState] = useState('');
  async function expandCard() {
    if (expanded) return setExpanded(false);

    setCommentLoaderState('loading');
    setExpanded(true);

    if (comments.length != 0) {
      setCommentLoaderState('loaded');
    }
    //download comments
    const data = await getComments();
    if (data) {
      setComments(data);
      setCommentLoaderState('loaded');
    } else {
      setCommentLoaderState('no comments');
    }
  }
  const [cardHovered, setCardHovered] = useState(false);
  const cardSize = (modal = false) => {
    return {
      minHeight: modal ? '300px' : '0px',
      maxHeight: '100%',
      // minWidth: '300px',
      maxWidth: '800px',
      width: '100%',
      height: 'min-content',
    };
  };
  const drawCardContent = (modal) => {
    return (
      <Card
        onClick={!modal ? expandCard : () => { }}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        sx={{
          outline: 'none',
          ...cardSize(modal),
          overflow: 'hidden',
          // horizontal, vertical, blur, spread?, color
          // boxShadow: '2px 5px 15px rgba(0,0,0,0.22)',

          '&:hover': {
            // boxShadow: '0 0px 10px rgba(0,0,0,0.32)',
            backgroundColor: modal ? 'rgba' : 'rgba(0,0,0,0.010)',
          },

          opacity: modal ? 1 : 0.9,
          '&:hover': {
            opacity: 1,
          },
          cursor: !loading && !modal && 'pointer',

          ...rest,
        }}
      >
        {modal && (
          <Box
            pt='2px'
            pb='5px'
            pr='3px'
            position='absolute'
            right='0px'
            height='40px'
            onClick={() => {
              setExpanded(false);
            }}
            sx={{ fontSize: '30px', cursor: 'pointer' }}
          >
            <Icon>close</Icon>
          </Box>
        )}
        <Box overflow={modal && 'hidden'} pt={modal ? '15px' : '5px'} pb={modal ? '15px' : '5px'}>
          <Grid container pr={{ xs: 1.5, sm: 0 }}>
            <Grid
              item
              sm={2.5}
              order={0}
              justifyContent='center'
              alignItems='center'
              display={{ sm: 'flex', xs: 'none' }}
            >
              {loading ? (
                <Skeleton height='100px' width='75px' />
              ) : (
                drawVoter(voted, nbrVotes, handleVoteBtnPress)
              )}
            </Grid>

            <Grid
              item
              xs={1.5}
              order={0}
              mt={2}
              mx={0.25}
              justifyContent='center'
              alignItems='flex-start'
              display={{ sm: 'none', xs: 'flex' }}
            >
              {!loading && drawXSVoter(voted, nbrVotes, handleVoteBtnPress)}
            </Grid>

            <Grid
              item
              xs={9.5}
              sm={!modal ? 7.5 : 8.5}
              order={1}
              mt={1.5}
              mb={{ xs: 1, sm: 0 }}
            >
              {drawTitle({
                title: title,
                selected: cardHovered && !modal,
                loading: loading,
              })}
              {!loading &&
                drawStatus({
                  status: status,
                  display: 'inline-block',
                })}
              {drawDescription({
                description: description,
                limit: modal ? 5000 : 220,
                loading: loading,
              })}

              <Grid
                sm={12}
                container
                item
                sx={{
                  flexDirection: 'row',
                }}
                display='flex'
                justifyContent='flex-left'
                alignItems='center'
                py={1}
              >
                {drawAuthor(author, creationTime, loading)}
                {!modal && (
                  <Box display={{ sm: 'none', xs: 'flex' }} mx={2} my='auto'>
                    {drawOpenCommentButton(nbrComments, loading)}
                  </Box>
                )}
              </Grid>
            </Grid>
            {!modal && (
              <Grid
                item
                sm={2}
                order={3}
                justifyContent='center'
                alignItems='center'
                ml={{ xs: 1, sm: 0 }}
                display={{ sm: 'flex', xs: 'none' }}
              >
                {drawOpenCommentButton(nbrComments, loading)}
              </Grid>
            )}
          </Grid>
          {modal ? (
            drawCommentArea(
              comments,
              commentText,
              updateCommentText,
              charCount,
              commentLoaderState,
              handleCommentVote
            )
          ) : (
            <></>
          )}
        </Box>
      </Card>
    );
  };

  return (
    <>
      {drawCardContent(false)}
      {expanded && !loading ? (
        <Modal
          open={expanded}
          onClose={() => setExpanded(false)}
          sx={{
            py: 1.5,
            // outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        // style={{ content: editorStyle }}
        >
          {drawCardContent(true)}
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default IssueCard;

function drawOpenCommentButton(nbrComments, loading) {
  return (
    <>
      {loading ? (
        <Box position='relative' width='min-content' height='min-content'>
          <Skeleton
            variant='circular'
            animation='wave'
            width={'45px'}
            height={'45px'}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
      ) : (
        <Box
          position='relative'
          width='min-content'
          height='min-content'
          variant='button'
          sx={{
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
        >
          <MKBox
            component='img'
            src={commentIcon}
            width={{ sm: '40px', xs: '20px' }}
          ></MKBox>
          {nbrComments > 0 &&
            <MKBox
              width='min-content'
              height='min-content'
              mt={0.3}
              pt={0.20}
              pb={0.35}
              px={{ sm: 0.9, xs: 0.75 }}
              bgColor='primary'
              sx={{
                position: 'absolute',
                left: { sm: '30px', xs: '15px' },
                top: { sm: '-2px', xs: '-1.5px' },
                zIndex: 1000,
                borderRadius: '20px',
              }}
            >
              <MKTypography
                position='relative'
                variant='h3'
                color='white'
                sx={{ fontSize: { sm: '12px', xs: '10px' } }}
              >
                {nbrComments}
              </MKTypography>
            </MKBox>}
        </Box>
      )}
    </>
  );
}

function drawTitle({ title, selected, loading, ...rest }) {
  return (
    <>
      {loading ? (
        <Skeleton height='25px' sx={{ m: 0, p: 0 }}></Skeleton>
      ) : (
        <MKTypography
          {...rest}
          variant='h2'
          sx={{
            textDecoration: selected && 'underline',
            fontSize: '18px',
            overflowWrap: 'break-word',

            flexWrap: 1,
            flex: 1,
          }}
        >
          {title}
        </MKTypography>
      )}
    </>
  );
}

function drawDescription({ description, limit = 220, loading, ...rest }) {
  return (
    <>
      {loading ? (
        <Skeleton height='50px' />
      ) : (
        <MKTypography variant='text' sx={{ fontSize: '14px' }} {...rest}>
          {description?.length > limit
            ? description?.substring(0, limit) + '...'
            : description}
        </MKTypography>
      )}
    </>
  );
}

function drawStatus({ status, ...rest }) {
  const statusColor = () => {
    switch (status) {
      case 'New':
        return '200, 124, 247';
      case 'Reviewed':
        return '124, 150, 247';
      case 'Planned':
        return '111, 241, 220';
      case 'In Progress':
        return '247, 241, 124';
      case 'In Beta':
        return '150, 247, 124';
      case 'Already Exists':
        return '255, 100, 50';
      default:
        //Live
        return '58, 191, 43';
    }
  };
  if (status)
    return (
      <Box
        {...rest}
        ml={0}
        mr={0.5}
        px={0.6}
        py={0.2}
        mt={0.2}
        bgcolor={`rgba(${statusColor()}, 0.5)`}
        sx={{
          borderRadius: '3px',
        }}
      >
        <MKTypography variant='h3' sx={{ fontSize: '12px', opacity: 0.8 }}>
          {/* Already Exists */}
          {status}
        </MKTypography>
      </Box>
    );

  return <></>;
}
