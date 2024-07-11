import React from 'react'
import { TextField, Button, Box, Typography, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppDispatch, useAppSelector } from '../../lib/store/hooks'
import {
  selectBoxQuantity,
  setBoxQuantity
} from '../../lib/store/features/box/boxSlice'

function Quantity () {
  const quantity = useAppSelector(selectBoxQuantity)
  const dispatch = useAppDispatch()
  const handleInputChange = e => {
    const { value } = e.target
    dispatch(setBoxQuantity(value))
  }

  return (
    <Stack direction='row'>
      <Box sx={{ marginRight: '40px' }}>
        <Typography fontSize={14} mb={1} variant='body1' color='initial'>
          Quantity
        </Typography>
        <TextField
          variant='outlined'
          type='number'
          value={quantity}
          onChange={handleInputChange}
          InputProps={{
            sx: {
              height: '35px' // match the button height
            }
          }}
          sx={{
            height: '20px',
            width: '400px'
          }}
        />
      </Box>
      <Button
        variant='contained'
        endIcon={<ArrowForwardIcon />}
        sx={{
          borderRadius: '18px',
          height: '35px',
          padding: '20px',
          marginTop: '25px',
          backgroundColor: '#3980AB'
        }}
      >
        Submit
      </Button>
    </Stack>
  )
}

export default Quantity
