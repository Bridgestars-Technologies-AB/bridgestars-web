import { Box, Modal } from '@mui/material';
export default function CustomModal({ open, onClose, children, ...props }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        // outline: 'none',
        outline: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      // style={{
      //   outline: 0
      // }}
    >
      {/* <MKBox
          sx={{
            outline: 'none',
          }}
        > */}
      <Box sx={{ outline: 0 }}>{children}</Box>
      {/* </MKBox> */}
    </Modal>
  );
}
