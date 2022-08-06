//REACT
import { useState } from 'react';
import { useEffect } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import colors from 'assets/theme/base/colors';

//BRIDGESTARS
import commentIcon from 'assets/images/bridgestars/Comments.png';
import drawComments from './cardSections/comments';
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
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [charCount, setCharCount] = useState(0)
  const updateCommentText = (html) => {
    setCommentText(html)
    console.log(html)
    var cont = html.replace(/<[^>]*>/g, ' ');
    cont = cont.replace(/\s+/g, ' ');
    cont = cont.trim();
    var n = cont.length;
    setCharCount(n)
  }

  useEffect(() => {
    console.log(commentText)
  }, [commentText])

  async function handleCommentClick() {
    if (expanded) return setExpanded(false);
    setExpanded(true);
    if (comments.length != 0) {
      console.log('comments already downloaded');
      return;
    }
    //download commment document for the request uid
    console.log('clicked on commenticon');
    const data = await getComments();
    console.log(JSON.stringify(data));
    if (data) {
      setComments(data);
    } else console.log('Could not fetch comments');
  }

  const drawCardContent = (modal) => {
    return (
      <Card
        sx={{
          width: '100%',
          // horizontal, vertical, blur, spread?, color
          // boxShadow: '2px 5px 15px rgba(0,0,0,0.22)',

          '&:hover': {
            // boxShadow: '0 0px 10px rgba(0,0,0,0.32)',
            backgroundColor: modal ? 'rgba' : 'rgba(0,0,0,0.010)',
          },
          ...rest,
        }}
      >
        <Grid container pr={{ xs: 1.5, sm: 0 }}>
          <Grid
            item
            sm={2.5}
            order={0}
            justifyContent='center'
            alignItems='center'
            display={{ sm: 'flex', xs: 'none' }}
          >
            {drawVoter(voted, nbrVotes, handleVote)}
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
            {drawXSVoter(voted, nbrVotes, handleVote)}
          </Grid>

          <Grid item xs={9.5} sm={7.5} order={1} mt={1.5} mb={{ xs: 1, sm: 0 }}>
            {drawTitle({ title: title })}
            {drawStatus({
              status: status,
              display: 'inline-block',
            })}
            {drawDescription({ description: description })}

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
              <Box display={{ sm: 'none', xs: 'flex' }} mx={2} my='auto'>
                {drawOpenCommentButton(nbrComments, handleCommentClick)}
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            sm={2}
            order={3}
            justifyContent='center'
            alignItems='center'
            ml={{ xs: 1, sm: 0 }}
            display={{ sm: 'flex', xs: 'none' }}
          >
            {drawOpenCommentButton(nbrComments, handleCommentClick)}
          </Grid>
        </Grid>
        {modal ? (drawComments(comments, commentText, updateCommentText,
          charCount)) : (<></>)}
      </Card>
    );
  }



  return (
    <>
      {drawCardContent(false)}
      {expanded ? (
        <Modal
          open={expanded}
          onClose={() => setExpanded(false)}
          sx={{
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'scroll',
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



function drawOpenCommentButton(nbrComments, handleCommentClick) {
  return (
    <Box
      position='relative'
      width='min-content'
      height='min-content'
      variant='button'
      onClick={handleCommentClick}
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

function drawTitle({ title, ...rest }) {
  return (
    <MKTypography
      {...rest}
      variant='h2'
      sx={{
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

function drawDescription({ description, ...rest }) {
  return (
    <MKTypography variant='text' sx={{ fontSize: '14px' }} {...rest}>
      {description.length > 220
        ? description.substring(0, 220) + '...'
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




