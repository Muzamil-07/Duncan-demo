import React from 'react'
import { Stack } from '@mui/material'
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

preloadTextures()
