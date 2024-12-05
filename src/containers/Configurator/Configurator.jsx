/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxState,
  selectBoxStyle,
  setBoxState,
} from '../../lib/store/features/box/boxSlice';
import {
  selectMode,
  selectSceneHeight,
  selectZoom,
  setMode,
  setZoom,
} from '../../lib/store/features/general/generalSlice';
import { Box, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import Navbar from '../../components/Navbar';
import PlaceHolder from '../../components/PlaceHoler/PlaceHolder';
import CanvasScreen from '../Experience/CanvasScreen';
import ModelBuilder from '../../components/ModelBuilder';
import { divideVh } from '../../lib/utils';
import SideInfoCard from '../../components/SideInfoCard/SideInfoCard';

const Configurator = () => {
  // const [mode, setMode] = useState('black')
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const style = useAppSelector(selectBoxStyle);
  const boxState = useAppSelector(selectBoxState);
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const [modelHasAnimation, setModelHasAnimation] = useState(true);

  const modelsWithoutAnimation = ['sleeve', 'selef-lock-tray', 'header-card'];
  useEffect(() => {
    if (modelsWithoutAnimation.includes(style)) {
      setModelHasAnimation(false);
    } else {
      setModelHasAnimation(true);
    }
  }, [style]);

  const handleMode = () => {
    dispatch(setMode(mode === 'black' ? 'white' : 'black'));
    // setMode(prevMode => (prevMode === 'black' ? 'white' : 'black'))
  };
  const toggleBoxState = () => {
    if (boxState === 'close') dispatch(setBoxState('open'));
    else if (boxState === 'open') dispatch(setBoxState('close'));
  };

  const sceneHeight = useAppSelector(selectSceneHeight);
  const prevZoom = useAppSelector(selectZoom);

  const captureCanvasHandler = () => {
    const link = document.createElement('a');
    link.setAttribute('download', 'canvas.png');
    const canvas = document.querySelector('canvas');
    if (canvas) {
      link.setAttribute(
        'href',
        canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      );
      link.click();
    } else {
      alert('Select a canvas first');
    }
  };

  const handleFullscreen = () => {
    const body = document.querySelector('#root');
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      if (body.requestFullscreen) {
        body.requestFullscreen();
      } else if (body.webkitRequestFullscreen) {
        body.requestFullscreen();
      }

      console.log('Open full screen');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      console.log('Close full screen');
    }
  };


  return (
    <Box
      sx={{
        maxWidth: '100vw',
        height: sceneHeight,
        bgcolor: mode === 'black' ? '#443E3E' : '#e0dede',
        transition: 'all 0.8s',
      }}
    >
      {/* NAVBAR */}
      {/* <Navbar mode={mode} /> */}

      <Grid container>
        {/* LEFT ICONS */}
        <Stack
          justifyContent="center"
          sx={{
            position: 'fixed', // Fix the stack position
            left: '30px', // Margin of 10 pixels from the left
            top: divideVh(sceneHeight, 2), // Vertically center the stack
            transform: 'translateY(-50%)', // Adjust to ensure centering
            zIndex: 200000,
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'white',
              borderRadius: '8px',
              marginBottom: '8px',
              width: '30px',
              height: '30px',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
            onClick={captureCanvasHandler}
          >
            <img
              src="/assets/icons/camera.webp"
              style={{ width: '20px', height: '20px' }}
            />
          </IconButton>
          <IconButton
            onClick={handleMode}
            sx={{
              bgcolor: 'white',
              borderRadius: '8px',
              marginBottom: '8px',
              width: '30px',
              height: '30px',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
          >
            <img
              src={
                mode === 'black'
                  ? '/assets/icons/sun.webp'
                  : '/assets/icons/moon.webp'
              }
              style={{ width: '20px', height: '20px' }}
            />
          </IconButton>
          {modelHasAnimation && (
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                marginBottom: '8px',
                width: '30px',
                height: '30px',
                '&:hover': {
                  bgcolor: 'white',
                },
              }}
              onClick={toggleBoxState}
            >
              <img
                src={`/assets/icons/box-${boxState}.webp`}
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
          )}
          <Tooltip
            title={<SideInfoCard setIsInfoOpen={setIsInfoOpen} />}
            open={isInfoOpen}
            placement="right"
            PopperProps={{
              container: document.querySelector('#root'),
              sx: {
                '& .MuiTooltip-tooltip': {
                  padding: '0px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                },
              },
            }}
          >
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                marginBottom: '8px',
                width: '30px',
                height: '30px',
                '&:hover': {
                  bgcolor: 'white',
                },
              }}
              onClick={() => setIsInfoOpen(!isInfoOpen)}
            >
              <img
                src="/assets/icons/info-circle.webp"
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
          </Tooltip>
          <IconButton
            sx={{
              bgcolor: 'white',
              borderRadius: '8px',
              width: '30px',
              height: '30px',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
            onClick={handleFullscreen}
          >
            <img
              src="/assets/icons/maximize.webp"
              style={{ width: '20px', height: '20px' }}
            />
          </IconButton>
        </Stack>

        {/* MAIN SCREEN */}

        {style === 'none' ? (
          <PlaceHolder />
        ) : (
          <CanvasScreen>
            <ModelBuilder />
          </CanvasScreen>
        )}
        {/* ZOOM IN/OUT */}

        <Stack
          justifyContent="center"
          sx={{
            position: 'fixed', // Fix the stack position
            right: '30px', // Margin of 10 pixels from the left
            top: divideVh(sceneHeight, 2), // Vertically center the stack
            transform: 'translateY(-50%)', // Adjust to ensure centering
            zIndex: 200000,
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'white',
              borderRadius: '6px 6px 0px 0px',
              borderBottom: '1px solid #f2f0eb',
              width: '30px',
              height: '30px',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
            onClick={() => {
              if (prevZoom != 100) dispatch(setZoom(prevZoom + 10));
            }}
          >
            <img
              src="/assets/icons/zoom-in.webp"
              style={{ width: '20px', height: '20px' }}
            />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'white',
              borderRadius: '0px 0px 6px 6px',
              width: '30px',
              height: '30px',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
            onClick={() => {
              if (prevZoom != 0) dispatch(setZoom(prevZoom - 10));
            }}
          >
            <img
              src="/assets/icons/zoom-out.webp"
              style={{ width: '20px', height: '20px' }}
            />
          </IconButton>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Configurator;
