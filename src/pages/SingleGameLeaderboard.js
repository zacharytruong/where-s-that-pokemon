import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function GameLeaderboard({ games }) {
  const { id } = useParams();
  const leaderboard = games.find((game) => game.gameName === id);
  return (
    <div>
      <Header />
    <div>
      <Typography align="center" variant="h2" sx={{ padding: '5rem 0' }}>
        {leaderboard.gameName.toUpperCase()} LEADERBOARD{' '}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '80%', margin: '0 auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
}

export default GameLeaderboard;
