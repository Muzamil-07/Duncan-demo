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
useTexture.preload(
  '/assets/models/tuckend/coated_white/outside_cmyk_2spot_metflo.jpg'
)
useTexture.preload(
  '/assets/models/mailer/coated_white/outside_cmyk_1spot_metflo.jpg'
)
