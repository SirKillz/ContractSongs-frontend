import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1ed760",
      light: "#74f5a1"
    }
  },
  typography: {
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.75rem', fontWeight: 500 },
    h3: { fontSize: '1.5rem', fontWeight: 400 }
  },
});

export default theme;