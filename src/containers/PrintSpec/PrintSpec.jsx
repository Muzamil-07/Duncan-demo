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
    image: '/assets/texture/PrintSpec/Thumb/none.png',
    name: 'none',
    displayName: 'none'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/black.png',
    name: 'black',
    displayName: 'Black only'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk.png',
    name: 'cmyk',
    displayName: 'CMYK'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk-1.png',
    name: 'cmyk_1spot',
    displayName: 'CMYK + 1 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk-2.png',
    name: 'cmyk_2spot',
    displayName: 'CMYK + 2 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk1spotmetflo.png',
    name: 'cmyk_1spot_metflo',
    displayName: 'CMYK + 1 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk2spotmetflo.png',
    name: 'cmyk_2spot_metflo',
    displayName: 'CMYK + 2 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/1spot.png',
    name: '1spot',
    displayName: '1 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/2spot.png',
    name: '2spot',
    displayName: '2 Pantone (Std)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/1spotmetflo.png',
    name: '1spot_metflo',
    displayName: '1 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
    name: '2spot_metflo',
    displayName: '2 Pantone (Metallic / Fluorescent)'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/other.png',
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
