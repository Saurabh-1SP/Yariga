import {useMemo} from 'react'
import {Add} from '@mui/icons-material'
import { useTable} from '@pankod/refine-core'
import { Box, Stack, TextField, Typography, Select, MenuItem, CircularProgress} from '@pankod/refine-mui'
import { useNavigate } from '@pankod/refine-react-router-v6'

import { PropertyCard, CustomButton } from 'components'

const AllProperties = () =>{
  const navigate = useNavigate();

  const {
    tableQueryResult:  { data, isLoading, isError},
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  console.log(allProperties)

  const toggleSort = (field: string) => {
    setSorter([{field, order: currentPrice === 'desc' ? 'asc' : 'desc'}])
  }

  const currentFilterValues = useMemo(() => {
      const logicalFilters = filters.flatMap((item) => ('field' in item? item: []));

      return {
        title: logicalFilters.find((item) => item.field === 'title')?.value || '',
        propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
      }
  }, [filters])

  if(isLoading) return <Typography><CircularProgress/></Typography>
  if(isError) return <Typography>Error....</Typography>

  return(
    <Box>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
        <Stack direction='column' width='100%'>
          <Stack display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' >
            <Typography fontSize={25} fontWeight={700} color='#11142d'>
              {!allProperties.length ? 'There are no properties' : 'All properties'}
            </Typography>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <CustomButton
              title= 'Add Property'
              handleClick={()=> navigate('/properties/create')}
              backgroundColor= '#475be8'
              color="#fcfcfc"
              icon={<Add/>}
              />
            </Stack>
          </Stack>
          <Box mb={2} mt={3} display='flex' width='100%' justifyContent='space-between' flexWrap='wrap'>
            <Box display='flex' gap={2} flexWrap='wrap' mb={{xs: '20px', sm: 0}}>
              <TextField
                variant='outlined'
                color='info'
                placeholder= 'Search By title'
                value={currentFilterValues.title}
                onChange={(e)=>{
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])
                }}
              />
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{'aria-label' : 'Without label',}}
                sx={{fontSize: '12px', color: '#808191'}}
                defaultValue=''
                value={currentFilterValues.propertyType}
                onChange={(e)=>{
                  setFilters([
                    {
                      field: 'propertyType',
                      operator: 'eq',
                      value: e.target.value
                    }
                  ], 'replace')
                }}
              >
                <MenuItem value='' sx={{color: '#808191'}} > All</MenuItem>
                {['Apartment', 'Villa', 'Farmhouse', 'Condos', 'Townhouse', 'Duplex', 'Studio', 'Chalet'].map((type) => (
                  <MenuItem key={type} sx={{width:'300px',}} value={type.toLowerCase()}>{type}
                  </MenuItem>
                ))}
              </Select>
                <CustomButton
                  title={`Sort price ${currentPrice === 'desc' ? '↓' : '↑'}`}
                  handleClick={()=>toggleSort('price')}
                  backgroundColor='#475be8'
                  color= '#fcfcfc'
                />

            </Box>
          </Box>
        </Stack>
      </Box>




        <Box mt='20px' sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
          {allProperties.map((property)=>(
            <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price= {property.price}
            location= {property.location}
            photo= {property.photo}
            beds={property.beds}
            length={property.room_size}
            />
          ))}
        </Box>

        {allProperties.length> 0 && (
          <Box display='flex' gap={2} mt={3} flexWrap='wrap'>
            <CustomButton
              title='Previous'
              handleClick={()=> setCurrent((prev)=> prev -1)}
              backgroundColor='#475be8'
              color='#fcfcfc'
              disabled={!(current> 1)}
            />
            <Box display={{xs: 'hidden', sm: 'flex'}} alignItems='center' gap='5px' color='#808191'>
              Page{''}<strong>{current} of {pageCount}</strong>
            </Box>
            <CustomButton
              title='Next'
              handleClick={()=> setCurrent((prev)=> prev + 1)}
              backgroundColor='#475be8'
              color='#fcfcfc'
              disabled={current === pageCount}
            />
            <Select
              variant='outlined'
              color='info'
              displayEmpty
              required
              inputProps={{'aria-label' : 'Without label',}}
              sx={{color: '#808191',}}
              defaultValue={10}
              onChange={(e)=> setPageSize(e.target.value ? Number(e.target.value) : 10)}
              >
                {[10,20,30,40,50].map((size)=> (
                  <MenuItem key={size} value={size}>Show {size}</MenuItem>
                ))}
            </Select>
          </Box>
        )}
        
    </Box>
  )
}

export default AllProperties