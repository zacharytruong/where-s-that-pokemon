import { Avatar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function GameHeader({ avatars, gameId, id, pokemons, gameState }) {
  // const avatars = pokemons.map((pokemon) => pokemon);

  console.log('header');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        background: '#000000',
        minHeight: '10rem'
      }}
    >
      <Link to="/">WTP Home</Link>
      <Stack direction="row" spacing={2} role="list">
        {avatars}
      </Stack>
    </div>
  );
}

export default GameHeader;
