import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function MediaControlCard({ data }) {
  console.log(data);
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {data.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
            Qunty. : {(data.price * 72) * data.qunt}
            Qunty. :
          </IconButton>
          <IconButton aria-label="play/pause">
            {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
          </IconButton>
          <IconButton aria-label="next">
            {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
            Price. : {data.price}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={data.img}
        alt="Live from space album cover"
      />
    </Card>
  );
}