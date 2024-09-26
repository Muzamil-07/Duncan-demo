import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

import { preloadMaterialTextures, preloadPrintTextures } from '../../lib/utils';

export function CrashLockBaseSkeleton(props) {
  // useEffect(() => {
  //   preloadTextures()
  // }, [])
  const group = React.useRef();
  const { scene, animations } = useGLTF(
    '/assets/models/crash-lock-base/crash-lock-base-old.glb'
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, -0.08, 0]} scale={0.124}>
          <group name="box">
            <skinnedMesh
              name="Mesh_0"
              geometry={nodes.Mesh_0.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0.skeleton}
            />
            <skinnedMesh
              name="Mesh_0_1"
              geometry={nodes.Mesh_0_1.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0_1.skeleton}
            />
            <skinnedMesh
              name="Mesh_0_2"
              geometry={nodes.Mesh_0_2.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0_2.skeleton}
            />
            <skinnedMesh
              name="Mesh_0_3"
              geometry={nodes.Mesh_0_3.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.Mesh_0_3.skeleton}
              material-transparent={true}
              material-opacity={0}
            />
            <skinnedMesh
              name="Mesh_0_4"
              geometry={nodes.Mesh_0_4.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.Mesh_0_4.skeleton}
              material-transparent={true}
              material-opacity={0}
            />
          </group>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/crash-lock-base/crash-lock-base-old.glb');
