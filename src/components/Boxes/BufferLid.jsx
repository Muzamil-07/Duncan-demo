import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxState,
} from '../../lib/store/features/box/boxSlice';
import { useAppSelector } from '../../lib/store/hooks';
import { RepeatWrapping, SRGBColorSpace } from 'three';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import { LoopOnce } from 'three';
import { preloadMaterialTextures, preloadPrintTextures } from '../../lib/utils';

export function BufferLid(props) {
  const group = useRef();

  const { scene, animations } = useGLTF(
    '/assets/models/buffer-lid/buffer-lid.glb'
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const boxState = useAppSelector(selectBoxState);
  const print = useAppSelector(selectBoxPrint);
  const material = useAppSelector(selectBoxMaterial);
  const printSurface = useAppSelector(selectBoxPrintSurface);
  const coating = useAppSelector(selectBoxCoating);
  const finishing = useAppSelector(selectBoxFinishing);

  // Ref to track the previous coating and finishing values
  const previousCoatingRef = useRef(coating);
  const previousFinishingRef = useRef({ ...finishing });

  // ******** ANIMATION SCRIPT

  useEffect(() => {
    if (boxState === 'open') {
      actions['ArmatureAction.001'].setLoop(LoopOnce);
      actions['ArmatureAction.001'].clampWhenFinished = true;
      actions['ArmatureAction.001'].timeScale = 1;
      actions['ArmatureAction.001'].reset().play();
    } else if (boxState === 'close') {
      actions['ArmatureAction.001'].setLoop(LoopOnce);
      actions['ArmatureAction.001'].clampWhenFinished = true;
      actions['ArmatureAction.001'].timeScale = -1;
      actions['ArmatureAction.001'].paused = false;
    }
  }, [boxState, actions['ArmatureAction.001']]);

  // ********** ROTATION SCRIPT
  useEffect(() => {
    const shouldRotate =
      (coating !== 'none' && previousCoatingRef.current !== coating) ||
      (finishing.goldFoil && !previousFinishingRef.current.goldFoil) ||
      (finishing.embossing && !previousFinishingRef.current.embossing) ||
      (finishing.spotGloss && !previousFinishingRef.current.spotGloss);

    if (shouldRotate) {
      // Rotate the model 360 degrees
      let rotationY = 0;
      const rotationSpeed = 0.05; // Adjust the speed of rotation as needed

      const animateRotation = () => {
        if (rotationY < Math.PI * 2) {
          rotationY += rotationSpeed;
          group.current.rotation.y = rotationY;
          requestAnimationFrame(animateRotation);
        } else {
          group.current.rotation.y = 0; // Reset the rotation
        }
      };
      animateRotation();
    }

    previousCoatingRef.current = coating;
    previousFinishingRef.current = { ...finishing };
  }, [coating, finishing]);

  // ********** CONFIGURATOR SCRIPT
  let outsideBaseTexturePath = '';
  let insideBaseTexturePath = '';
  let sideTexturePath = '';

  if (print !== 'none') {
    outsideBaseTexturePath = `/assets/models/buffer-lid/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/outside_${print}.webp`;
  } else {
    outsideBaseTexturePath = `/assets/models/buffer-lid/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  console.log('OUTSIDE BASE TEXT PATH:', outsideBaseTexturePath);
  const outsideBaseTexture = useTexture(outsideBaseTexturePath);
  outsideBaseTexture.flipY = false;
  outsideBaseTexture.colorSpace = SRGBColorSpace;
  outsideBaseTexture.wrapT = RepeatWrapping;
  outsideBaseTexture.wrapS = RepeatWrapping;

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideBaseTexturePath = `/assets/models/buffer-lid/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/inside_${print}.webp`;
  } else {
    insideBaseTexturePath = `/assets/models/buffer-lid/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  const insideBaseTexture = useTexture(insideBaseTexturePath);
  insideBaseTexture.flipY = false;
  insideBaseTexture.colorSpace = SRGBColorSpace;
  insideBaseTexture.wrapT = RepeatWrapping;
  insideBaseTexture.wrapS = RepeatWrapping;

  if (material.includes('microflute-')) {
    sideTexturePath = `/assets/models/buffer-lid/${material}/side.webp`;
  } else {
    sideTexturePath = `/assets/models/buffer-lid/${material}/base.webp`;
  }

  const sideBaseTexture = useTexture(sideTexturePath);
  sideBaseTexture.flipY = false;
  sideBaseTexture.colorSpace = SRGBColorSpace;
  sideBaseTexture.wrapS = RepeatWrapping;
  // sideBaseTexture.wrapT = RepeatWrapping

  let roughnessMapOutsideTexturePath =
    '/assets/models/buffer-lid/textures/base.webp';
  let roughnessMapInsideTexturePath =
    '/assets/models/buffer-lid/textures/base.webp';

  let roughnessMapOutside = null;
  let roughnessMapInside = null;

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/buffer-lid/textures/cmyk_1spot_roughness_outside.webp';
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/buffer-lid/textures/1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/buffer-lid/textures/1spot_roughness_metflo_inside.webp';
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/buffer-lid/textures/2spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/buffer-lid/textures/2spot_roughness_metflo_inside.webp';
  }
  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
  roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
  roughnessMapOutside.flipY = false;
  roughnessMapInside.flipY = false;

  let clearCoat = 0;
  let clearCoatRoughness = 0;

  const coatingTexture = useTexture(
    '/assets/models/buffer-lid/textures/outside_coating_gloss_OMR.webp'
  );

  if (coating !== 'none') {
    if (coating === 'gloss') {
      clearCoat = 1;
      clearCoatRoughness = 0.15;
    }
    if (coating === 'silk') {
      clearCoat = 0.8;
      clearCoatRoughness = 0.2;
    }
    if (coating === 'matt') {
      clearCoat = 1;
      clearCoatRoughness = 0.4;
    }
  }

  const embossingTexture = useTexture(
    '/assets/models/buffer-lid/textures/embossing_OUTSIDE.webp'
  );

  embossingTexture.flipY = false;
  embossingTexture.wrapS = RepeatWrapping;
  embossingTexture.wrapT = RepeatWrapping;

  let goldFoil_opacity = 0;
  let spotGloss_opacity = 0;
  let bumpMap = null;

  if (!finishing.none) {
    if (finishing.goldFoil) goldFoil_opacity = 1;
    if (finishing.spotGloss) spotgloss_opacity = 1;
    if (finishing.embossing) bumpMap = embossingTexture;
  }

  let metalnessVal = 0;
  if (material === 'uncoated-white') metalnessVal = 0.3;
  else if (material.includes('kraft')) metalnessVal = 0.2;

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
        <group name="Armature" scale={0.119}>
          <group name="Mesh_0">
            <skinnedMesh
              name="outside"
              geometry={nodes.Mesh_0_1.geometry}
              //   material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0_1.skeleton}
            >
              <meshPhysicalMaterial
                map={outsideBaseTexture}
                bumpMap={bumpMap}
                bumpScale={15}
                roughnessMap={roughnessMapOutside}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                metalness={metalnessVal}
              />
            </skinnedMesh>
            <skinnedMesh
              name="inside"
              geometry={nodes.Mesh_0_2.geometry}
              //   material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0_2.skeleton}
            >
              <meshPhysicalMaterial
                map={insideBaseTexture}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                metalness={metalnessVal}
                roughnessMap={
                  printSurface === 'outside-inside' ? roughnessMapInside : null
                }
              />
            </skinnedMesh>
            <skinnedMesh
              name="side"
              geometry={nodes.Mesh_0_3.geometry}
              // material={materials.Material_side}
              skeleton={nodes.Mesh_0_3.skeleton}
            >
              <meshStandardMaterial map={sideBaseTexture} />
            </skinnedMesh>
            <skinnedMesh
              name="Mesh_0_4"
              geometry={nodes.Mesh_0_4.geometry}
              material={materials.finishing_gold_foil}
              skeleton={nodes.Mesh_0_4.skeleton}
              material-transparent={true}
              material-opacity={goldFoil_opacity}
            />
            <skinnedMesh
              name="Mesh_0_5"
              geometry={nodes.Mesh_0_5.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.Mesh_0_5.skeleton}
              material-transparent={true}
              material-opacity={spotGloss_opacity}
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
