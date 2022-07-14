import { Avatar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function GameHeader({ id, pokemons, gameState }) {
  const avatars = pokemons.map((pokemon, index) => {
    if (!gameState[id].pokemon) return null;
    if (gameState[id].pokemon[pokemon.name.toLowerCase()]) {
      return (
        <Avatar
          alt={pokemon.name}
          src={pokemon.avatar}
          key={index}
          role="listitem"
          sx={{ filter: 'grayscale(100%)' }}
        ></Avatar>
      );
    }
    return (
      <Avatar
        alt={pokemon.name}
        src={pokemon.avatar}
        key={index}
        role="listitem"
      ></Avatar>
    );
  });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        background: '#000000',
        minHeight: '10rem',
        position: 'sticky',
        top: 0
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
