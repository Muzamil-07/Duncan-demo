import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function HeaderCardSkeleton(props) {
  const { nodes, materials } = useGLTF('/assets/models/header-card/header-card.glb')
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
