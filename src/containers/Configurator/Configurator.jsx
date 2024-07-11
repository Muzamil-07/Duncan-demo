/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import { selectBoxStyle } from '../../lib/store/features/box/boxSlice'
import {
  selectSceneHeight,
  selectZoom,
  setZoom
} from '../../lib/store/features/general/generalSlice'
import { Box, Grid, IconButton, Stack } from '@mui/material'
import Navbar from '../../components/Navbar'
import PlaceHolder from '../../components/PlaceHoler/PlaceHolder'
import CanvasScreen from '../Experience/CanvasScreen'
import ModelBuilder from '../../components/ModelBuilder'

const Configurator = () => {
  const [mode, setMode] = useState('black')
  const style = useAppSelector(selectBoxStyle)

  const handleMode = () => {
    setMode(prevMode => (prevMode === 'black' ? 'white' : 'black'))
  }

  const sceneHeight = useAppSelector(selectSceneHeight)

  const prevZoom = useAppSelector(selectZoom)
  const dispatch = useAppDispatch()

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        height: sceneHeight,
        bgcolor: mode === 'black' ? '#443E3E' : '#e0dede',

        transition: 'all 0.8s'
      }}
    >
      {/* NAVBAR */}
      <Navbar mode={mode} />

      <Grid container>
        {/* LEFT ICONS */}
        <Grid item xs={1}>
          <Stack
            justifyContent='center'
            sx={{ marginTop: '12rem', marginLeft: '1.5rem' }}
          >
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                marginBottom: '8px',
                width: '30px',
                height: '30px',
                '&:hover': {
                  bgcolor: 'white'
                }
              }}
            >
              <img
                src='/assets/icons/camera.png'
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
                  bgcolor: 'white'
                }
              }}
            >
              <img
                src={
                  mode === 'black'
                    ? '/assets/icons/sun.png'
                    : '/assets/icons/moon.png'
                }
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                marginBottom: '8px',
                width: '30px',
                height: '30px',

                '&:hover': {
                  bgcolor: 'white'
                }
              }}
            >
              <img
                src='/assets/icons/box.png'
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                marginBottom: '8px',
                width: '30px',
                height: '30px',
                '&:hover': {
                  bgcolor: 'white'
                }
              }}
            >
              <img
                src='/assets/icons/info-circle.png'
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '8px',
                width: '30px',
                height: '30px',
                '&:hover': {
                  bgcolor: 'white'
                }
              }}
            >
              <img
                src='/assets/icons/maximize.png'
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
          </Stack>
        </Grid>

        {/* MAIN SCENE */}
        <Grid item xs={10}>
          {style === 'none' ? (
            <PlaceHolder />
          ) : (
            <CanvasScreen>
              <ModelBuilder />
            </CanvasScreen>
          )}
        </Grid>

        {/* ZOOM IN/OUT */}
        <Grid item xs={1}>
          <Stack
            justifyContent='center'
            alignItems='flex-end'
            sx={{ marginTop: '17rem', marginRight: '1.5rem' }}
          >
            <IconButton
              sx={{
                bgcolor: 'white',
                borderRadius: '6px 6px 0px 0px',
                borderBottom: '1px solid #f2f0eb',
                width: '30px',
                height: '30px',
                '&:hover': {
                  bgcolor: 'white'
                }
              }}
              onClick={() => {
                if (prevZoom != 100) dispatch(setZoom(prevZoom + 10))
              }}
            >
              <img
                src='/assets/icons/zoom-in.png'
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
                  bgcolor: 'white'
                }
              }}
              onClick={() => {
                if (prevZoom != 0) dispatch(setZoom(prevZoom - 10))
              }}
            >
              <img
                src='/assets/icons/zoom-out.png'
                style={{ width: '20px', height: '20px' }}
              />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Configurator
