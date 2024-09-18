import { Box } from '@mui/material'
import './App.css'
import Home from './pages'
import { useEffect } from 'react'
import { preloadTextures } from './lib/utils'
import { useGLTF } from '@react-three/drei'

function App () {
  // useEffect(() => {
  //   setTimeout(() => {
  //     preloadTextures()
  //   }, 1000)
  // }, [])
  return (
    <>
      <Home />
    </>
  )
}

export default App
useGLTF.preload('/assets/models/mailer/mailer-box.gltf')
useGLTF.preload('/assets/models/tuckend/tuckend.glb')
