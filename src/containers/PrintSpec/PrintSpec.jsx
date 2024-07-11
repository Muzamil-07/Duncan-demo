import React from 'react'
import SubMenu from '../../components/Menu/Sub/SubMenu'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxPrint,
  setBoxPrint
} from '../../lib/store/features/box/boxSlice'
const PRINT_SPEC_OPTIONS = [
  { image: '/assets/texture/PrintSpec/Thumb/none.png', name: 'none' },
  { image: '/assets/texture/PrintSpec/Thumb/black.png', name: 'black' },
  { image: '/assets/texture/PrintSpec/Thumb/cmyk.png', name: 'cmyk' },
  { image: '/assets/texture/PrintSpec/Thumb/cmyk-1.png', name: 'cmyk-1' },
  { image: '/assets/texture/PrintSpec/Thumb/cmyk-2.png', name: 'cmyk-2' },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk1spotmetflo.png',
    name: 'cmyk-1spot-metflo'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/cmyk2spotmetflo.png',
    name: 'cmyk-2spot-metflo'
  },
  { image: '/assets/texture/PrintSpec/Thumb/1spot.png', name: '1spot' },
  { image: '/assets/texture/PrintSpec/Thumb/2spot.png', name: '2spot' },
  {
    image: '/assets/texture/PrintSpec/Thumb/1spotmetflo.png',
    name: '1spot-metflo'
  },
  {
    image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
    name: '2spot-metflo'
  },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  //   {
  //     image: '/assets/texture/PrintSpec/Thumb/2spotmetflo.png',
  //     name: '2spot-metflo'
  //   },
  { image: '/assets/texture/PrintSpec/Thumb/other.png', name: 'other' }
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
