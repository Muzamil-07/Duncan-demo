import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import Menu from '../components/Menu'
import Configurator from '../containers/Configurator'
import usePreload from '../lib/hooks/usePreload'
const Home = () => {
  usePreload()
  return (
    <Stack>
      <Configurator />
      <Menu />
    </Stack>
  )
}

export default Home
