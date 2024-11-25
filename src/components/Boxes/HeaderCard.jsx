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
import { useThree, useFrame } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import {
  preloadMaterialTextures,
  preloadPrintTextures,
  preloadTextures,
} from '../../lib/utils';

export function HeaderCard(props) {
    const { scene, animations } = useGLTF('/assets/models/header-card/header-card.glb');
    const group = React.useRef();
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);

    const print = useAppSelector(selectBoxPrint);
    const material = useAppSelector(selectBoxMaterial);
    const printSurface = useAppSelector(selectBoxPrintSurface);
    const coating = useAppSelector(selectBoxCoating);
    const finishing = useAppSelector(selectBoxFinishing);


    // ********** CONFIGURATOR SCRIPT
    let outsideBaseTexturePath = '';
    let insideBaseTexturePath = '';
    let sideTexturePath = '';

    if (print !== 'none') {
        outsideBaseTexturePath = `/assets/models/header-card/${material.includes('white')
            ? material.replaceAll('microflute-', 'coated-')
            : material.replaceAll('microflute-', '')
            }/outside_${print}.webp`;
    } else {
        outsideBaseTexturePath = `/assets/models/header-card/${material.includes('white')
            ? material.replaceAll('microflute-', 'coated-')
            : material.replaceAll('microflute-', '')
            }/base.webp`;
    }

    console.log('OUTSIDE BASE TEXT PATH:', outsideBaseTexturePath);
    const outsideBaseTexture = useTexture(outsideBaseTexturePath);
    outsideBaseTexture.flipY = false;
    outsideBaseTexture.colorSpace = SRGBColorSpace;

    if (print !== 'none' && printSurface === 'outside-inside') {
        insideBaseTexturePath = `/assets/models/header-card/${material.includes('white')
            ? material.replaceAll('microflute-', 'coated-')
            : material.replaceAll('microflute-', '')
            }/inside_${print}.webp`;
    } else {
        insideBaseTexturePath = `/assets/models/header-card/${material.includes('white')
            ? material.replaceAll('microflute-', 'coated-')
            : material.replaceAll('microflute-', '')
            }/base.webp`;
    }

    const insideBaseTexture = useTexture(insideBaseTexturePath);
    insideBaseTexture.flipY = false;
    insideBaseTexture.colorSpace = SRGBColorSpace;

    if (material.includes('microflute-')) {
        sideTexturePath = `/assets/models/header-card/${material}/side.webp`;
    } else {
        sideTexturePath = `/assets/models/header-card/${material}/base.webp`;
    }

    const sideBaseTexture = useTexture(sideTexturePath);
    sideBaseTexture.flipY = false;
    sideBaseTexture.colorSpace = SRGBColorSpace;
    sideBaseTexture.wrapS = RepeatWrapping;
    // sideBaseTexture.wrapT = RepeatWrapping

    let goldFoil_opacity = 0;
    let spotgloss_opacity = 0;
    let bumpMap = null;
    const embossingTexture = useTexture(
        '/assets/models/header-card/textures/embossing_OUTSIDE.webp'
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
        '/assets/models/header-card/textures/outside_coating_gloss_OMR.webp'
    );
    coatingTexture.flipY = false;

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
        '/assets/models/header-card/textures/base.webp';
    let roughnessMapInsideTexturePath =
        '/assets/models/header-card/textures/base.webp';
    let roughnessMapOutside = null;
    let roughnessMapInside = null;

    console.log("print",print)

    if (print === 'cmyk_1spot_metflo' || print === 'cmyk_2spot_metflo') {
        roughnessMapOutsideTexturePath =
            '/assets/models/header-card/textures/base.webp';
        roughnessMapInsideTexturePath =
            '/assets/models/header-card/textures/cmyk_1spot_roughness_metflo_inside.webp';
    }
    if (print === '1spot_metflo') {
        roughnessMapOutsideTexturePath =
            '/assets/models/header-card/textures/1spot_roughness_metflo_outside.webp';
        roughnessMapInsideTexturePath =
            '/assets/models/header-card/textures/1spot_roughness_metflo_inside.webp';
    }
    if (print === '2spot_metflo') {
        roughnessMapOutsideTexturePath =
            '/assets/models/header-card/textures/2spot_roughness_metflo_outside.webp';
        roughnessMapInsideTexturePath =
            '/assets/models/header-card/textures/2spot_roughness_metflo_inside.webp';
    }

    roughnessMapOutside = useTexture(roughnessMapOutsideTexturePath);
    roughnessMapInside = useTexture(roughnessMapInsideTexturePath);
    roughnessMapOutside.flipY = false;
    roughnessMapInside.flipY = false;

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
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0.geometry}
            // material={materials.Material_color_outside}
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
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0_1.geometry}
            // material={materials.Material_color_inside}
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
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0_2.geometry}
                material={materials.Material_side}
            >
                <meshStandardMaterial map={sideBaseTexture} />

            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0_3.geometry}
                material={materials.finishing_gold_foil}
                material-transparent={true}
                material-opacity={goldFoil_opacity}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_0_4.geometry}
                material={materials.finishing_spot_gloss}
                material-transparent={true}
                material-opacity={spotgloss_opacity}
            />
        </group>
    )
}