import { Box, Grid, Stack } from '@mui/material'
import React from 'react'

const PlaceHolder = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Box sx={{ paddingTop: '19.5rem', paddingLeft: '9rem' }}>
          <Stack>
            <img
              src='/assets/images/Select Box Style.png'
              style={{ width: '150px' }}
            />
            <img src='/assets/images/Frame.png' style={{ width: '150px' }} />
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={8} pl={3}>
        <Box>
          <img src='/assets/images/Frame 1000006265.png' />
        </Box>
      </Grid>
    </Grid>
  )
}

export default PlaceHolder
