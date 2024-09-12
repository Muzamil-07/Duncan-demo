import React, { Suspense, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import Menu from '../components/Menu'
import Configurator from '../containers/Configurator'
import { preloadTextures } from '../lib/utils'
const Home = () => {
  return (
    <Stack>
      <Configurator />
      <Menu />
    </Stack>
  )
}

export default Home
