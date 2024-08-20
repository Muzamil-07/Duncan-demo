import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import { divideVh } from '../../lib/utils'
import { useAppSelector } from '../../lib/store/hooks'
import { selectSceneHeight } from '../../lib/store/features/general/generalSlice'

const PlaceHolder = () => {
  const sceneHeight = useAppSelector(selectSceneHeight)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // Fix the stack position
        height: sceneHeight,
        width: '100vw' // Ensure the Box takes the full width of the viewport
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <Box sx={{ paddingTop: '25.5rem', paddingLeft: '20rem' }}>
            <Stack>
              <img
                src='/assets/images/Select Box Style.webp'
                style={{ width: '150px' }}
              />
              <img src='/assets/images/Frame.webp' style={{ width: '150px' }} />
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={8} pl={3}>
          <Box sx={{ paddingTop: '3rem', paddingLeft: '5rem' }}>
            <img src='/assets/images/Frame 1000006265.webp' />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PlaceHolder
