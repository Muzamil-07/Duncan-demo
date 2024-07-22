import { Box, CircularProgress, Typography } from '@mui/material'
import { Html, useProgress } from '@react-three/drei'
import { useEffect } from 'react'

function CircularProgressWithLabel (props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        {...props}
        sx={{ color: '#3980AB' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant='caption' component='div' p={4} color='grey'>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}
const ModelLoader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()
  useEffect(() => {}, [active, progress])

  return (
    <Html
      as='div'
      style={{ width: '100%', backgroundColor: 'red' }}
      position={[0, 0, 0]}
    >
      <CircularProgressWithLabel value={progress} />
      {/* <CircularProgress /> */}
    </Html>
  )
}

export default ModelLoader
