import React from 'react'
import SubMenu from '../../components/Menu/Sub/SubMenu'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxCoating,
  setBoxCoating,
  setBoxPrintSurface
} from '../../lib/store/features/box/boxSlice'
const COATING_OPTIONS = [
  { image: '/assets/texture/Coating/none.webp', name: 'none' },
  { image: '/assets/texture/Coating/gloss.webp', name: 'gloss' },
  { image: '/assets/texture/Coating/silk.webp', name: 'silk' },
  { image: '/assets/texture/Coating/matt.webp', name: 'matt' },
  { image: '/assets/texture/Coating/other.webp', name: 'other' }
]

const Coating = () => {
  const coating = useAppSelector(selectBoxCoating)
  const dispatch = useAppDispatch()
  const handleSelectCoating = value => {
    dispatch(setBoxCoating(value))
  }
  return (
    <SubMenu
      options={COATING_OPTIONS}
      handleSelector={handleSelectCoating}
      selectedValue={coating}
    />
  )
}

export default Coating
