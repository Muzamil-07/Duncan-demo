import { Box, Button, Stack } from '@mui/material'
import React from 'react'

const Navbar = ({ mode }) => {
  return (
    <Box
      sx={{
        position: 'fixed', // Fix the navbar at the top
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'transparent', // Make the navbar transparent
        zIndex: 1000, // Ensure the navbar is above other content
        paddingRight: '1rem'
      }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ paddingInline: '1rem', paddingTop: '1rem' }}
      >
        <Box>
          <img
            src={
              mode === 'black'
                ? '/assets/images/white-logo.webp'
                : '/assets/images/black-logo.webp'
            }
          />
        </Box>
        <Box>
          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              sx={{
                borderRadius: '18px',
                height: '35px',
                padding: '20px',
                borderColor: 'white',
                color: 'white',
                textTransform: 'capitalize',
                '&:hover': {
                  borderColor: 'white'
                }
              }}
            >
              Save Project
            </Button>
            <Button
              variant='contained'
              sx={{
                borderRadius: '18px',
                height: '35px',
                padding: '20px',
                backgroundColor: '#3980AB',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#3980AB'
                }
              }}
            >
              Contact us
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Navbar
