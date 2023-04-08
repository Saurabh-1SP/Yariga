import React, {useState} from "react";
import {useGetIdentity
} from "@pankod/refine-core";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  TextField,
  Box,
  FormHelperText,
  Card,
  CardContent,
} from "@pankod/refine-mui";
import { Link, useNavigate } from "@pankod/refine-react-router-v6"
import { Place, Search } from "@mui/icons-material";

import { useTable } from "@pankod/refine-core";




export const Header: React.FC = () => {
  // const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false)
    
  const { data: user } = useGetIdentity();
  const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.

  const navigate = useNavigate()

// const searching = () =>{
//   if(!isSearching){
//     let searchIcon = document.getElementById('searchIcon') as HTMLElement;
//     let SearchBox = document.getElementById('search') as HTMLElement;
//     setIsSearching(true)
//     SearchBox.style.width = '410px'
//     searchIcon.style.color = '#475BE8'
// }
// if(isSearching){
//   let searchIcon = document.getElementById('searchIcon') as HTMLElement;
//     let SearchBox = document.getElementById('search') as HTMLElement;
//     setIsSearching(false)
//     setTimeout(()=>setSearched(false),1000)
//     SearchBox.style.width = '140px'
//     searchIcon.style.color = '#808191'
// }
// }

const {
  tableQueryResult:  { data}, setFilters,
} = useTable();

let filterProperties = data?.data ?? [];
const HandleSearchChange = (e: {
  currentTarget: any; target: { value: any; }; 
}) => {
  setFilters([
    {
      field: 'title',
      operator: 'eq',
      value: e.target.value
    }
  ], 'replace')
   
  setTimeout(()=>{
    setSearched(true)},1000)
  setTimeout(()=>{
    setSearched(false)},5000)

}


const PropertiesCard = () =>{
  return  <Box position='absolute' top='3.5rem' bgcolor="#f3f3f3" borderRadius={1} width='500px' justifyContent='space-between' overflow='scroll'>
    {!filterProperties.length? 
      (
        <Box><Typography>Properties not found
          </Typography></Box>
      ) :
      filterProperties.map((property)=>(
            <Card 
            component={Link}
            to={`/properties/show/${property._id}`}
            onClick={()=>{ navigate(`/properties/show`); setTimeout(()=>setSearched(false),100);}}
            sx={{boxShadow: '0 22px 45px 2px rgba(176,176,176,0.1)', display: 'flex', flexDirection: 'row', margin:'1rem', backgroundColor: '#fcfcfc'}}
            elevation={0}
            >
              <CardContent sx={{display: 'flex' , flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',width: '100%'}} >
                  <Stack direction='column' gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">{property.title}</Typography>
                    <Stack direction='row' gap={0.5} alignItems='flex-start'>
                      <Place sx={{ fontSize: 18, color: '#11142d', marginTop: 0.5}} />
                      <Typography fontSize={14} color='#808191'>{property.location}</Typography>
                    </Stack>
                  </Stack>
                  <Box px={1.5} py={0.5} borderRadius={1} bgcolor='#dadefa' height='fit-content'>
                    <Typography fontSize={12} fontWeight={600} color='#475be8' >${property.price}</Typography>
                  </Box>
              </CardContent>
            </Card>
          )
      )
      
      }
  </Box> 
    }
    


  return shouldRenderHeader ? (
    <AppBar color="default" position="sticky" elevation={0} sx={{
      background: '#FCFCFC'
      }}>
      <Toolbar>
        {/* <Box> */}
          <Stack direction='row' sx={{width: '400px'}} alignItems='left' gap={1} bgcolor='#F4F4F4' borderRadius='8px' padding='0px 10px' justifyContent='left' overflow='hidden' >
            <FormHelperText >
            <Search
            id="searchIcon" fontSize="medium"
            sx={{marginTop: '4px', color: '#808191',
              '&:hover': {
                color: '#475BE8'
              }
            }}
            onClick={()=>{}}
            /></FormHelperText>
            <TextField placeholder="Search Properties" variant="standard" color="info" InputProps={{style: {fontSize: '14px', width: '240px'}, }}onChange={HandleSearchChange}  />
          </Stack>
        {/* </Box> */}
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center">
            <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
            >
            {user?.name ? (
              <Typography component={Link} to={`/my-profile`} variant="subtitle2">{user?.name}</Typography>
              ) : null}
            {user?.avatar ? (
              <Avatar component={Link} to={`/my-profile`} src={user?.avatar} alt={user?.name} />
            ) : null}
          </Stack>
        </Stack>
      </Toolbar>
      {searched ? <Box display='flex' gap='2rem'><PropertiesCard/></Box> : ''
      }
    </AppBar>
  ) : null;
}
