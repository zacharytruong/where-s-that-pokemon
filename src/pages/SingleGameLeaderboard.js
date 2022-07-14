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
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import COLLECTIONS from '../global/collections';
import Header from '../components/Header';
import { useState } from 'react';

function GameLeaderboard({ db, games }) {
  const { id } = useParams();
  const leaderboard = games.find((game) => game.gameName === id);
  const [rankingArr, setRankingArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const retrieveRankingInfo = async () => {
      const rankingQuery = query(
        collection(db, COLLECTIONS.PLAYERS),
        where('gameName', '==', id),
        orderBy('duration'),
        limit(10)
      );
      const querySnapshot = await getDocs(rankingQuery);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.playerName) return;
        setRankingArr((rankingArr) => [...rankingArr, data]);
      });
      setIsLoading(true);
    };
    retrieveRankingInfo();
  }, [isLoading]);

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
                <TableCell sx={{ fontWeight: 900 }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Player</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Time (s)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankingArr &&
                rankingArr.map((doc, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.playerName}</TableCell>
                      <TableCell>{doc.duration}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default GameLeaderboard;
