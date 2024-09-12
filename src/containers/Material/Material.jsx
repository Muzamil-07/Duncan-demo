import React from 'react'
import SubMenu from '../../components/Menu/Sub'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxMaterial,
  setBoxMaterial
} from '../../lib/store/features/box/boxSlice'

const MATERIAL_OPTIONS = [
  { image: '/assets/texture/material/coated-white.webp', name: 'coated-white' },
  {
    image: '/assets/texture/material/uncoated-white.webp',
    name: 'uncoated-white'
  },
  {
    image: '/assets/texture/material/microflute-white.webp',
    name: 'microflute-white'
  },
  { image: '/assets/texture/material/kraft-brown.webp', name: 'kraft' },
  {
    image: '/assets/texture/material/microflute-kraft.webp',
    name: 'microflute-kraft'
  },
  { image: '/assets/texture/material/other.webp', name: 'other' }
]
const Material = () => {
  const material = useAppSelector(selectBoxMaterial)
  const dispatch = useAppDispatch()
  const handleSelectMaterial = value => {
    dispatch(setBoxMaterial(value))
  }
  return (
    <SubMenu
      options={MATERIAL_OPTIONS}
      handleSelector={handleSelectMaterial}
      selectedValue={material}
      material={true}
    />
  )
}

export default Material
