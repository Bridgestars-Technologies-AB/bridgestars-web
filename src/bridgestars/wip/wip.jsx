import MKButton from 'otis/MKButton';
import { useNavigate } from 'react-router-dom';
export default function WIP() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: '#eceff1',
        color: 'rgba(0, 0, 0, 0.87)',
        'font-family': 'Roboto, Helvetica, Arial, sans-serif',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        id='message'
        style={{
          background: 'white',
          maxWidth: '360px',
          margin: '100px auto 16px',
          padding: '32px 24px 16px',
          borderRadius: '3px',
        }}
      >
        <h2
          style={{
            background: 'white',
            maxWidth: '360px',
            margin: '100px auto 16px',
            padding: '32px 24px 16px',
            borderRadius: '3px',
            color: '#ffa100',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Work In Progress
        </h2>
        <h1
          style={{
            background: 'white',
            maxWidth: '360px',
            margin: '100px auto 16px',
            padding: '32px 24px 16px',
            borderRadius: '3px',
            color: '#ffa100',
            fontWeight: 500,
            fontSize: '22px',
          }}
        >
          This page is under construction, please come back in a while
        </h1>
        <p>
          <MKButton
            fullWidth
            mt={2}
            //fontSize='5vmin'
            size='large'
            variant='text'
            color='dark'
            sx={{ color: '#ffa100' }}
            onClick={() => navigate('/', { replace: true })}
          >
            GO BACK
          </MKButton>
        </p>
      </div>
    </div>
  );
}
