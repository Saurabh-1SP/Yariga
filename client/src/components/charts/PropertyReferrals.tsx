import React from 'react'
import ReactApexChart from 'react-apexcharts'
import {Box , Typography, Stack } from '@pankod/refine-mui'

import { propertyReferralsInfo } from 'constants/index'

interface ProgressBarProps{ 
  title: string, 
  percentage: number,
  color: string,
}

const ProgessBar = ({title, percentage, color} : ProgressBarProps) => (
  <Box width='100%'>
    <Stack direction='row' alignItems='center' justifyContent='space-between' >
      <Typography fontSize={16} fontWeight={500}>{title}</Typography>
      <Typography fontSize={16} fontWeight={500}>{percentage}%</Typography>
    </Stack>
    <Box mt={2} position='relative' width='100%' height='8px' borderRadius={1} bgcolor='#e4e8ef'>
      <Box width={`${percentage}%`} bgcolor={color} position='absolute' height='100%' borderRadius={1}/>
    </Box>
  </Box>
)

const PropertyReferrals = () => {
  return (
    <Box
    p={4}
    bgcolor='#FCFCFC'
    id='chart'
    minWidth={490}
    display='flex'
    flexDirection="column"
    borderRadius='15px'
    >
      <Typography fontSize={18} fontWeight={600} color='#11142d'>
        Property Referrals
      </Typography>

      <Stack my='20px' direction='column' gap={4}>
        {propertyReferralsInfo.map((bar)=>(
          <ProgessBar key={bar.title} {...bar}/>
        ))}
      </Stack>
    </Box>
  )
}

export default PropertyReferrals