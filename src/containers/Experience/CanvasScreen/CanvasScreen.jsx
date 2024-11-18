/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, SoftShadows, useTexture } from '@react-three/drei';
// import ZoomEffect from '../ZoomEffect'
import * as THREE from 'three';
import Lights from '../Lights/Lights';
import ModelLoader from '../../../components/ModelLoader';
import { useAppSelector } from '../../../lib/store/hooks';
import {
  selectMode,
  selectSceneHeight,
} from '../../../lib/store/features/general/generalSlice';
import ZoomEffect from '../ZoomEffect';
import { subtractVh } from '../../../lib/utils';

const CanvasScreen = ({ children }) => {
  const mode = useAppSelector(selectMode);
  // const { enabled, ...config } = useControls({
  //   enabled: true,
  //   size: { value: 25, min: 0, max: 100 },
  //   focus: { value: 0, min: 0, max: 2 },
  //   samples: { value: 10, min: 1, max: 100, step: 1 }
  // })

  const orbitRef = useRef();
  const camera = useRef();

  const height = useAppSelector(selectSceneHeight);

  return (
    <div
      style={{
        width: '100%',
        height: subtractVh(height, 0),
        position: 'relative',
        transition: 'all 0.4s',
      }}
    >
      <Canvas
        style={{
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        camera={{
          fov: 35,
          near: 0.1,
          far: 200,
          position: [0, 2, 6],
          zoom: 1,
        }}
        ref={camera}
      >
        {/************ LIGHTS  ****************/}
        <Lights />
        {/************ ZOOM EFFECT  ****************/}
        <ZoomEffect />
        {/************ SHADOWS  ****************/}
        {/* <SoftShadows size={25} samples={100} focus={0.6} /> */}
        <SoftShadows size={0} samples={10} focus={0} />
        {/* PLANE */}
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
        >
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            color={mode === 'black' ? '#443E3E' : '#a5a4a4'}
          />
        </mesh>

        {/* {enabled && <SoftShadows {...config} />} */}

        {/* <Suspense fallback={<ModelLoader />}> */}
        {/************ CONTROLS  ****************/}
        {/* <Perf /> */}

        <OrbitControls
          ref={orbitRef}
          makeDefault
          // autoRotate
          // autoRotateSpeed={10}
          enableZoom={true}
          enablePan={true}
          //   maxPolarAngle={Math.PI / 2}
          //   minPolarAngle={Math.PI / 2}
        />

        {children}
        {/* <Model isMobile={isMobile} texture={texture} /> */}

        {/* <Preload all /> */}
        {/* </Suspense> */}
      </Canvas>
    </div>
  );
};

export default CanvasScreen;
