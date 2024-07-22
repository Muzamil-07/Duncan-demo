import React, { useState } from 'react'
import { Box, Grid, Typography, IconButton, Button, Stack } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Dimensions from '../../../containers/Dimensions'
import Quantity from '../../../containers/Quantity'
import SubMenu from '../Sub/SubMenu'
import Style from '../../../containers/Style'
import Material from '../../../containers/Material'
import PrintSpec from '../../../containers/PrintSpec'
import PrintSurface from '../../../containers/PrintSurface'
import Coating from '../../../containers/Coating'
import Finishing from '../../../containers/Finishing'
import { useAppDispatch, useAppSelector } from '../../../lib/store/hooks'
import { setSceneHeight } from '../../../lib/store/features/general/generalSlice'
import { selectBoxAttributes } from '../../../lib/store/features/box/boxSlice'
import _ from 'lodash'

const steps = {
  style: {
    name: 'Style',
    page: <Style />,
    key: 'style',
    defaultVal: 'none'
  },
  dimensions: {
    name: 'Dimension',
    page: <Dimensions />,
    key: 'dimensions',
    defaultVal: {
      length: '',
      width: '',
      height: '',
      unit: 'mm'
    }
  },
  material: {
    name: 'Material',
    page: <Material />,
    key: 'material',
    defaultVal: 'none'
  },
  printSpec: {
    name: 'Print Spec',
    page: <PrintSpec />,
    key: 'print',
    defaultVal: 'none'
  },
  printSurface: {
    name: 'Print Surface',
    page: <PrintSurface />,
    key: 'printSurface',
    defaultVal: 'none'
  },
  coating: {
    name: 'Coating',
    page: <Coating />,
    key: 'coating',
    defaultVal: 'none'
  },
  finishing: {
    name: 'Finishing',
    page: <Finishing />,
    key: 'finishing',
    defaultVal: {
      embossing: false,
      goldFoil: false,
      spotGloss: false,
      none: true
    }
  },
  quantity: {
    name: 'Quantity',
    page: <Quantity />,
    key: 'quantity',
    defaultVal: ''
  }
}

const MainMenu = () => {
  const stepKeys = Object.keys(steps)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(stepKeys[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(true)

  const boxAttributes = useAppSelector(selectBoxAttributes)

  const dispatch = useAppDispatch()
  const handleNext = () => {
    setActiveIndex(prev => {
      const nextIndex = prev < stepKeys.length - 1 ? prev + 1 : prev
      setActiveTab(stepKeys[nextIndex])
      return nextIndex
    })
  }

  const handlePrev = () => {
    setActiveIndex(prev => {
      const prevIndex = prev > 0 ? prev - 1 : prev
      setActiveTab(stepKeys[prevIndex])
      return prevIndex
    })
  }

  const handleMenuClick = (tab, index) => {
    setActiveIndex(index)
    setActiveTab(tab)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    if (!isDropdownOpen) dispatch(setSceneHeight('73vh'))
    else dispatch(setSceneHeight('90vh'))
  }

  console.log('BOX ATTRIBUTES: ', boxAttributes['coating'])

  return (
    <Stack
      direction='column'
      sx={{ marginTop: '1.5rem', paddingInline: '1rem' }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Button
            variant='outlined'
            onClick={toggleDropdown}
            sx={{
              marginRight: '40px',
              border: '1px solid #EAECF0',
              color: '#29435A',
              borderRadius: '50px',
              textTransform: 'none',
              paddingInline: '2rem',
              '&:hover': {
                backgroundColor: 'transparent',
                border: '1px solid'
              },
              '&:focus': {
                backgroundColor: 'transparent'
              }
            }}
            startIcon={isDropdownOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          >
            {isDropdownOpen ? 'Collapse' : 'Expand'}
          </Button>
        </Grid>

        <Grid item xs={10}>
          <Stack direction='row'>
            <IconButton onClick={handlePrev} disabled={activeIndex === 0}>
              <ArrowBackIosIcon />
            </IconButton>

            {stepKeys.map((val, index) => {
              console.log(
                '****************',
                steps[val].key,
                !_.isEqual(
                  boxAttributes[steps[val].key],
                  steps[val].defaultVal
                ),
                boxAttributes[steps[val].key],
                steps[val].defaultVal
              )
              return (
                // <Grid item xs={1} key={key}>
                <Box
                  key={val}
                  sx={{
                    display: 'flex',
                    paddingInline: '30px',
                    paddingBlock: '0px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '20px',
                    transition: 'all 0.5s',
                    bgcolor: activeTab === val ? '#3980AB' : 'none',
                    color: activeTab === val ? 'white' : 'grey'
                  }}
                  onClick={() => handleMenuClick(val, index)}
                >
                  <Typography sx={{ fontSize: '14px' }}>
                    {steps[val].name}
                  </Typography>
                  <CheckCircleIcon
                    sx={{
                      color:
                        activeTab === val
                          ? 'white'
                          : !_.isEqual(
                              boxAttributes[steps[val].key],
                              steps[val].defaultVal
                            )
                          ? 'green'
                          : '#CCCCCC',
                      height: '18px'
                    }}
                  />
                </Box>
              )
            })}
            <IconButton
              onClick={handleNext}
              disabled={activeIndex === stepKeys.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Stack
        direction='row'
        spacing={5}
        justifyContent='center'
        alignItems='center'
        sx={{
          marginTop: '2rem',
          marginBottom: '1.5rem'
          // width: '85%',
          // maxWidth: '85%',
          // overflowX: 'scroll'
          // marginInline: 'auto'
        }}
      >
        {steps[activeTab].page}
      </Stack>
    </Stack>
  )
}

export default MainMenu
