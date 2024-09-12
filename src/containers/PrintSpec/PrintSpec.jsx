import React from 'react'
import SubMenu from '../../components/Menu/Sub/SubMenu'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxPrint,
  setBoxPrint
} from '../../lib/store/features/box/boxSlice'
import { useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'
import { useThree } from '@react-three/fiber'
const PRINT_SPEC_OPTIONS = [
  {
    image: '/assets/texture/PrintSpec/Thumb/none.webp',
    name: 'none',
    displayName: 'none'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/black.webp',
    name: 'black',
    displayName: 'Black only'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk.webp',
    name: 'cmyk',
    displayName: 'CMYK'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk-1.webp',
    name: 'cmyk_1spot',
    displayName: 'CMYK + 1 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk-2.webp',
    name: 'cmyk_2spot',
    displayName: 'CMYK + 2 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk1spotmetflo.webp',
    name: 'cmyk_1spot_metflo',
    displayName: 'CMYK + 1 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk2spotmetflo.webp',
    name: 'cmyk_2spot_metflo',
    displayName: 'CMYK + 2 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/1spot.webp',
    name: '1spot',
    displayName: '1 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/2spot.webp',
    name: '2spot',
    displayName: '2 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/1spotmetflo.webp',
    name: '1spot_metflo',
    displayName: '1 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.webp',
    name: '2spot_metflo',
    displayName: '2 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/other.webp',
    name: 'other',
    displayName: 'other'
  }
]
const PrintSpec = () => {
  const printSpec = useAppSelector(selectBoxPrint)
  const dispatch = useAppDispatch()

  const handleSelectPrintSpec = value => {
    dispatch(setBoxPrint(value))
  }
  return (
    <SubMenu
      options={PRINT_SPEC_OPTIONS}
      handleSelector={handleSelectPrintSpec}
      selectedValue={printSpec}
    />
  )
}

export default PrintSpec
