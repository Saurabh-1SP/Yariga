import { Typography, Box, Stack, Avatar, CircularProgress } from "@pankod/refine-mui"
import { AcUnit, Balcony, Bathtub, Bed, CallOutlined, CropSquareSharp,CurrencyRupee, LocalParking, MessageOutlined, Place, Pool, SmokingRooms, SportsGymnastics, Star, Wifi,} from '@mui/icons-material'
import {map} from '../assets'


import { CustomButton } from "components"
import { useShow } from "@pankod/refine-core"

const PropertyDetails = () => {

  // const navigate = useNavigate();
  // const {data: user} = useGetIdentity();
  // const { id } = useParams();
  // const { mutate }  = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};

  if(isLoading) return <div><CircularProgress/></div>
  if(isError) return <div>Error</div>

  return (
    <Box borderRadius='15px' padding='20px' bgcolor='#fcfcfc' width='fit-content'  >
      <Typography fontSize={25} fontWeight={700} color='#11142d' >
        Details
      </Typography>

      <Box mt='20px' display='flex' flexDirection={{xs: 'column' , lg: 'row'}} gap={4}>
        
        <Box flex={1} maxWidth={764} >
          <img src={propertyDetails.photo} alt={propertyDetails.title}
          height={546} style={{objectFit: 'cover',borderRadius: '10px'}}
          className='property_details-img'
          />
          <Box mt='15px' display='flex' flexDirection='row' justifyContent='space-between'  flexWrap="wrap" alignItems='center' >
            <Stack>
              <Typography fontSize={18} fontWeight={500} color="#11142d" textTransform='capitalize' >
                {propertyDetails.propertyType}
              </Typography>
              <Typography fontSize={22} fontWeight={600} color="#11142d" textTransform='capitalize' >
                  {propertyDetails.title}
              </Typography>
              <Stack mt={0.5} direction='row' alignItems="center" gap={0.5} >
                  <Place sx={{ color: ''}}/>
                  <Typography fontSize={14} color='#808191'>
                    {propertyDetails.location}
                  </Typography>
                </Stack>
            </Stack>
            <Stack>
              <Box>
                {[1,2,3,4,5].map((star) => 
                <Star key={star} sx={{ color: '#f2c94c'}}/>
                )}
              </Box>
              <Box>
                <Typography fontSize={16} fontWeight={500} color="#11142d" textTransform='capitalize' >
                  Price
                </Typography>

                <Stack mt={0.5} direction='row' alignItems="center" display='flex' justifyContent='left' >
                    <CurrencyRupee sx={{color: '#475BE8' ,textAlign: 'right'}} fontSize='medium' />
                  <Typography fontSize={24} fontWeight={700} color='#475BE8' display='flex' flexDirection='row' alignItems='center' gap='6px'>
                    {propertyDetails.price}
                  <Typography fontSize={14}  color='#808191'>for one day</Typography>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box mt='15px' >
            <Typography fontSize={18} fontWeight={500} color="#11142d" textTransform='capitalize' >
            Facillity
            </Typography>
            <Stack mt={0.5} direction='row' alignItems='center' justifyContent='space-around' gap={4} flexWrap='wrap'>
              <Typography fontSize={14} fontWeight={500} color="#11142d" textTransform='capitalize' display='flex' alignItems='center' gap={0.5}>
                <Bed fontSize="small" sx={{color: '#808191'}}/>
                {propertyDetails.beds} Beds
              </Typography>
              <Typography fontSize={14} fontWeight={500} color="#11142d" textTransform='capitalize' display='flex' alignItems='center' gap={0.5}>
                <Bathtub fontSize="small" sx={{color: '#808191'}}/>
                {propertyDetails.bathroom} Bathroom
              </Typography>
              <Typography fontSize={14} fontWeight={500} color="#11142d" textTransform='capitalize' display='flex' alignItems='center' gap={0.5}>
                <CropSquareSharp fontSize="small" sx={{color: '#808191'}}/>
                {propertyDetails.room_size} Lenghts
              </Typography>
              {propertyDetails.facilities.map((facility: any)=>(
                propertyDetails.facilities.includes(facility) &&
                  <Typography fontSize={14} fontWeight={500} color="#11142d" textTransform='capitalize' display='flex' alignItems='center' gap={0.5} >
                    {facility === 'wifi' && <Wifi fontSize="small" sx={{color: '#808191'}}/>}
                    {facility === 'pool' && <Pool fontSize="small" sx={{color: '#808191'}}/>}
                    {facility === 'parking' && <LocalParking fontSize="small" sx={{color: '#808191'}}/>}
                    {facility === 'smooking' && <SmokingRooms fontSize="small" sx={{color: '#808191'}}/>}
                    {facility === 'gym' && <SportsGymnastics fontSize="small" sx={{color: '#808191'}}/>}
                    {facility === 'ac' && <AcUnit fontSize="small" sx={{color: '#808191'}}/>}
                    {facility === 'balcony' && <Balcony fontSize="small" sx={{color: '#808191'}}/>}
                    {facility}
                  </Typography>
              ))}
            </Stack>
          </Box>
          <Stack mt='15px' gap={1}>
            <Typography fontSize={18} fontWeight={500} color="#11142d">
              Description
            </Typography>
            <Typography fontSize={14} fontWeight={400}>
              {propertyDetails.description}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Box mt='20px' borderRadius='12px' border='1px solid #E4E4E4' padding='1rem' width={{xs: '100%' , lg: 'auto'}}  >
            <Stack alignItems='center' justifyContent='center' margin='15px auto' gap={0.75} >
              <Avatar src={propertyDetails.creator.avatar} alt={propertyDetails.creator.name} sx={{width: '100px', height: '100px'}} />
              <Typography fontSize={18} fontWeight={600} color="#11142d">{propertyDetails.creator.name}</Typography>
              <Typography fontSize={14} fontWeight={400} sx={{color: '#808191'}}>Agent</Typography>
              <Typography fontSize={14} fontWeight={400} sx={{color: '#808191'}}><Place fontSize="small"/>{propertyDetails.location}</Typography>
              <Typography fontSize={16} fontWeight={600} sx={{color: '#11142d'}}>{propertyDetails.creator.allProperties.length} {propertyDetails.creator.allProperties.length ===1 ? 'Property' : 'Properties'}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='center' gap={3} alignItems='center'>
              <Stack direction='row' gap={1} alignItems='center' color='white' padding='10px 15px' borderRadius='6px' minWidth='135px' textAlign='center' justifyContent='center' bgcolor='#475BE8'>
                <MessageOutlined/>
                <Typography fontSize={16} fontWeight={600}>Message</Typography>
              </Stack>
              <Stack direction='row' gap={1} alignItems='center' color='white' padding='10px 15px' borderRadius='6px' minWidth='135px' textAlign='center' justifyContent='center' bgcolor='#2ED480' >
                <CallOutlined/>
                <Typography fontSize={16} fontWeight={600}>Call</Typography>
              </Stack>
            </Stack>
          </Box>
            <Box mt={3} display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={2} >
              <Stack >
              <img src={map} alt='map' width='380px' />
              </Stack>
              <CustomButton
                fullWidth
                type='button'
                title= 'Book now'
                backgroundColor="#475be8"
                color='#fcfcfc'
              />
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PropertyDetails