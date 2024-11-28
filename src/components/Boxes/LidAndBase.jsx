/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { LoopOnce, RepeatWrapping, SRGBColorSpace } from 'three';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxCoating,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxState,
} from '../../lib/store/features/box/boxSlice';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import {
  preloadMaterialTextures,
  preloadPrintTextures,
  preloadSingleModelTextures,
  preloadTextures,
  preloadThisTextureForAllModels,
} from '../../lib/utils';

export function LidAndBase(props) {
  const { scene, animations } = useGLTF('/assets/models/lid-and-base/lid-and-base-1.glb');
  const group = useRef();
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
      actions['Mesh_0.001Action'].setLoop(LoopOnce);
      actions['Mesh_0.001Action'].clampWhenFinished = true;
      actions['Mesh_0.001Action'].timeScale = 1;
      actions['Mesh_0.001Action'].play();
    } else if (boxState === 'close') {
      actions['Mesh_0.001Action'].setLoop(LoopOnce);
      actions['Mesh_0.001Action'].clampWhenFinished = true;
      actions['Mesh_0.001Action'].timeScale = -1;
      actions['Mesh_0.001Action'].paused = false;

    }
  }, [boxState, actions['Mesh_0.001Action']]);


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
  let outsideLidTexturePath = ''
  let insideBaseTexturePath = '';
  let insideLidTexturePath = '';
  let sideTexturePath = '';

  if (print !== 'none') {
    outsideBaseTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/outside_${print}.webp`;

    outsideLidTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/lid_outside_${print}.webp`;

  } else {
    outsideBaseTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/base.webp`;

      outsideLidTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/base.webp`;
  }

  console.log('OUTSIDE BASE TEXT PATH:', outsideBaseTexturePath);
  const outsideBaseTexture = useTexture(outsideBaseTexturePath);
  outsideBaseTexture.flipY = false;
  outsideBaseTexture.colorSpace = SRGBColorSpace;

  console.log("outsideLidTexturePath",outsideLidTexturePath)

  const outsideLidTexture = useTexture(outsideLidTexturePath);
  outsideBaseTexture.flipY = false;
  outsideBaseTexture.colorSpace = SRGBColorSpace;

  if (print !== 'none' && printSurface === 'outside-inside') {
    insideBaseTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/inside_${print}.webp`;

    insideLidTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/lid_inside_${print}.webp`;
  } else {
    insideBaseTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/base.webp`;

    insideLidTexturePath = `/assets/models/lid-and-base/${material.includes('white')
      ? material.replaceAll('microflute-', 'coated-')
      : material.replaceAll('microflute-', '')
      }/base.webp`;
  }

  const insideBaseTexture = useTexture(insideBaseTexturePath);
  insideBaseTexture.flipY = false;
  insideBaseTexture.colorSpace = SRGBColorSpace;

  const insideLidTexture = useTexture(insideLidTexturePath);
  insideLidTexture.flipY = false;
  insideLidTexture.colorSpace = SRGBColorSpace;

  if (material.includes('microflute-')) {
    sideTexturePath = `/assets/models/lid-and-base/${material}/side.webp`;
  } else {
    sideTexturePath = `/assets/models/lid-and-base/${material}/base.webp`;
  }

  const sideBaseTexture = useTexture(sideTexturePath);
  sideBaseTexture.flipY = false;
  sideBaseTexture.colorSpace = SRGBColorSpace;
  sideBaseTexture.wrapS = RepeatWrapping;
  // sideBaseTexture.wrapT = RepeatWrapping

  let goldFoil_opacity = 0;
  let spotgloss_opacity = 0;
  let bumpMap = null;

  const embossingTexturePath = finishing.embossing
    ? '/assets/models/lid-and-base/textures/embossing_OUTSIDE.webp'
    : '/assets/models/lid-and-base/textures/base.webp';

  const coatingTexturePath = coating !== 'none'
    ? '/assets/models/lid-and-base/textures/outside_coating_gloss_OMR.webp'
    : '/assets/models/lid-and-base/textures/base.webp';

  const spotGlossNormalTexturePath = finishing.spotGloss
    ? '/assets/models/lid-and-base/textures/spotgloss_Normal.webp'
    : '/assets/models/lid-and-base/textures/base.webp';

  const embossingTexture = useTexture(embossingTexturePath);
  const coatingTexture = useTexture(coatingTexturePath);
  const spotGlossNormalTexture = useTexture(spotGlossNormalTexturePath);

  embossingTexture.flipY = false;
  coatingTexture.flipY = false;
  spotGlossNormalTexture.flipY = false;

  if (!finishing.none) {
    if (finishing.goldFoil) goldFoil_opacity = 1;
    if (finishing.spotGloss) spotgloss_opacity = 1;
    if (finishing.embossing) bumpMap = embossingTexture;
  }

  let clearCoat = 0;
  let clearCoatRoughness = 0;



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

  let roughnessMapOutsideTexturePath =
    '/assets/models/lid-and-base/textures/base.webp';
  let roughnessMapInsideTexturePath =
    '/assets/models/lid-and-base/textures/base.webp';
  let roughnessMapOutside = null;
  let roughnessMapInside = null;

  if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/lid-and-base/textures/cmyk_1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/lid-and-base/textures/cmyk_1spot_roughness_metflo_inside.webp';
  }
  if (print === '1spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/lid-and-base/textures/1spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/lid-and-base/textures/1spot_roughness_metflo_inside.webp';
  }
  if (print === '2spot_metflo') {
    roughnessMapOutsideTexturePath =
      '/assets/models/lid-and-base/textures/2spot_roughness_metflo_outside.webp';
    roughnessMapInsideTexturePath =
      '/assets/models/lid-and-base/textures/2spot_roughness_metflo_inside.webp';
  }

  roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
  roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
  roughnessMapOutside.flipY = false;
  roughnessMapInside.flipY = false;

  let metalnessVal = 0;
  if (material === 'uncoated-white') metalnessVal = 0.3;
  else if (material.includes('kraft')) metalnessVal = 0.2;

  // preload the applied textures and materials for all the models
  useEffect(() => {
    setTimeout(() => {
      preloadThisTextureForAllModels(outsideBaseTexturePath);
      preloadThisTextureForAllModels(insideBaseTexturePath);
      preloadThisTextureForAllModels(sideTexturePath);
      preloadThisTextureForAllModels(roughnessMapOutsideTexturePath);
      preloadThisTextureForAllModels(roughnessMapInsideTexturePath);
      preloadThisTextureForAllModels(embossingTexturePath);
      preloadThisTextureForAllModels(coatingTexturePath);
      preloadThisTextureForAllModels(spotGlossNormalTexturePath);
    }, 0);
  }, [
    outsideBaseTexture,
    insideBaseTexturePath,
    sideTexturePath,
    roughnessMapOutsideTexturePath,
    roughnessMapInsideTexturePath,
    coatingTexture,
    spotGlossNormalTexturePath
  ]);

  useEffect(() => {
    setTimeout(() => {
      console.log('SETTIMEOUT DONE----------------------');
      preloadMaterialTextures();
      preloadSingleModelTextures('lidAndBase');
      // preloadPrintTextures();
      // preloadTextures()
    }, 0);
    console.log('DONE----------------------');
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Mesh_0">
          <mesh
            name="base_outside"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0_1.geometry}
            material={materials.Material_color_base_outside}
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
          </mesh>
          <mesh
            name="base_inside"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0_2.geometry}
            material={materials.Material_color_base_inside}
          >
            <meshPhysicalMaterial
              map={insideBaseTexture}
              clearcoatMap={coatingTexture}
              clearcoat={clearCoat}
              clearcoatRoughness={clearCoatRoughness}
              roughnessMap={
                printSurface === 'outside-inside' ? roughnessMapInside : null
              }
              metalness={metalnessVal}
            />
          </mesh>
          <mesh
            name="side"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0_3.geometry}
            material={materials.Material_side}
          >
            <meshStandardMaterial map={sideBaseTexture} />

          </mesh>
        </group>
        <group name="Mesh_0001">
          <mesh
            name="lid_outside"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_1.geometry}
            material={materials.Material_color_lid_outside}
          >
            <meshPhysicalMaterial
              map={outsideLidTexture}
              bumpMap={bumpMap}
              bumpScale={15}
              clearcoatMap={coatingTexture}
              clearcoat={clearCoat}
              clearcoatRoughness={clearCoatRoughness}
              roughnessMap={roughnessMapOutside}
              metalness={metalnessVal}
            />
          </mesh>
          <mesh
            name="lid_inside"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_2.geometry}
            material={materials.Material_color_lid_inside}
          >
            <meshPhysicalMaterial
              map={insideLidTexture}
              clearcoatMap={coating !== 'none' ? coatingTexture : null}
              clearcoat={clearCoat}
              clearcoatRoughness={clearCoatRoughness}
              roughnessMap={
                printSurface === 'outside-inside' ? roughnessMapInside : null
              }
              metalness={metalnessVal}
            />
          </mesh>
          <mesh
            name="side"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_3.geometry}
            material={materials.Material_side}
          >
            <meshStandardMaterial map={sideBaseTexture} />
          </mesh>
          <mesh
            name="gold_foil"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_4.geometry}
            material={materials.finishing_gold_foil}
            material-opacity={goldFoil_opacity}
            material-transparent={true}
            material-metalness={0.6}
          />
          <mesh
            name="spot_gloss"
            castShadow
            // receiveShadow
            geometry={nodes.Mesh_0001_5.geometry}
            material={materials.finishing_spot_gloss}
            material-transparent={true}
            material-opacity={spotgloss_opacity}
          />
        </group>
      </group>
    </group>
  )
}
useGLTF.preload('/assets/models/lid-and-base/lid-and-base-1.glb')
