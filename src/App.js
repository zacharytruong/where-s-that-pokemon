import { CssBaseline, ThemeProvider } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import getFirebaseConfig from './components/firebaseConfig';
import Footer from './components/Footer';
import Theme from './components/Theme';
import games from './data/Games';
import pokemons from './data/Pokemons';
import Game from './pages/Game';
import Home from './pages/Home';
import Info from './pages/Info';
import Leaderboard from './pages/Leaderboard';
import SingleGameLeaderboard from './pages/SingleGameLeaderboard';

initializeApp(getFirebaseConfig());

function App() {
  const [isNewGame, setIsNewGame] = useState(false);
  const [gameState, setGameState] = useState({
    cmacel: '',
    viking011: '',
    pokemonwall: ''
  });
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home games={games} setIsNewGame={setIsNewGame} />}
          />
          <Route
            path="/game/:id"
            element={
              isNewGame ? (
                <Game
                  games={games}
                  pokemons={pokemons}
                  gameState={gameState}
                  setGameState={setGameState}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/info" element={<Info />} />
          <Route path="/leaderboard" element={<Leaderboard games={games} />} />
          <Route
            path="/leaderboard/:id"
            element={<SingleGameLeaderboard games={games} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
