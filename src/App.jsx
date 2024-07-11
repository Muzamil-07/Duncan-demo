import { useGLTF, useTexture } from '@react-three/drei'
import './App.css'
import Home from './pages'
import { useEffect } from 'react'

function App () {
  useEffect(() => {
    useGLTF.preload('/assets/models/tuckend/tuckend.glb')
    useGLTF.preload('/assets/models/mailer/mailer-box.glb')
    useTexture.preload(
      '/assets/models/tuckend/coated_white/outside_cmyk_2spot_metflo.jpg'
    )
    useTexture.preload(
      '/assets/models/mailer/coated_white/outside_cmyk_1spot_metflo.jpg'
    )
  }, [])
  return (
    <>
      <Home />
    </>
  )
}

export default App
