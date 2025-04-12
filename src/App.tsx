import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Screens/Login/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeOptions } from './themeOptions';
import {Provider} from 'react-redux'
import { store } from './store';
import AppRouter from './router/Router';

function App() {
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
