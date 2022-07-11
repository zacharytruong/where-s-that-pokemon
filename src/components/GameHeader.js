// import { Avatar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function GameHeader({ pokemons, gameState }) {
  //   <Avatar
  //     alt={pokemon.name}
  //     src={pokemon.avatar}
  //     key={index}
  //     role="listitem"
  //   ></Avatar>
  console.log('game header')
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
      {/* <Stack direction="row" spacing={2} role="list">
        {arr}
      </Stack> */}
    </div>
  );
}

export default GameHeader;
