//REACT
import { useState } from 'react';
import { useEffect } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { IconButton, Icon, Modal } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';

//BRIDGESTARS
import commentIcon from 'assets/images/bridgestars/Comments.png';
import drawCommentArea from './cardSections/comments';
import { drawXSVoter, drawVoter } from './cardSections/voter';
import { drawAuthor } from './cardSections/author';
import { editorStyle } from 'bridgestars/text-editor/editorStyles.js';

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
  handleCommentVote,
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

  const [commentLoaderState, setCommentLoaderState] = useState("")
  async function expandCard() {
    if (expanded) return setExpanded(false);

    setCommentLoaderState('loading');
    setExpanded(true);

    if (comments.length != 0) {
      setCommentLoaderState("loaded")
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
  const drawCardContent = (modal) => {
    return (
      <Card
        onClick={!modal ? expandCard : () => {}}
        minWidth='275px'
        maxWidth='400px'
        width={{ xs: 'min-content', sm: '100%' }}
        height='min-content'
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        sx={{
          outline: 'none',
          minHeight: modal ? '300px' : 0,
          maxHeight: '100%',
          overflow: 'scroll',
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
          cursor: 'pointer',

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
            sx={{ fontSize: '30px' }}
          >
            <Icon>close</Icon>
          </Box>
        )}
        <Box overflow={modal && 'scroll'} mt='40px'>
          <Grid container pr={{ xs: 1.5, sm: 0 }}>
            <Grid
              item
              sm={2.5}
              order={0}
              justifyContent='center'
              alignItems='center'
              display={{ sm: 'flex', xs: 'none' }}
            >
              {drawVoter(voted, nbrVotes, handleVoteBtnPress)}
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
              {drawXSVoter(voted, nbrVotes, handleVoteBtnPress)}
            </Grid>

            <Grid
              item
              xs={9.5}
              sm={!modal ? 7.5 : 8.5}
              order={1}
              mt={1.5}
              mb={{ xs: 1, sm: 0 }}
            >
              {drawTitle({ title: title, selected: cardHovered && !modal })}
              {drawStatus({
                status: status,
                display: 'inline-block',
              })}
              {drawDescription({
                description: description,
                limit: modal ? 5000 : 220,
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
                {drawAuthor(author, creationTime)}
                {!modal && (
                  <Box display={{ sm: 'none', xs: 'flex' }} mx={2} my='auto'>
                    {drawOpenCommentButton(nbrComments)}
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
                {drawOpenCommentButton(nbrComments)}
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
      {expanded ? (
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
          style={{ content: editorStyle }}
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

function drawOpenCommentButton(nbrComments) {
  return (
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
      <MKBox
        width='min-content'
        height='min-content'
        mt={0.3}
        py={0.3}
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
          {nbrComments ? nbrComments : 0}
        </MKTypography>
      </MKBox>
    </Box>
  );
}

function drawTitle({ title, selected, ...rest }) {
  return (
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
  );
}

function drawDescription({ description, limit = 220, ...rest }) {
  return (
    <MKTypography variant='text' sx={{ fontSize: '14px' }} {...rest}>
      {description.length > limit
        ? description.substring(0, limit) + '...'
        : description}
    </MKTypography>
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
