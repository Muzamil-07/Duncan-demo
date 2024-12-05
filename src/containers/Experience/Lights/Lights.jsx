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
import { useControls } from 'leva'

const Lights = () => {
  const dirLight1 = useRef()
  const dirLight2 = useRef()
  const dirLight3 = useRef()
  const dirLight4 = useRef()
  const dirLight5 = useRef()
  const dirLight6 = useRef()
  const dirLight7 = useRef()

  // const pointLight1 = useRef()

  useHelper(dirLight1, DirectionalLightHelper, 1, "red")
  useHelper(dirLight2, DirectionalLightHelper, 1, "green")
  useHelper(dirLight3, DirectionalLightHelper, 1, "blue")
  useHelper(dirLight4, DirectionalLightHelper, 1, "purple")
  useHelper(dirLight5, DirectionalLightHelper, 1, "pink")
  useHelper(dirLight6, DirectionalLightHelper, 1, "cyan")
  useHelper(dirLight7, DirectionalLightHelper, 1, "orange")

  // useHelper(pointLight1, PointLightHelper, 1)

  useEffect(() => {
    // const axesHelper = new AxesHelper(5)
    // const gridHelper = new GridHelper(10, 10)
    // dirLight1.current.parent.add(axesHelper)
    // dirLight1.current.parent.add(gridHelper)
  }, [])


 // Adding Leva controls for each directional light
 const light1Controls = useControls('Light 1(red)', {
  position: { value: [2, 0, 4], step: 0.1 },
  intensity: { value: 0.7, min: 0, max:  7, step: 0.1 },
});

const light2Controls = useControls('Light 2(green)', {
  position: { value: [-2, 0, -4], step: 0.1 },
  intensity: { value: 1, min: 0, max:  7, step: 0.1 },
});

const light3Controls = useControls('Light 3(blue)', {
  position: { value: [0, 5, 0], step: 0.1 },
  intensity: { value: 0.2, min: 0, max:  7, step: 0.1 },
});

const light4Controls = useControls('Light 4(purple)', {
  position: { value: [0, -3, 0], step: 0.1 },
  intensity: { value: 1.6, min: 0, max:  7, step: 0.1 },
});

const light5Controls = useControls('Light 5(pink)', {
  position: { value: [4, 1, -0.5], step: 0.1 },
  intensity: { value: 1, min: 0, max:  7, step: 0.1 },
});

const light6Controls = useControls('Light 6(cyan)', {
  position: { value: [-4, 1, 0], step: 0.1 },
  intensity: { value: 1, min: 0, max:  7, step: 0.1 },
});

const light7Controls = useControls('Light 7(orange)', {
  position: { value: [0, -1, 4], step: 0.1 },
  intensity: { value: 0.7, min: 0, max:  7, step: 0.1 },
});

  return (
    <>
     {/* FRONT */}
     <directionalLight
        castShadow
        ref={dirLight1}
        position={light1Controls.position}
        intensity={light1Controls.intensity}
      />
      <directionalLight
        castShadow
        ref={dirLight7}
        position={light7Controls.position}
        intensity={light7Controls.intensity}
      />
      {/* BACK */}
      <directionalLight
        ref={dirLight2}
        position={light2Controls.position}
        intensity={light2Controls.intensity}
      />
      {/* TOP */}
      <directionalLight
        castShadow
        ref={dirLight3}
        position={light3Controls.position}
        intensity={light3Controls.intensity}
      />
      {/* BOTTOM */}
      <directionalLight
        ref={dirLight4}
        position={light4Controls.position}
        intensity={light4Controls.intensity}
      />
      {/* RIGHT */}
      <directionalLight
        ref={dirLight5}
        position={light5Controls.position}
        intensity={light5Controls.intensity}
      />
      {/* LEFT */}
      <directionalLight
        ref={dirLight6}
        position={light6Controls.position}
        intensity={light6Controls.intensity}
      />
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