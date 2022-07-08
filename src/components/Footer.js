import { Typography } from '@mui/material';

function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000000',
        minHeight: '7rem'
      }}
    >
      <Typography variant="h5" color="#FFFFFF" align="center">
        © BY ZACHARY TRUONG
      </Typography>
    </footer>
  );
}

export default Footer;
