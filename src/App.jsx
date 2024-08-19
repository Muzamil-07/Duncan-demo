import { useGLTF, useTexture } from '@react-three/drei'
import './App.css'
import Home from './pages'
import { useEffect } from 'react'

function App () {
  return (
    <>
      <Home />
    </>
  )
}

export default App
useGLTF.preload('/assets/models/tuckend/tuckend.glb')
useGLTF.preload('/assets/models/mailer/mailer-box.glb')
