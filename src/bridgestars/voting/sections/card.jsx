import React, { useState, useEffect } from 'react';
// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button, IconButton, Icon, Modal, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//
// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';

//BRIDGESTARS
import commentIcon from 'assets/images/bridgestars/Comments.png';
import Comments from './cardSections/comments';
import { drawXSVoter, drawVoter } from './cardSections/voter';
import { drawAuthor } from './cardSections/author';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

import { statusColor, statusText } from 'bridgestars/voting/status';
import { useParams } from 'react-router-dom';
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
  setNbrComments,
  post,
  loading,
  setShowSignin,
  archive,
  edit,
  expanded: controlledExpanded,
  setExpanded: controlledSetExpanded,
  ...rest
}) {
  const [innerExpanded, innerSetExpanded] = useState(false);
  const expanded = controlledExpanded || innerExpanded;
  const setExpanded = controlledSetExpanded || innerSetExpanded;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const confirm = useConfirm();

  const handleVoteBtnPress = (e) => {
    e.stopPropagation();
    handleVote();
  };

  async function expandCard() {
    if (expanded) return setExpanded(false);
    setExpanded(true);
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
        onClick={!modal ? expandCard : (e) => e.stopPropagation()}
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
            opacity: 1,
          },

          opacity: modal ? 1 : 0.9,
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
        <Box
          overflow={modal && 'hidden'}
          pt={loading ? '0px' : modal ? '15px' : '5px'}
          pb={modal ? '15px' : '5px'}
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
              {loading ? (
                <Skeleton height='70px' width='75px' />
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
                  statusInt: status,
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
              {modal &&
                (author.get('dispName') === 'admin' ||
                  Parse.User.current()?.id === author.id) && (
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
                    py={0}
                  >
                    <IconButton
                      aria-label='more'
                      id='long-button'
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup='true'
                      onClick={() => edit()}
                    >
                      <EditIcon />{' '}
                      <MKTypography ml={0.6} variant='h6'>
                        Edit
                      </MKTypography>
                    </IconButton>
                    <IconButton
                      aria-label='more'
                      id='long-button'
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup='true'
                      onClick={() => {
                        if ((voted && nbrVotes < 2) || nbrVotes < 1) {
                          confirm({ description: 'This action is permanent!' })
                            .then(async () => {
                              //TODO
                              try {
                                try {
                                  await Parse.Cloud.run('archivePost', {
                                    uid: post.id,
                                  });
                                  enqueueSnackbar(
                                    'Request has been archived.',
                                    {
                                      variant: 'success',
                                    }
                                  );
                                  archive();
                                } catch (e) {
                                  enqueueSnackbar(
                                    'Request could not be archived.',
                                    {
                                      variant: 'failure',
                                    }
                                  );
                                }
                              } catch (e) {
                                console.log(e.message);
                                if (
                                  e.message === 'Object not found for delete.'
                                )
                                  enqueueSnackbar(
                                    'You do not have permission to archive this request.',
                                    { variant: 'error' }
                                  );
                                else
                                  enqueueSnackbar(e.message, {
                                    variant: 'error',
                                  });
                              }
                            })
                            .catch(() => { });
                        } else
                          enqueueSnackbar(
                            "This request can't be archived since it has already been voted for.",
                            { variant: 'error' }
                          );
                      }}
                    >
                      <DeleteIcon />{' '}
                      <MKTypography ml={0.6} variant='h6'>
                        Archive
                      </MKTypography>
                    </IconButton>
                  </Grid>
                )}
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
          <Comments
            setShowSignin={setShowSignin}
            post={post}
            show={expanded}
            setNbrComments={setNbrComments}
          />
        </Box>
      </Card>
    );
  };
  // const style = {
  //   position: 'absolute',
  //   //left: '50%',
  //   width: '100%',
  //   height: '50%',
  //   outline: 'none',
  // };
  return (
    <>
      {drawCardContent(false)}
      {expanded && !loading ? (
        <Modal
          open={expanded}
          onClose={() => setExpanded(false)}
          onClick={() => setExpanded(false)}
          py='auto'
          style={{
            overflow: 'scroll',
            // width: 'min-content',
            // height: 'min-content',
          }}
        // style={{ content: editorStyle }}
        >
          <Box
            display='flex'
            width='100%'
            height='100%'
            // style={{ style }}
            sx={{
              p: 'auto',
              outline: 'none',
              //   alignItems: 'center',
              //   display: 'flex',
              //   flexDirection: 'row',
            }}
          >
            <Box m='auto' minWidth={{ xs: '90%', sm: '450px' }}>
              {drawCardContent(true)}
            </Box>
          </Box>
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
          {nbrComments > 0 && (
            <MKBox
              width='min-content'
              height='min-content'
              mt={0.3}
              pt={0.2}
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
            </MKBox>
          )}
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

function drawStatus({ statusInt, ...rest }) {
  const status = statusText(statusInt);
  if (status)
    return (
      <Box
        {...rest}
        ml={0}
        mr={0.5}
        px={0.6}
        py={0.2}
        mt={0.2}
        bgcolor={`rgba(${statusColor(status)}, 0.5)`}
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
