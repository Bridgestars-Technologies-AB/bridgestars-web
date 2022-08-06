// SCROLLBAR



//MUI
import { Box } from '@mui/material';
import { Grid } from '@mui/material';

//OTIS KIT
import MKTypography from 'components/MKTypography';

//BRIDGESTARS
import TextEditor from 'bridgestars/text-editor/textEditor';
import { drawXSVoter } from './voter';
import { drawAuthor } from './author';

export default function drawComments(comments, getValue, setValue, charCount) {
  return (
    <Box p={1.5}>
      <Box>
        <MKTypography variant='h2' sx={{ fontSize: '16px' }}>
          Comments
        </MKTypography>
        <Box py={1}>
          <TextEditor
            placeholder={getValue ? getValue : 'Add your own thoughts'}
            onChange={setValue}
          ></TextEditor>
        </Box>
        {charCount > 0 ? (
          <Grid container justifyContent='flex-end'>
            <MKTypography>character count: {charCount}</MKTypography>
          </Grid>
        ) : (
          <></>
        )}
      </Box>
      <Box py={1}>
        {comments.map((x) =>
          drawCommentInstance(x.text, x.likes, x.author, x.creationTime)
        )}
      </Box>
    </Box>
  );
}

function drawCommentInstance(text, likes, author, creationTime) {
  return (
    <Box key={text} mx={1} display='flex'>
      <Box width='min-content' mt={0.3}>
        {drawXSVoter(true, likes, () => {})}
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
