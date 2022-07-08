import {
  Alert,
  Avatar,
  List,
  ListItemButton,
  Popover,
  Snackbar,
  Typography
} from '@mui/material';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  getDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameHeader from '../components/GameHeader';

function Game({ games, pokemons, gameState, setGameState }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState({});
  const [currentGameRef, setCurrentGameRef] = useState({});
  const [currentGameProgress, setCurrentGameProgress] = useState({});
  const [currentPokemonsLocation, setCurrentPokemonsLocation] = useState([]);
  const [currentPos, setCurrentPos] = useState({ top: 0, left: 0 });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [xcoord, setXCoord] = useState('');
  const [ycoord, setYCoord] = useState('');
  const { id } = useParams();
  const { gameName, imageFullSize } = games.find(
    (game) => game.gameName === id
  );

  const handleOpen = (e) => {
    setCurrentPos({ top: e.clientY, left: e.clientX });
    setAnchorEl(e.currentTarget);

    // Find clicked coords
    setXCoord(
      Math.round(
        (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
      )
    );
    setYCoord(
      Math.round(
        (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
      )
    );
  };

  const handleClose = () => {
    // Close the popup list
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const matchCorrectLocation = async (e) => {
    const isWithinTwoDegree = (clickedCoord, defaultCoord) => {
      if (clickedCoord > defaultCoord - 2 && clickedCoord < defaultCoord + 2) {
        return true;
      } else return false;
    };

    // FInd clicked pokemon in the list
    const target = e.target.closest('.pokemonList').getAttribute('pokemon');

    const clickedPokemon = currentPokemonsLocation.find(
      (location) => location.pokemon === target
    );
    const isXCoordWithinTwoDegree = isWithinTwoDegree(
      xcoord,
      clickedPokemon.xcoord
    );
    const isYCoordWithinTwoDegree = isWithinTwoDegree(
      ycoord,
      clickedPokemon.ycoord
    );
    if (!isXCoordWithinTwoDegree || !isYCoordWithinTwoDegree) {
      setAlert({
        ...alert,
        severity: 'error',
        message: 'No pokemon found!'
      });
      setSnackbarOpen(true);
    }
    if (isXCoordWithinTwoDegree && isYCoordWithinTwoDegree) {
      setAlert({
        ...alert,
        severity: 'success',
        message: `You found ${target.toUpperCase()}`
      });
      setSnackbarOpen(true);
      const docSnap = await getDoc(currentGameRef);
      const arr = docSnap.data().pokemons.map((pokemon) => {
        for (const key in pokemon) {
          if (key === target) {
            pokemon[key] = true;
          }
        }
        return pokemon;
      });
      await updateDoc(currentGameRef, {
        ...docSnap.data(),
        pokemons: arr
      });
    }

    handleClose();
  };

  useEffect(() => {
    // Create a new game in the database
    const createGameInDb = async (game) => {
      try {
        const gameStart = serverTimestamp();
        const gameRef = await addDoc(collection(getFirestore(), 'games'), {
          startAt: gameStart,
          game: id,
          pokemons: [
            { bulbasaur: false },
            { squirtle: false },
            { psyduck: false }
          ]
        });
        const querySnapshot = query(
          collection(getFirestore(), 'locations'),
          where('gameName', '==', gameName)
        );
        const pokemonLocations = await getDocs(querySnapshot);
        const arr = [];
        pokemonLocations.forEach((doc) => {
          arr.push(doc.data());
        });
        setCurrentGameRef(gameRef);
        setCurrentPokemonsLocation(arr);
      } catch (error) {
        console.error(
          'Failed to create a new game session in the database',
          error
        );
      }
    };
    if (gameState[id]) {
      return;
    }
    setGameState({
      ...gameState,
      [id]: true
    });
    createGameInDb();
  });

  useEffect(() => {
    if (currentGameRef.id) {
      const collectionRef = doc(getFirestore(), 'games', currentGameRef.id);
      onSnapshot(collectionRef, (doc) => {
        setCurrentGameProgress(doc.data());
      });
    }
  }, [currentGameRef]);
  return (
    <div>
      <GameHeader
        pokemons={pokemons}
        currentGameProgress={currentGameProgress}
      />
      <div
        style={{
          display: 'flex'
        }}
      >
        <img
          src={imageFullSize}
          alt={gameName}
          style={{ width: '100%' }}
          onClick={handleOpen}
        />
        <Popover
          open={open}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: parseInt(currentPos.top),
            left: parseInt(currentPos.left) + 20
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
        >
          <List>
            {pokemons.map((pokemon, index) => (
              <ListItemButton
                key={index}
                onClick={matchCorrectLocation}
                className="pokemonList"
                pokemon={pokemon.name.toLowerCase()}
              >
                <Avatar
                  alt={`${pokemon.name} avatar`}
                  src={pokemon.avatar}
                ></Avatar>
                <Typography p="0 0.5rem 0 0.5rem">{pokemon.name}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Popover>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Game;
