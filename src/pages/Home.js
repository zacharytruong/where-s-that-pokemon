import { Typography } from '@mui/material';
import { Gamecard } from '../components/Gamecard';
import Header from '../components/Header';

function Home({ games, setIsNewGame }) {
  return (
    <div>
      <Header />
      <div style={{ minHeight: 'calc(100vh - 17rem)' }}>
        <Typography
          variant="h1"
          align="center"
          sx={{ padding: '5rem 0 1rem 0' }}
        >
          Pick a game
        </Typography>
        <ul style={{ display: 'flex', justifyContent: 'center' }}>
          {games.map((game, index) => (
            <li key={index} className="gameList">
              <Gamecard game={game} setIsNewGame={setIsNewGame} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
