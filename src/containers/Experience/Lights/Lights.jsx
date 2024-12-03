/* eslint-disable react/no-unknown-property */
import { Environment, Float, Lightformer } from '@react-three/drei'
import React from 'react'
import { useHelper } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import {
  DirectionalLightHelper,
  AxesHelper,
  GridHelper,
  PointLightHelper,
  BackSide
} from 'three'
import { useFrame } from '@react-three/fiber'
import { Color, Depth, LayerMaterial } from 'lamina'
import { useAppSelector } from '../../../lib/store/hooks'
import { selectMode } from '../../../lib/store/features/general/generalSlice'

const Lights = () => {
  const dirLight1 = useRef()
  const dirLight2 = useRef()
  const dirLight3 = useRef()
  const dirLight4 = useRef()
  const dirLight5 = useRef()
  const dirLight6 = useRef()
  const dirLight7 = useRef()

  // const pointLight1 = useRef()

  // useHelper(dirLight1, DirectionalLightHelper, 1)
  // useHelper(dirLight2, DirectionalLightHelper, 1)
  // useHelper(dirLight3, DirectionalLightHelper, 1)
  // useHelper(dirLight4, DirectionalLightHelper, 1)
  // useHelper(dirLight5, DirectionalLightHelper, 1)
  // useHelper(dirLight6, DirectionalLightHelper, 1)
  // useHelper(dirLight7, DirectionalLightHelper, 1)

  // useHelper(pointLight1, PointLightHelper, 1)

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
      <directionalLight
        castShadow
        ref={dirLight7}
        position={[0, -1, 4]}
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

      {/* POINT LIGHT */}

      {/* <pointLight ref={pointLight1} position={[0, 0, 3]} intensity={2} /> */}

      <ambientLight intensity={0.5} />
      {/* <Environment
        background={true} // can be true, false or "only" (which only sets the background) (default: false)
        backgroundBlurriness={1} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        files={'/assets/circus_arena_1k.hdr'}
        environmentRotation={[0,0,Math.PI/6]}
        environmentIntensity={0}
        // environmentRotation={Math.PI/2}
        // path='/assets/buikslotermeerplein_1k.hdr'
        // preset={'city'}
        // scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
        // encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
      /> */}
      <Environment resolution={256} background backgroundBlurriness={1} environmentIntensity={0}>
        <Lightformers />
      </Environment>
    </>
  )
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  const mode = useAppSelector(selectMode);
  useFrame((state, delta) => (group.current.position.z += delta * 1) > 20 && (group.current.position.z = -10))
  return (
    <>
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={0.5} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color={mode === 'black' ? "red" : '#e0dede'} intensity={0.7} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={BackSide}>
          <Color color={mode === 'black' ? "#444" : '#e0dede'} alpha={1} mode="normal" />
          <Depth colorA="#777" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  )
}


export default Lights