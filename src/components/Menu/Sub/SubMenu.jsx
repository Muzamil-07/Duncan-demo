/* eslint-disable react/prop-types */
import {
  Box,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
  Zoom
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle' // Make sure to import the icon
import { toCamelCase } from '../../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../../lib/store/hooks'
import {
  selectBoxStyle,
  setBoxMaterial
} from '../../../lib/store/features/box/boxSlice'
import _ from 'lodash'

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#17242B'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#17242B'
  }
}))

const ToolTipContent = ({ option }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: '14px' }}>
        <span style={{ fontWeight: 'bold' }}>
          {option.name.replaceAll('_', '-')}
        </span>{' '}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo impedit
        quos nemo sed nobis officia aliquid voluptas at, in tempore!
      </Typography>
    </Box>
  )
}
const SubMenu = ({
  options,
  handleSelector,
  selectedValue,
  multiselect,
  styled
}) => {
  const [zoomLevel, setZoomLevel] = useState()

  const dispatch = useAppDispatch()
  const boxStyle = useAppSelector(selectBoxStyle)
  const calculateZoom = () => {
    const zoom = (window.outerWidth / window.innerWidth) * 100
    setZoomLevel(zoom)
  }

  useEffect(() => {
    // Calculate zoom level on mount
    calculateZoom()

    // Recalculate zoom level when window is resized
    window.addEventListener('resize', calculateZoom)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', calculateZoom)
    }
  }, [])

  if (!multiselect)
    return (
      <>
        {options.map((option, index) => (
          <Stack key={index}>
            <Box
              key={index}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: selectedValue === option.name ? '#ECFDF3' : 'none',
                borderRadius: '50%',
                border:
                  selectedValue === option.name ? '1px solid #3980AB' : 'none',
                boxShadow:
                  selectedValue === option.name
                    ? '0 0 2px rgba(0, 0, 0, 0.5)'
                    : 'none',
                padding: selectedValue === option.name ? '5px' : '0',
                cursor: 'pointer' // Add cursor to indicate it's clickable
              }}
              onClick={() => {
                handleSelector(option.name)
                if (styled && boxStyle === 'none')
                  dispatch(setBoxMaterial('coated-white'))
              }}
            >
              <CustomTooltip title={<ToolTipContent option={option} />}>
                <Box
                  component='img'
                  src={option.image}
                  sx={{
                    width: zoomLevel > 90 ? '70px' : '100px',
                    height: zoomLevel > 90 ? '70px' : '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    transition: 'all 0.7s',
                    '&:hover': {
                      transform: 'scale(1.2)' // Scale the image on hover
                    }
                  }}
                />
              </CustomTooltip>

              {selectedValue === option.name && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    top: '-1px',
                    right: '1px',
                    color: 'green',
                    borderRadius: '50%'
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                color: '#3980AB',
                textAlign: 'center',
                marginTop: '5px'
              }}
            >
              {_.capitalize(option.name.replaceAll('-', ' '))}
            </Typography>
          </Stack>
        ))}
      </>
    )
  else
    return (
      <>
        {options.map((option, index) => (
          <Stack key={index}>
            <Box
              key={index}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: selectedValue[toCamelCase(option.name)]
                  ? '#ECFDF3'
                  : 'none',
                borderRadius: '50%',
                border: selectedValue[toCamelCase(option.name)]
                  ? '1px solid #3980AB'
                  : 'none',
                boxShadow: selectedValue[toCamelCase(option.name)]
                  ? '0 0 2px rgba(0, 0, 0, 0.5)'
                  : 'none',
                padding: selectedValue[toCamelCase(option.name)] ? '5px' : '0',
                cursor: 'pointer' // Add cursor to indicate it's clickable
              }}
              onClick={() => handleSelector(option.name)}
            >
              <Box
                component='img'
                src={option.image}
                sx={{
                  width: zoomLevel >= 90 ? '70px' : '100px',
                  height: zoomLevel >= 90 ? '70px' : '100px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  transition: 'all 0.7s',
                  '&:hover': {
                    transform: 'scale(1.2)' // Scale the image on hover
                  }
                }}
              />
              {selectedValue[toCamelCase(option.name)] && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    top: '-1px',
                    right: '1px',
                    color: 'green',
                    borderRadius: '50%'
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                color: '#3980AB',
                textAlign: 'center',
                marginTop: '5px'
              }}
            >
              {_.capitalize(option.name.replaceAll('-', ' '))}
            </Typography>
          </Stack>
        ))}
      </>
    )
}

export default SubMenu