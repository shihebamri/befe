import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TutorialsList from './components/TutorialsList';
import Tutorial from './components/Tutorial';
import AddTutorial from './components/AddTutorial';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Logo from './logo.svg';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2D3047',
      light: '#4C5c96',
      dark: '#1a1b2e',
    },
    secondary: {
      main: '#E85D75',
      light: '#ff8fa3',
      dark: '#b12a4a',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '1.3rem',
      letterSpacing: '-0.5px',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #2D3047 0%, #4C5c96 100%)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const appBarRef = useRef(null);

  useEffect(() => {
    if (appBarRef.current) {
      appBarRef.current.offsetHeight;
      appBarRef.current.style.transition = 'transform 0.5s ease-in-out';
      appBarRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  return (
    <ThemeProvider theme={createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        mode: darkMode ? 'dark' : 'light',
      },
    })}>
      <CssBaseline />
      <Router>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AppBar position="sticky" ref={appBarRef}>
            <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
              <motion.img
                src={Logo}
                alt="Logo"
                style={{ height: '40px' }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  ml: 2,
                  flexGrow: 1,
                  background: 'linear-gradient(45deg, #E85D75, #4C5c96)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Tutorials App
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/tutorials"
                  sx={{
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    mr: 2,
                  }}
                >
                  Tutorials
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/add"
                  sx={{
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Add Tutorial
                </Button>
              </motion.div>
              <IconButton 
                sx={{ ml: 2 }} 
                onClick={() => setDarkMode(!darkMode)} 
                color="inherit"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </motion.div>
        <Container 
          maxWidth="md" 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 3,
            background: darkMode 
              ? 'linear-gradient(145deg, #1a1b2e 0%, #2D3047 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: darkMode
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(45, 48, 71, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Routes>
            <Route path="/" element={<TutorialsList />} />
            <Route path="/tutorials" element={<TutorialsList />} />
            <Route path="/tutorials/:id" element={<Tutorial />} />
            <Route path="/add" element={<AddTutorial />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
