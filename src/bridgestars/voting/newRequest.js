// react
import { useState } from 'react';
import React from 'react';

// @mui material components
import {
  Box,
  Button,
  Dialog,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Otis Kit PRO components
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';
const { dark } = colors;
import MKInput from 'otis/MKInput';

import { PulseLoader } from 'react-spinners';

import { useSnackbar } from 'notistack';

export default function DrawNewRequestDialog(show, setShow, createdCallback) {
  const [pageNbr, setPageNbr] = useState(1);
  const [state, setState] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function next() {
    if (pageNbr == 2) {
      try {
        setPageNbr(3);
        await new Parse.Object('Post').save({
          type: 1, //Post
          subtype: 1, //New
          title: state.title,
          data: state.description,
          info: {
            category: state.selectedCategory,
            type: state.selectedType,
          },
        });
        setPageNbr(4);
        enqueueSnackbar('Request has been posted', { variant: 'success' });
        createdCallback();
      } catch (e) {
        setPageNbr(2);
        console.log(e);
        return alert(e.message);
      }
      //upload
    } else {
      setPageNbr(pageNbr + 1);
    }
  }

  function pageOne() {
    return (
      <>
        <DialogTitle>Create new request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new request, please first check if something similar has
            already been proposed. If not, please describe your request as
            detailed as possible.
          </DialogContentText>
          <br></br>
          <MKInput
            autoFocus
            margin='dense'
            id='name'
            label='Title'
            type='text'
            fullWidth
            error={state.titleError}
            defaultValue={state.title || ''}
            placeholder="e.g. 'In game messaging'"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            helperText='* Should be a short descriptive sentence that summarizes your request.'
          />
          {/* <Box px={1}>
            <MKTypography variant='text2' style={{ fontSize: '14px', color: '#666' }}>* Should be a short descriptive sentence that summarizes your request.</MKTypography>
          </Box> */}
          <MKInput
            margin='dense'
            id='name'
            label='Description'
            error={state.descError}
            type='text'
            defaultValue={state.description || ''}
            fullWidth
            multiline
            InputLabelProps={{ shrink: Boolean(state.description) }}
            rows={5}
            helperText='* Should be a very detailed description of the reasoning behind the request.'
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
          {/* <Box px={1}>
            <MKTypography variant='text2' style={{ fontSize: '14px', color: '#666' }}>* Should be a very detailed description of the reasoning behind the request. </MKTypography>
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={next}>Next</Button>
        </DialogActions>
      </>
    );
  }

  function pageTwo() {
    return (
      <>
        <DialogContent>
          <Box px={1}>
            <MKTypography variant='h2' fontSize='18px'>
              Just one more thing
            </MKTypography>
            <MKTypography variant='text2'>
              Please specify matching categorisation, this is for internal use.
            </MKTypography>
          </Box>
          <br></br>
          <FormControl fullWidth>
            <InputLabel
              id='new-request-category-label1'
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '20px',
                fontFamily: '"Roboto Slab", sans-serif',
                color: dark.main,
                // width:'100%',
                // verticalAlign:'middle',
                // textAlign:'center',
                // lineHeight:'100%'
              }}
            >
              {/* <MKTypography  variant='h3' fontSize='18px'>Select Filter</MKTypography> */}
              Select Type
            </InputLabel>
            <Select
              labelId='new-request-category-label1'
              input={<OutlinedInput label='Select Ty' />}
              value={state.selectedType || ''}
              fullWidth
              width='auto'
              sx={{
                borderRadius: '10px',
                backgroundColor: '#f8f9fa',
                height: '42px',
                fontSize: '18px',
                lineHeight: '18px',
                fontFamily: '"Roboto Slab", sans-serif',
                minWidth: '130px',
                color: dark.main,
                textAlign: 'center',
              }}
              onChange={(e) =>
                setState({ ...state, selectedType: e.target.value })
              }
              onClose={() => {
                /*run query */
              }}
            >
              <MenuItem value={'Feature'}>Feature</MenuItem>
              <MenuItem value={'Fix'}>Fix</MenuItem>
              {/* <MenuItem value={''}>UI</MenuItem> */}
            </Select>
          </FormControl>
          <br></br>
          <br></br>
          <FormControl fullWidth>
            <InputLabel
              id='new-request-category-label2'
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '20px',
                fontFamily: '"Roboto Slab", sans-serif',
                color: dark.main,
                // width:'100%',
                // verticalAlign:'middle',
                // textAlign:'center',
                // lineHeight:'100%'
              }}
            >
              Select Category
              {/* <MKTypography  variant='h3' fontSize='18px'>Select Filter</MKTypography> */}
            </InputLabel>
            <Select
              labelId='new-request-category-label2'
              value={state.selectedCategory || ''}
              input={<OutlinedInput label='Select Catego' />}
              fullWidth
              width='auto'
              sx={{
                borderRadius: '10px',
                backgroundColor: '#f8f9fa',
                height: '42px',
                fontSize: '18px',
                fontFamily: '"Roboto Slab", sans-serif',
                minWidth: '130px',
                color: dark.main,
                textAlign: 'center',
              }}
              onChange={(e) =>
                setState({ ...state, selectedCategory: e.target.value })
              }
              onClose={() => {
                /*run query */
              }}
            >
              <MenuItem value={'UI'}>UI</MenuItem>
              <MenuItem value={'Gameplay'}>Gameplay</MenuItem>
              <MenuItem value={'Install'}>Installation</MenuItem>
              <MenuItem value={'Account'}>Account</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPageNbr(pageNbr - 1)}>Back</Button>
          <Button onClick={next}>Upload</Button>
        </DialogActions>
      </>
    );
  }
  function pageThree() {
    return (
      <DialogContent>
        <Box px={1}>
          <MKTypography variant='h2' fontSize='18px'>
            {pageNbr == 3
              ? 'Your request is uploading'
              : 'Thanks for your feedback!'}
          </MKTypography>
          {pageNbr == 4 && (
            <MKTypography variant='text2'>
              You can find your request on your profile page or search for it on
              the voting page.
            </MKTypography>
          )}
        </Box>
        <Box display='flex' mt={2}>
          <Box m='auto'>
            {pageNbr == 3 && (
              <PulseLoader
                color='black'
                speedMultiplier={1}
                size={14}
                mx='auto'
              />
            )}
            {pageNbr == 4 && (
              <Button onClick={() => setShow(false)}>okay</Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    );
  }
  return (
    <Dialog open={show} onClose={setShow}>
      {pageNbr == 1 && pageOne()}
      {pageNbr == 2 && pageTwo()}
      {pageNbr > 2 && pageThree()}
    </Dialog>
  );
}
