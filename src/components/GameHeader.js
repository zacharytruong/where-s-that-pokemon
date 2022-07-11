import { Avatar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function GameHeader({ pokemons, currentGameProgress }) {
  // const pokemonsArr = [];
  // pokemons.map((pokemon) => pokemonsArr.push(pokemon));
  // const displayArr = pokemonsArr.map((pokemon, index) => {
  //   if (!currentGameProgress.pokemons) return null;
  //   const dbPokemon = currentGameProgress.pokemons.find((dbPokemon) => {
  //     for (const pokemonName in dbPokemon) {
  //       if (pokemonName === pokemon.name.toLowerCase()) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  //   if (dbPokemon[pokemon.name.toLowerCase()]) {
  //     return (
  //       <Avatar
  //         alt={pokemon.name}
  //         src={pokemon.avatar}
  //         key={index}
  //         role="listitem"
  //         sx={{ filter: 'grayscale(100%)' }}
  //       ></Avatar>
  //     );
  //   }
  //   return (
  //     <Avatar
  //       alt={pokemon.name}
  //       src={pokemon.avatar}
  //       key={index}
  //       role="listitem"
  //     ></Avatar>
  //   );
  // });

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
        {displayArr}
      </Stack> */}
    </div>
  );
}

export default GameHeader;
