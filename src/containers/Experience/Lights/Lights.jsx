/* eslint-disable react/no-unknown-property */
import { Environment } from '@react-three/drei'
import React from 'react'
import { useHelper } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { DirectionalLightHelper, AxesHelper, GridHelper } from 'three'

const Lights = () => {
  const dirLight1 = useRef()
  const dirLight2 = useRef()
  const dirLight3 = useRef()
  const dirLight4 = useRef()
  const dirLight5 = useRef()
  const dirLight6 = useRef()

  // useHelper(dirLight1, DirectionalLightHelper, 1)
  // useHelper(dirLight2, DirectionalLightHelper, 1)
  // useHelper(dirLight3, DirectionalLightHelper, 1)
  // useHelper(dirLight4, DirectionalLightHelper, 1)
  // useHelper(dirLight5, DirectionalLightHelper, 1)
  // useHelper(dirLight6, DirectionalLightHelper, 1)

  useEffect(() => {
    // const axesHelper = new AxesHelper(5)
    // const gridHelper = new GridHelper(10, 10)
    // dirLight1.current.parent.add(axesHelper)
    // dirLight1.current.parent.add(gridHelper)
  }, [])

  return (
    <>
      {/* FRONT */}
      <directionalLight
        castShadow
        ref={dirLight1}
        position={[2, 0, 4]}
        intensity={0.7}
      />
      {/* BACK */}
      <directionalLight ref={dirLight2} position={[-2, 0, -4]} intensity={1} />
      {/* TOP */}
      <directionalLight
        ref={dirLight3}
        castShadow
        position={[0, 5, 0]}
        intensity={0.2}
      />
      {/* BOTTOM */}
      <directionalLight ref={dirLight4} position={[0, -3, 0]} intensity={1.6} />
      {/* RIGHT */}
      <directionalLight ref={dirLight5} position={[4, 1, -0.5]} intensity={1} />
      {/* LEFT */}
      <directionalLight ref={dirLight6} position={[-4, 1, 0]} intensity={1} />
      <ambientLight intensity={1} />
      {/* <Environment
        background={false} // can be true, false or "only" (which only sets the background) (default: false)
        blur={0} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        files={'/assets/texture/overcast_soil_puresky_1k (1).hdr'}
        // path='/assets/buikslotermeerplein_1k.hdr'
        // preset={'city'}
        // scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
        // encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
      /> */}
    </>
  )
}

export default Lights
