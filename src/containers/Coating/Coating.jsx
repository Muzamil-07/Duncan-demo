import React from 'react'
import SubMenu from '../../components/Menu/Sub/SubMenu'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxCoating,
  setBoxCoating,
  setBoxPrintSurface
} from '../../lib/store/features/box/boxSlice'
const COATING_OPTIONS = [
  { image: '/assets/texture/Coating/none.png', name: 'none' },
  { image: '/assets/texture/Coating/gloss.png', name: 'gloss' },
  { image: '/assets/texture/Coating/silk.png', name: 'silk' },
  { image: '/assets/texture/Coating/matt.png', name: 'matt' },
  { image: '/assets/texture/Coating/other.png', name: 'other' }
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
