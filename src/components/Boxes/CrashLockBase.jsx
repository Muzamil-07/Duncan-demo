import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxState,
} from '../../lib/store/features/box/boxSlice';
import { LoopOnce, RepeatWrapping, SRGBColorSpace } from 'three';
import { preloadMaterialTextures, preloadPrintTextures } from '../../lib/utils';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

export function CrashLockBase(props) {
  const group = useRef();

  const { scene, animations } = useGLTF(
    '/assets/models/crash-lock-base/crash-lock-base-old.glb'
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const print = useAppSelector(selectBoxPrint);
  const material = useAppSelector(selectBoxMaterial);
  const finishing = useAppSelector(selectBoxFinishing);
  const coating = useAppSelector(selectBoxCoating);
  const printSurface = useAppSelector(selectBoxPrintSurface);
  const boxState = useAppSelector(selectBoxState);

  let outsideBaseTexturePath = '';
  let insideBaseTexturePath = '';
  let sideTexturePath = '';

  if (print !== 'none') {
    outsideBaseTexturePath = `assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/outside_${print}.webp`;
  } else {
    outsideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }
  const outsideBaseTexture = useTexture(outsideBaseTexturePath);
  outsideBaseTexture.flipY = false;
  outsideBaseTexture.colorSpace = SRGBColorSpace;

  if (material.includes('microflute-')) {
    sideTexturePath = `/assets/models/crash-lock-base/${material}/side.webp`;
  } else {
    sideTexturePath = `/assets/models/crash-lock-base/${material}/base.webp`;
  }
  const sideBaseTexture = useTexture(sideTexturePath);
  sideBaseTexture.colorSpace = SRGBColorSpace;
  sideBaseTexture.flipY = false;
  sideBaseTexture.wrapS = RepeatWrapping;

  // Ref to track the previous coating and finishing values
  const previousCoatingRef = useRef(coating);
  const previousFinishingRef = useRef({ ...finishing });

  // ******** ANIMATION SCRIPT
  useEffect(() => {
    if (boxState === 'open') {
      actions.ArmatureAction.setLoop(LoopOnce);
      actions.ArmatureAction.clampWhenFinished = true;
      actions.ArmatureAction.timeScale = 1;
      actions.ArmatureAction.reset().play();
    } else if (boxState === 'close') {
      actions.ArmatureAction.setLoop(LoopOnce);
      actions.ArmatureAction.clampWhenFinished = true;
      actions.ArmatureAction.timeScale = -1;
      actions.ArmatureAction.paused = false;
    }
  }, [boxState, actions.ArmatureAction]);

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

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/inside_${print}.webp`;
  } else {
    insideBaseTexturePath = `/assets/models/crash-lock-base/${
      material.includes('white')
        ? material.replaceAll('microflute-', 'coated-')
        : material.replaceAll('microflute-', '')
    }/base.webp`;
  }

  const insideBaseTexture = useTexture(insideBaseTexturePath);

  insideBaseTexture.colorSpace = SRGBColorSpace;
  insideBaseTexture.flipY = false;

  let bumpMap = null;
  let goldFoil_opacity = 0;
  let spotgloss_opacity = 0;

  const embossingTexture = useTexture(
    '/assets/models/crash-lock-base/textures/embossing_OUTSIDE.webp'
  );
  embossingTexture.flipY = false;

  if (!finishing.none) {
    if (finishing.goldFoil) goldFoil_opacity = 1;
    if (finishing.spotGloss) spotgloss_opacity = 1;
    if (finishing.embossing) bumpMap = embossingTexture;
  }

  let clearCoat = 0;
  let clearCoatRoughness = 0;

  const coatingTexture = useTexture(
    '/assets/models/crash-lock-base/textures/outside_coating_gloss_OMR.webp'
  );

  coatingTexture.flipY = false;
  if (coating !== 'none') {
    if (coating === 'gloss') {
      clearCoat = 1;
      clearCoatRoughness = 0.15;
    } else if (coating === 'silk') {
      clearCoat = 0.8;
      clearCoatRoughness = 0.2;
    } else if (coating === 'matt') {
      clearCoat = 1;
      clearCoatRoughness = 0.4;
    }
  }

  let metalnessVal = 0;

  if (material === 'uncoated-white') metalnessVal = 0.3;
  else if (material.includes('kraft')) metalnessVal = 0.2;

  let roughnessMapOutsideTexturePath =
    '/assets/models/crash-lock-base/textures/base.webp';

  let roughnessMapInsideTexturePath =
    '/assets/models/crash-lock-base/textures/base.webp';

  let roughnessMapInside = '';
  let roughnessMapOutside = '';

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/crash-lock-base/textures/cmyk_1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/crash-lock-base/textures/cmyk_1spot_roughness_metflo_inside.webp';
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/crash-lock-base/textures/1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/crash-lock-base/textures/1spot_roughness_metflo_inside.webp';
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/crash-lock-base/textures/2spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/crash-lock-base/textures/2spot_roughness_metflo_inside.webp';
  }

  roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
  roughnessMapInside.flipY = true;
  roughnessMapOutside.wrapS = RepeatWrapping;
  roughnessMapOutside.flipY = false;

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
              castShadow
              name="outside"
              geometry={nodes.Mesh_0.geometry}
              // material={materials.Material_color_outside}
              skeleton={nodes.Mesh_0.skeleton}
            >
              <meshPhysicalMaterial
                map={outsideBaseTexture}
                bumpMap={bumpMap}
                bumpScale={15}
                clearcoatMap={coatingTexture}
                clearcoat={clearCoat}
                clearcoatRoughness={clearCoatRoughness}
                roughnessMap={roughnessMapOutside}
                metalness={metalnessVal}
              />
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name="inside"
              geometry={nodes.Mesh_0_1.geometry}
              // material={materials.Material_color_inside}
              skeleton={nodes.Mesh_0_1.skeleton}
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
              name="Mesh_0_2"
              castShadow
              geometry={nodes.Mesh_0_2.geometry}
              material={materials.Material_side}
              skeleton={nodes.Mesh_0_2.skeleton}
            >
              <meshPhysicalMaterial map={sideBaseTexture} />
            </skinnedMesh>
            <skinnedMesh
              castShadow
              name="gold_foil"
              geometry={nodes.Mesh_0_3.geometry}
              material={materials.finishing_gold_foil}
              material-transparent={true}
              material-opacity={goldFoil_opacity}
              skeleton={nodes.Mesh_0_3.skeleton}
            />
            <skinnedMesh
              name="spot_gloss"
              material-transparent={true}
              material-opacity={spotgloss_opacity}
              geometry={nodes.Mesh_0_4.geometry}
              material={materials.finishing_spot_gloss}
              skeleton={nodes.Mesh_0_4.skeleton}
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
