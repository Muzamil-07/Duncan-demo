/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'

import { useThree, useFrame } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'
import { preloadMaterialTextures, preloadPrintTextures } from '../../lib/utils'

export function TuckendSkeleton (props) {
  // useEffect(() => {
  //   preloadTextures()
  // }, [])
  const group = React.useRef()
  const { scene, animations } = useGLTF('/assets/models/tuckend/tuckend.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------')
      preloadMaterialTextures()
      preloadPrintTextures()
      // preloadTextures()
    }, 0)
    console.log('DONE----------------------')
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature' position={[0, -0.01, 0]} scale={0.073}>
          <primitive object={nodes.main} />
          <primitive object={nodes.neutral_bone} />
          <group name='Mesh_0004'>
            <skinnedMesh
              name='outside'
              castShadow
              geometry={nodes.Mesh_0004_1.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0004_1.skeleton}
            ></skinnedMesh>
            <skinnedMesh
              castShadow
              name='inside'
              geometry={nodes.Mesh_0004_2.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0004_2.skeleton}
            ></skinnedMesh>
            <skinnedMesh
              castShadow
              name='side'
              geometry={nodes.Mesh_0004_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0004_3.skeleton}
            ></skinnedMesh>
            <skinnedMesh
              castShadow
              name='gold_foil'
              geometry={nodes.Mesh_0004_4.geometry}
              material={materials.finishing_gold_foil}
              material-transparent={true}
              material-opacity={0}
              skeleton={nodes.Mesh_0004_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name='spot_gloss'
              geometry={nodes.Mesh_0004_5.geometry}
              material={materials.finishing_spot_gloss}
              material-transparent={true}
              material-opacity={0}
              skeleton={nodes.Mesh_0004_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/tuckend/tuckend.glb')
