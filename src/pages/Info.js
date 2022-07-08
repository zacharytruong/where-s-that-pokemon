import { Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
function Info() {
  return (
    <div>
      <Header />
    <div
      style={{
        minHeight: 'calc(100vh  - 17rem)',
        textAlign: 'center'
      }}
    >
      <div style={{ height: '5rem' }}></div>
      <Typography>
        This project was made by ZACHARY TRUONG for The Odin Project
      </Typography>
      <Typography>DEMONSTRATED SKILLS:</Typography>
      <ul>
        <li>REACT</li>
        <li>BUNDLED BY CREATE REACT APP</li>
        <li>FIREBASE</li>
      </ul>
      <Typography>
        CMARCEL GAME IMAGE WAS CREATED BY CHRISTOPHER AIKMAN MARCEL
      </Typography>
      <Typography>
        POKEMONWALL WAS RETRIEVED FROM PINTEREST
      </Typography>
      <Typography>
        VIKING101 GAME IMAGE WAS CREATED BY VIKING101 ON DEVIANTART
      </Typography>
    </div>
    </div>
  );
}

export default Info;
