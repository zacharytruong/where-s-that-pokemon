import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import gsap from 'gsap';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaderboardGamecard({ game }) {
  const navigate = useNavigate();
  const cardRef = useRef();
  const handleGameMouseEnter = () =>
    gsap.to(cardRef.current, { scale: 1.1, cursor: 'pointer' });
  const handleGameMouseLeave = () =>
    gsap.to(cardRef.current, { scale: 1, cursor: 'arrow' });
  const handleOnClick = () => {
    navigate(`/leaderboard/${game.gameName}`);
  };
  return (
    <Card
      sx={{ maxWidth: 250, margin: '3rem' }}
      elevation={1}
      className={game.id}
      ref={cardRef}
      onMouseEnter={handleGameMouseEnter}
      onMouseLeave={handleGameMouseLeave}
      onClick={handleOnClick}
    >
      <CardMedia
        component="img"
        image={game.image}
        alt={game.gameName}
        height={350}
      />
      <CardContent>
        <Typography align="center" sx={{ fontSize: '3rem' }}>
          {game.gameName}
        </Typography>
      </CardContent>
    </Card>
  );
}

export { LeaderboardGamecard };
