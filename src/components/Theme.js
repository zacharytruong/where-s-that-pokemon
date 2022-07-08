import { createTheme } from '@mui/material';

const Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-size: 10px;
        }
        a {
          color: #f44336;
          font-size: 1.6rem;
        }
        a:link {
          text-decoration: none;
          font-family: 'Eater';
        }
        ul {
          list-style: none;
        }
      `
    }
  },
  palette: {
    type: 'light',
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#f44336'
    }
  },
  typography: {
    fontFamily: 'Gentium Plus',
    fontSize: 30,
    h1: {
      fontFamily: 'Eater',
      fontSize: '3rem'
    },
    h2: {
      fontFamily: 'Eater',
      fontSize: '2.4rem'
    },
    h3: {
      fontFamily: 'Eater',
      fontSize: '2rem'
    },
    h4: {
      fontFamily: 'Eater',
      fontSize: '1.8rem'
    },
    h5: {
      fontFamily: 'Eater',
      fontSize: '1.6rem'
    }
  }
});

export default Theme;
