import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function BufferLidSkeleton(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '/assets/models/buffer-lid/buffer-lid.glb'
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.119}>
          <group name="Mesh_0">
            <skinnedMesh
              name="Mesh_0_1"
              geometry={nodes.Mesh_0_1.geometry}
              material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0_1.skeleton}
            />
            <skinnedMesh
              name="Mesh_0_2"
              geometry={nodes.Mesh_0_2.geometry}
              material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0_2.skeleton}
            />
            <skinnedMesh
              name="Mesh_0_3"
              geometry={nodes.Mesh_0_3.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0_3.skeleton}
            />
            <skinnedMesh
              name="Mesh_0_4"
              geometry={nodes.Mesh_0_4.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.Mesh_0_4.skeleton}
              material-transparent={true}
              material-opacity={0}
            />
            <skinnedMesh
              name="Mesh_0_5"
              geometry={nodes.Mesh_0_5.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.Mesh_0_5.skeleton}
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

useGLTF.preload('/assets/models/buffer-lid/buffer-lid.glb');
