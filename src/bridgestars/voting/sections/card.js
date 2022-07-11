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
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { borders } from '@mui/system';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';

import commentIcon from 'assets/images/bridgestars/Comments.png';
import userIcon from 'assets/images/bridgestars/User.png';

import colors from 'assets/theme/base/colors';

import { useState } from 'react';

import TextEditor from './textEditor';

import { useEffect } from 'react';


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
    if (comments.length != 0) {
      console.log('comments already downloaded');
      return setExpanded(true);
    }
    //download commment document for the request uid
    console.log('clicked on commenticon');
    const data = await getComments();
    console.log(JSON.stringify(data));
    if (data) {
      setComments(data);
      setExpanded(true);
    } else console.log('Could not fetch comments');
  }
  return (
    <Card
      sx={{
        width: '100%',
        // horizontal, vertical, blur, spread?, color
        // boxShadow: '2px 5px 15px rgba(0,0,0,0.22)',

        '&:hover': {
          // boxShadow: '0 0px 10px rgba(0,0,0,0.32)',
          backgroundColor: 'rgba(0,0,0,0.010)',
        },
        ...rest,
      }}
    >
      <TextEditor
        placeholder={'comment'}
        readOnly={true}
        theme='bubble'
        content='asdasdasd <b>dasd</b> a sd'
      />
      <Grid container pr={{ xs: 1.5, sm: 0 }}>
        <Grid
          item
          sm={2.5}
          order={0}
          justifyContent='center'
          alignItems='center'
          display={{ sm: 'flex', xs: 'none' }}
        >
          {drawVote(voted, nbrVotes, handleVote)}
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
          {drawXSVote(voted, nbrVotes, handleVote)}
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
              {drawComment(nbrComments, handleCommentClick)}
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
          {drawComment(nbrComments, handleCommentClick)}
        </Grid>
      </Grid>
      {expanded ? (
        <Box overflow='scroll' maxHeight='90vh'>
          {drawComments(comments, updateCommentText, charCount)}
        </Box>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default IssueCard;

function drawComment(nbrComments, handleCommentClick) {
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
    <MKTypography variant='text2' sx={{ fontSize: '14px' }} {...rest}>
      {description.length > 220
        ? description.substring(0, 220) + '...'
        : description}
    </MKTypography>
  );
}

function drawVote(voted, voteCount, handleVote) {
  return (
    <Grid item container>
      <Grid
        item
        xs={4}
        sm={12}
        mx={{ xs: 1, sm: 0 }}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          py={0.5}
          minWidth='75px'
          width='min-content'
          textAlign='center'
          sx={{
            border: 1,
            borderRadius: '2px 2px 2px 2px',
            borderWidth: '1.5px',
            borderColor: voted ? 'success.main' : 'dark.main',
          }}
        >
          <MKTypography
            sx={{ fontSize: '20px' }}
            color={voted ? 'success' : 'dark'}
          >
            {voteCount ? voteCount : '1,203'}
          </MKTypography>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sm={12}
        mx={{ xs: 1, sm: 0 }}
        my={{ xs: 'auto', sm: 0.5 }}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          width='55px'
          textAlign='center'
          variant='button'
          bgcolor={voted ? 'success.main' : 'dark.main'}
          py={0.5}
          px={1}
          // width='61.8%'
          sx={{
            borderRadius: '2px 2px 2px 2px',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
          onClick={handleVote}
        >
          <MKTypography sx={{ fontSize: '12px' }} color='white'>
            {voted ? 'VOTED' : 'VOTE'}
          </MKTypography>
        </Box>
      </Grid>
    </Grid>
  );
}

function drawXSVote(voted, voteCount, handleVote) {
  return (
    <Grid item container>
      <Grid
        item
        xs={12}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          sx={{
            width: '25px',
            height: 0,
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderBottom:
              '25px solid ' + (voted ? colors.success.main : colors.dark.main),
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
          variant='button'
          // width='61.8%'
          onClick={handleVote}
        ></Box>
      </Grid>

      <Grid
        item
        xs={4}
        mt={1}
        width='min-content'
        mx={'auto'}
        display='flex'
        justifyContent='center'
      >
        <MKTypography
          sx={{ fontSize: '18px' }}
          variant='h3'
          color={voted ? 'success' : 'dark'}
        >
          {voteCount ? voteCount : 0}
        </MKTypography>
      </Grid>
      {/* <Box
          py={0.5}
          minWidth='75px'
          width='min-content'
          textAlign='center'
          sx={{
            border: 1,
            borderRadius: '2px 2px 2px 2px',
            borderWidth: '1.5px',
            borderColor: voted ? 'success.main' : 'dark.main',
          }}
        >
          <MKTypography
            sx={{ fontSize: '20px' }}
            color={voted ? 'success' : 'dark'}
          >
            {voteCount ? voteCount : '1,203'}
          </MKTypography>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sm={12}
        mx={{ xs: 1, sm: 0 }}
        my={{ xs: 'auto', sm: 0.5 }}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          width='55px'
          textAlign='center'
          variant='button'
          bgcolor={voted ? 'success.main' : 'dark.main'}
          py={0.5}
          px={1}
          // width='61.8%'
          sx={{
            borderRadius: '2px 2px 2px 2px',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
          onClick={handleVote}
        >
          <MKTypography sx={{ fontSize: '12px' }} color='white'>
            {voted ? 'VOTED' : 'VOTE'}
          </MKTypography>
        </Box>*/}
    </Grid>
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

function drawAuthor(author, creationTime) {
  return (
    <Box display='flex' justifyContent='flex-start' alignItems='center'>
      <MKBox
        component='img'
        src={userIcon}
        width='18px'
        display='inline-block'
      ></MKBox>
      <MKTypography
        variant='h3'
        sx={{ fontSize: '12px', color: '#1e2e4acc' }}
        mx={{ sm: 1, xs: 0.5 }}
        display='inline-block'
      >
        {/* theotheotheotheo */}
        {author.username}
      </MKTypography>
      <MKBox
        width='4.5px'
        height='4.5px'
        mt={0.3}
        mb={0}
        bgColor='#1e2e4acc'
        sx={{
          borderRadius: '2px 2px 2px 2px',
        }}
        display='inline-block'
      ></MKBox>
      <MKTypography
        variant='h3'
        sx={{ fontSize: '12px', color: '#1e2e4acc' }}
        mx={{ sm: 1, xs: 0.5 }}
        display='inline-block'
      >
        {creationTime}
      </MKTypography>
    </Box>
  );
}



function drawComments(comments, setValue, charCount) {

    const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
  ]
  return (
    <Box>
      <Box>
        <Typography>Your comment</Typography>
        <TextEditor placeholder={'Add your own thoughts'} onChange={setValue}></TextEditor>
        <Typography>character count: {charCount}</Typography>
      </Box>
      {comments.map((x) =>
        drawCommentInstance(x.text, x.likes, x.author.username, x.creationTime)
      )}
    </Box>
  );
}

function drawCommentInstance(text, likes, username, creationTime) {
  return (<Box key={text}>
    <Typography>{text}</Typography>
    <Typography>{likes}</Typography>
    <Typography>{username}</Typography>
    <Typography>{creationTime}</Typography>
  </Box>);
}
