import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { preloadMaterialTextures, preloadSingleModelTextures } from '../../lib/utils';

export function HeaderCardSkeleton(props) {
  const { nodes, materials } = useGLTF('/assets/models/header-card/header-card.glb')

  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadSingleModelTextures('headerCard');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={materials.Material_color_outside}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Mesh_0_1.geometry}
        material={materials.Material_color_inside}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Mesh_0_2.geometry}
        material={materials.Material_side}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Mesh_0_3.geometry}
        material={materials.finishing_gold_foil}
        material-transparent={true}
        material-opacity={0}
      />
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Mesh_0_4.geometry}
        material={materials.finishing_spot_gloss}
        material-transparent={true}
        material-opacity={0}
      />
    </group>
  )
}

useGLTF.preload('/assets/models/header-card/header-card')
