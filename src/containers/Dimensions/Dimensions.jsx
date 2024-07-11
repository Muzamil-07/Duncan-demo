import React, { useState } from 'react'
import {
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  InputAdornment,
  Typography
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxDimensions,
  setBoxDimensions
} from '../../lib/store/features/box/boxSlice'
import _ from 'lodash'

const Dimensions = () => {
  // const [unit, setUnit] = useState('cm')

  const dimensions = useAppSelector(selectBoxDimensions)
  const dispatch = useAppDispatch()

  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      // setUnit(newUnit)
      const obj = _.cloneDeep(dimensions)
      obj.unit = newUnit
      dispatch(setBoxDimensions(obj))
    }
  }
  const handleInputChange = e => {
    const { name, value } = e.target

    const obj = _.cloneDeep(dimensions)
    obj[name] = value
    dispatch(setBoxDimensions(obj))
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems='center'>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px'
          }}
          item
          xs={12}
        >
          <ToggleButtonGroup
            sx={{
              height: '10px',
              width: '10px',
              borderRadius: '20px'
            }}
            value={dimensions.unit}
            exclusive
            onChange={handleUnitChange}
            aria-label='unit'
          >
            <ToggleButton
              sx={{
                height: '30px',
                width: '50px',
                fontSize: '12px',
                paddingInline: '20px',
                borderRadius: '20px',
                textTransform: 'lowercase',
                '&:hover.Mui-selected': {
                  backgroundColor: '#3980AB',
                  color: 'white'
                },
                '&.Mui-selected': {
                  backgroundColor: '#3980AB',
                  color: 'white'
                }
              }}
              value='cm'
              aria-label='centimeters'
            >
              cm
            </ToggleButton>
            <ToggleButton
              sx={{
                height: '30px',
                width: '50px',
                fontSize: '12px',
                paddingInline: '20px',

                borderRadius: '20px ',
                textTransform: 'lowercase',
                '&.Mui-selected': {
                  backgroundColor: '#3980AB',
                  color: 'white'
                },
                '&:hover.Mui-selected': {
                  backgroundColor: '#3980AB',
                  color: 'white'
                }
              }}
              value='mm'
              aria-label='millimeters'
            >
              mm
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Typography fontSize={14} variant='body1' color='initial'>
            Width
          </Typography>

          <TextField
            type='number'
            name='width'
            value={dimensions.width}
            onChange={handleInputChange}
            InputProps={{
              sx: {
                height: '35px' // match the button height
              },

              endAdornment: (
                <InputAdornment position='end'>
                  {dimensions.unit}
                </InputAdornment>
              )
            }}
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Typography fontSize={14} variant='body1' color='initial'>
            Length
          </Typography>
          <TextField
            type='number'
            name='length'
            value={dimensions.length}
            onChange={handleInputChange}
            InputProps={{
              sx: {
                height: '35px' // match the button height
              },

              endAdornment: (
                <InputAdornment position='end'>
                  {dimensions.unit}
                </InputAdornment>
              )
            }}
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Typography fontSize={14} variant='body1' color='initial'>
            Height
          </Typography>
          <TextField
            type='number'
            name='height'
            value={dimensions.height}
            onChange={handleInputChange}
            InputProps={{
              sx: {
                height: '35px' // match the button height
              },

              endAdornment: (
                <InputAdornment position='end'>
                  {dimensions.unit}
                </InputAdornment>
              )
            }}
            variant='outlined'
            fullWidth
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dimensions
