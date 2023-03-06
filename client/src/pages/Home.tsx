import React from 'react'
import {useList} from '@pankod/refine-core'
import { Box, Typography , Stack} from '@pankod/refine-mui'

import { 
  PieChart,
  PropertyReferrals,
  PropertyCard,
  TotalRevenue,
  TopAgent
     } from 'components'

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color={'#11142d'}>
        Dashboard
      </Typography>

      <Box mt='20px' display="flex" flexWrap='wrap' gap={4} >
        <PieChart
         title= 'Properties for Sales'
         value={684}
         series={[60, 40]}
         colors={['#475be8' , '#e4e8ef']}
        />
        <PieChart
         title= 'Properties for Rent'
         value={684}
         series={[60, 40]}
         colors={['#475be8' , '#e4e8ef']}
        />
        <PieChart
         title= 'Total Customers'
         value={5684}
         series={[75, 25]}
         colors={['#475be8' , '#e4e8ef']}
        />
        <PieChart
         title= 'Properties for Cities'
         value={354}
         series={[75, 25]}
         colors={['#475be8' , '#e4e8ef']}
        />
      </Box>
      <Stack mt='24px' width='100%' direction={{ xs: 'column', lg: 'row'}} gap={4}>
        <TotalRevenue/>
        <PropertyReferrals/>
      </Stack>
    </Box>
  )
}

export default Home