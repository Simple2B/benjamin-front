import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const Spinner = () => {
  return (
    <>
      <Player
        autoplay
        loop
        src="https://lottie.host/b0b58d6a-b193-4e7e-9524-3cd7f4d995af/DnmncwplDq.json"
        style={{ height: '60px', width: '60px' }}
      ></Player>
    </>
  );
};

export default Spinner;
