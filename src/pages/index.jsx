import React from 'react'
import { Stack } from '@mui/material'
import Menu from '../components/Menu'
import Configurator from '../containers/Configurator'
import { preloadTextures } from '../lib/utils'
import { useGLTF } from '@react-three/drei'
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
// useGLTF.preload('/assets/models/mailer/mailer-box.glb')
// useGLTF.preload('/assets/models/tuckend/tuckend.glb')
