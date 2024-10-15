import { Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../lib/store/hooks';
import {
  selectBoxCoating,
  selectBoxDimensions,
  selectBoxFinishing,
  selectBoxMaterial,
  selectBoxPrint,
  selectBoxPrintSurface,
  selectBoxQuantity,
  selectBoxState,
  selectBoxStyle,
} from '../../lib/store/features/box/boxSlice';
import CrossIcon from '../Icons/CrossIcon';

const SideInfoCard = ({ setIsInfoOpen }) => {
  const print = useAppSelector(selectBoxPrint);
  const material = useAppSelector(selectBoxMaterial);
  const printSurface = useAppSelector(selectBoxPrintSurface);
  const coating = useAppSelector(selectBoxCoating);
  const style = useAppSelector(selectBoxStyle);
  const quantity = useAppSelector(selectBoxQuantity);
  const { height, length, width, unit } = useAppSelector(selectBoxDimensions);
  const { embossing, goldFoil, none, spotGloss } =
    useAppSelector(selectBoxFinishing);

  return (
    <div
      style={{
        width: '294px',
        height: '322px',
        backgroundColor: 'white',
        color: 'black',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          padding: '14px',
          backgroundColor: '#3980AB1C',
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          Typography
          fontWeight={700}
          fontSize={16}
          color="text.primary"
        >
          Your current selection
        </Typography>
        <IconButton onClick={() => setIsInfoOpen(false)}>
          <CrossIcon />
        </IconButton>
      </Stack>
      <Grid container spacing={2} sx={{ padding: '14px' }}>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Style
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {style}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Dimension
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {width || 0} x {height || 0} x {length || 0} {unit}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Material
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {material}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Print Spec
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {print}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Print Surface
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {printSurface}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Coating
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {coating}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Finishing
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {none && 'none'} {embossing && 'Embossing'} {goldFoil && 'GoldFoil'}{' '}
            {spotGloss && 'SpotGloss'}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontWeight={700} fontSize={14} color="text.primary">
            Quantity
          </Typography>
          <Typography fontWeight={400} fontSize={12} color="text.primary">
            {quantity || 0}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideInfoCard;
