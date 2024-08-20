import React from 'react'
import SubMenu from '../../components/Menu/Sub/SubMenu'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxPrintSurface,
  setBoxPrintSurface
} from '../../lib/store/features/box/boxSlice'
const PRINT_SURFACE_OPTIONS = [
  { image: '/assets/texture/PrintSurface/None.webp', name: 'none' },
  { image: '/assets/texture/PrintSurface/Outside.webp', name: 'outside' },
  {
    image: '/assets/texture/PrintSurface/Outside-Inside.webp',
    name: 'outside-inside'
  }
]
const PrintSurface = () => {
  const printSurface = useAppSelector(selectBoxPrintSurface)
  const dispatch = useAppDispatch()
  const handleSelectPrintSurface = value => {
    dispatch(setBoxPrintSurface(value))
  }
  return (
    <SubMenu
      options={PRINT_SURFACE_OPTIONS}
      handleSelector={handleSelectPrintSurface}
      selectedValue={printSurface}
    />
  )
}

export default PrintSurface
