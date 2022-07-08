import { Typography } from '@mui/material';
import Header from '../components/Header';
import { LeaderboardGamecard } from './../components/LeaderboardGameCard';

function Leaderboard({ games }) {
  return (
    <div>
      <Header />
      <div style={{ minHeight: 'calc(100vh  - 17rem)' }}>
        <Typography variant="h1" align="center" sx={{ padding: '3rem 0' }}>
          View the leaderboard
        </Typography>
        <ul style={{ display: 'flex', justifyContent: 'center' }}>
          {games.map((game, index) => (
            <li key={index}>
              <LeaderboardGamecard game={game} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
