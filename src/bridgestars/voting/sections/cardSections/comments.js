// SCROLLBAR



//MUI
import { Box } from '@mui/material';
import { Grid } from '@mui/material';

//OTIS KIT
import MKTypography from 'otis/MKTypography';

//BRIDGESTARS
import TextEditor from 'bridgestars/text-editor/textEditor';
import { drawXSVoter } from './voter';
import { drawAuthor } from './author';

import { PulseLoader } from 'react-spinners';

export default function drawComments(comments, getValue, setValue, charCount, commentLoaderState, handleVote) {
  return (
    <Box p={1.5}>
      <Box>
        <MKTypography variant='h2' sx={{ fontSize: '16px' }}>
          Comments
        </MKTypography>
        <Box py={1}>
          <TextEditor
            placeholder={'Add your own thoughts'}
            content={getValue && getValue}
            onChange={setValue}
          ></TextEditor>
        </Box>
        {charCount > 0 ? (
          <Grid container justifyContent='flex-end'>
            <MKTypography
              variant='text1'
              color={charCount > 750 ? 'primary' : 'dark'}
              fontSize='16px'
            >
              Character count: {charCount}/750
            </MKTypography>
          </Grid>
        ) : (
          <></>
        )}
      </Box>
      <Box
        py={1}
        justifyContent={commentLoaderState === 'loaded' ? '' : 'center'}
        display='flex'
      >
        {commentLoaderState === 'loading' ? (
          <PulseLoader color='black' speedMultiplier={1} size={8} />
        ) : commentLoaderState === 'loaded' ? (
          comments.map((x) =>
            drawCommentInstance(
              x.text,
              x.likes,
              x.author,
              x.creationTime,
              () => handleVote(x.uid)
            )
          )
        ) : (
          <MKTypography>{commentLoaderState}</MKTypography>
        )}
      </Box>
    </Box>
  );
}

function drawCommentInstance(text, likes, author, creationTime, handleVote) {
  return (
    <Box key={text} mx={1} display='flex'>
      <Box width='min-content' mt={0.3}>
        {drawXSVoter(true, likes, handleVote)}
      </Box>
      <Box width='100%'>
        <TextEditor
          placeholder={'comment'}
          readOnly={true}
          theme='bubble'
          content={text}
        />
        <Box mx={1.5} mt={0.5}>
          {drawAuthor(author, creationTime)}
        </Box>
      </Box>
    </Box>
  );
}
