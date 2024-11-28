import { Box, ThemeProvider } from '@mui/material';
import './App.css';
import Home from './pages';
import { useEffect } from 'react';
import { preloadTextures } from './lib/utils';
import { useGLTF } from '@react-three/drei';
import theme from './themes/theme';

function App() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     preloadTextures()
  //   }, 1000)
  // }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
useGLTF.preload('/assets/models/mailer/mailer-box.gltf');
useGLTF.preload('/assets/models/tuckend/tuckend.glb');
useGLTF.preload('/assets/models/buffer-lid/buffer-lid.glb');
useGLTF.preload('/assets/models/crash-lock-base/crash-lock-base.glb');
useGLTF.preload('/assets/models/selef-lock-tray/selef-lock-tray.glb');
useGLTF.preload('/assets/models/skillet/skillet.glb');
useGLTF.preload('/assets/models/sleeve/sleeve.glb');
useGLTF.preload('/assets/images/sleeve/shadow-2.png');
