import React from 'react'
import { Stack } from '@mui/material'
import Menu from '../components/Menu'
import Configurator from '../containers/Configurator'
const Home = () => {
  return (
    <Stack>
      <Configurator />
      <Menu />
    </Stack>
  )
}

export default Home
