import React from 'react'
import SubMenu from '../../components/Menu/Sub'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxMaterial,
  setBoxMaterial
} from '../../lib/store/features/box/boxSlice'

const MATERIAL_OPTIONS = [
  { image: '/assets/texture/material/kraft-brown.png', name: 'kraft-brown' },
  {
    image: '/assets/texture/material/microflute-kraft.png',
    name: 'microflute-kraft'
  },
  { image: '/assets/texture/material/coated-white.png', name: 'coated-white' },
  {
    image: '/assets/texture/material/uncoated-white.png',
    name: 'uncoated-white'
  },
  {
    image: '/assets/texture/material/microflute-white.png',
    name: 'microflute-white'
  },

  { image: '/assets/texture/material/other.png', name: 'other' }
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
    />
  )
}

export default Material
