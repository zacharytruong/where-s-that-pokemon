import { CssBaseline, ThemeProvider } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

function App() {
  const [isNewGame, setIsNewGame] = useState(true);
  const [gameState, setGameState] = useState({
    cmarcel: '',
    viking011: '',
    pokemonwall: ''
  });
  const [gameId, setGameId] = useState({});
  const [playerId, setPlayerId] = useState({})
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
              !isNewGame ? (
                <Game
                  db={db}
                  games={games}
                  pokemons={pokemons}
                  gameState={gameState}
                  setGameState={setGameState}
                  gameId={gameId}
                  setGameId={setGameId}
                  setIsNewGame={setIsNewGame}
                  playerId={playerId}
                  setPlayerId={setPlayerId}
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
            element={<SingleGameLeaderboard db={db} games={games} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
