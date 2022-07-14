import {
  Alert,
  Avatar,
  Box,
  Button,
  Icon,
  List,
  ListItemButton,
  Modal,
  Popover,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameHeader from '../components/GameHeader';
import COLLECTIONS from '../global/collections';

function Game({
  db,
  games,
  pokemons,
  gameState,
  setGameState,
  gameId,
  setGameId,
  setIsNewGame,
  playerId,
  setPlayerId
}) {
  // State for Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [alert, setAlert] = useState({});
  const [currentPos, setCurrentPos] = useState({ top: 0, left: 0 });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [xcoord, setXCoord] = useState('');
  const [ycoord, setYCoord] = useState('');
  const [currentPokemonsLocation, setCurrentPokemonsLocation] = useState([]);

  // State for gameOver
  const [lookup, setLookup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameDuration, setGameDuration] = useState([]);
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
  const handleClose = () => setAnchorEl(null);
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
      const docRef = doc(db, COLLECTIONS.GAMES, gameId[id]);
      const docSnap = await getDoc(docRef);
      await updateDoc(docRef, {
        ...docSnap.data(),
        pokemon: {
          ...docSnap.data().pokemon,
          [target]: true
        }
      });
      lookup ? setLookup(false) : setLookup(true);
    }

    handleClose();
  };

  const updatePlayerName = (e) => setPlayerName(e.target.value);
  const handleCancel = () => {
    // e.preventDefault();
    setIsNewGame(true);
    setGameState({
      cmarcel: '',
      viking011: '',
      pokemonwall: ''
    });
    setGameId({});
    setPlayerId({});
  };

  const handleSubmit = async (e) => {
    const createPlayerRecords = async () => {
      try {
        const playerRef = doc(db, COLLECTIONS.PLAYERS, playerId[id]);
        const playerSnap = await getDoc(playerRef);
        await updateDoc(playerRef, {
          ...playerSnap.data(),
          playerName: playerName
        });
      } catch (error) {
        console.error(
          'Failed to create a new player record in the database',
          error
        );
      }
    };
    e.preventDefault();
    createPlayerRecords();
    setIsNewGame(true);
    setGameState({
      cmarcel: '',
      viking011: '',
      pokemonwall: ''
    });
    setGameId({});
    setPlayerId({});
  };

  // Create a new game in the database if the current game is not active
  useEffect(() => {
    const createGameInDb = async () => {
      try {
        const gameStartTime = serverTimestamp();
        const game = {
          startAt: gameStartTime,
          pokemon: {
            bulbasaur: false,
            squirtle: false,
            psyduck: false
          }
        };
        const gameRef = await addDoc(collection(db, COLLECTIONS.GAMES), game);
        setGameId({
          ...gameId,
          [id]: gameRef.id
        });
        setGameState({
          ...gameState,
          [id]: game
        });
      } catch (error) {
        console.error(
          'Failed to create a new game session in the database',
          error
        );
      }
    };

    if (!!gameId[id]) return;
    createGameInDb();
  }, []);

  // Get pokemons location from the database
  useEffect(() => {
    const getPokemonsLocation = async () => {
      const querySnapshot = query(
        collection(db, 'locations'),
        where('gameName', '==', id)
      );
      const pokemonLocations = await getDocs(querySnapshot);
      const arr = [];
      pokemonLocations.forEach((doc) => {
        arr.push(doc.data());
      });

      setCurrentPokemonsLocation(arr);
    };
    getPokemonsLocation();
  }, []);

  // Listen for real time changes in the current game
  useEffect(() => {
    if (!gameId[id]) return;
    const unsub = onSnapshot(
      doc(db, COLLECTIONS.GAMES, gameId[id]),
      async (doc) => {
        setGameState({
          ...gameState,
          [id]: {
            ...doc.data()
          }
        });
        const pokemon = doc.data().pokemon;
        if (pokemon.squirtle && pokemon.bulbasaur && pokemon.psyduck) {
          setOpenModal(true);
          setGameOver(true);
          return;
        }
      },
      (error) => console.log(error)
    );
    return unsub;
  }, [lookup]);

  // Game over side effect
  useEffect(() => {
    // add end time to the current game
    // add duration to the players collection
    const registerEndTime = async (gameCollection, currentGameId) => {
      try {
        if (!gameId[id]) return;
        const gameEndTime = serverTimestamp();
        const docRef = doc(db, gameCollection, currentGameId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const pokemon = data.pokemon;
        if (pokemon.bulbasaur && pokemon.squirtle && pokemon.psyduck) {
          await updateDoc(docRef, {
            ...data,
            endAt: gameEndTime
          });
        }
      } catch (error) {
        console.log('Failed to create a stop time in the database');
      }
    };
    // add duration to the players collection
    const registerDuration = async (
      gameCollection,
      playerCollection,
      currentGameId
    ) => {
      try {
        if (!gameId[id]) return;
        const docRef = doc(db, gameCollection, currentGameId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const duration =
          parseFloat(data.endAt.seconds) - parseFloat(data.startAt.seconds);
        const playerRef = await addDoc(collection(db, playerCollection), {
          gameName: id,
          duration: duration
        });
        setPlayerId({
          ...playerId,
          [id]: playerRef.id
        });
        setGameDuration(new Date(duration * 1000).toISOString().slice(11, 19));
      } catch (error) {
        console.log(
          'Failed to create a duration record in the Players collection in the database'
        );
      }
    };
    const registerEndTimeAndDuration = async () => {
      await registerEndTime(COLLECTIONS.GAMES, gameId[id]);
      setTimeout(
        () =>
          registerDuration(COLLECTIONS.GAMES, COLLECTIONS.PLAYERS, gameId[id]),
        500
      );
    };
    registerEndTimeAndDuration();
  }, [gameOver]);

  return (
    <div>
      <GameHeader
        gameId={gameId}
        id={id}
        pokemons={pokemons}
        gameState={gameState}
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
      <Modal
        open={openModal}
        aria-labelledby="game-over-modal"
        aria-describedby="game-over"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            outline: 0,
            borderRadius: 2
          }}
          autoComplete="off"
          noValidate
        >
          <Typography id="modal-modal-title" variant="h6" component="h3">
            You caught them all in {gameDuration}!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to leave your name here so the world knows that you
            caught 3 pokemons? If not, you can just click "Cancel".
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="player-name"
              label="Enter your fancy name here..."
              variant="standard"
              fullWidth
              color="success"
              margin="none"
              value={playerName}
              onChange={updatePlayerName}
              sx={{ marginTop: 3 }}
              inputProps={{
                minLength: 2,
                maxLength: 24,
                autoComplete: 'off',
                pattern: '[A-Za-z]+'
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: 30
              }}
            >
              <Button
                onClick={handleCancel}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit <Icon sx={{ marginLeft: 2 }}>send</Icon>
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Game;
