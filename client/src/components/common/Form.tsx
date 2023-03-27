import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button,FormControlLabel, FormLabel, Checkbox, FormGroup} from '@pankod/refine-mui'

import { FormProps } from 'interfaces/common'
import CustomButton from './CustomButton'



const Form = ({type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, propertyImage,facilities,selectedFacilities,setSelectedFacilities} : FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="11142d">
        {type} a Property
      </Typography>

      <Box 
      mt={2.5} 
      borderRadius='15px' 
      padding='20px'
      bgcolor='#fcfcfc'
      >
        <form action=""
        style={{
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
        onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText 
            sx={{
              fontWeight: 500,
              margin: '10px 0',
              fontSize: '16',
              color: '#11142d'
            }}
            >
              Enter property name
            </FormHelperText>
            <TextField
            fullWidth
            required
            id="outlined-basic"
            color='info'
            variant= 'outlined'
            {...register('title', {
              required: true
            })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText 
            sx={{
              fontWeight: 500,
              margin: '10px 0',
              fontSize: '16',
              color: '#11142d'
            }}
            >
              Enter Description
            </FormHelperText>
            <TextareaAutosize
            minRows={5}
            required
            placeholder="write description"
            color='info'
            style={{
              width: '100%',
              background: 'transparent',
              fontSize: '16px',
              borderColor: 'rgba(0,0,0,0.23)',
              borderRadius: 6,
              padding: 10,
              color: '#919191',
            }}
            {...register('description', {required: true})}
            />
          </FormControl>

          <Stack
          direction='row'
          gap={4}
          >
            <FormControl sx={{flex: 1}}>
              <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: "#11142d"
              }}
              >
                Selet Property Type
              </FormHelperText>
              <Select 
              variant='outlined'
              color='info'
              displayEmpty
              required
              inputProps={{'aria-label': 'Without label'}}
              defaultValue='apartment'
              {...register('propertyType',{required: true})}
              >
                <MenuItem value= 'apartment'>Apartment</MenuItem>
                <MenuItem value= 'villa'>Villa</MenuItem>
                <MenuItem value= 'farmhouse'>Farmhouse</MenuItem>
                <MenuItem value= 'condos'>Condos</MenuItem>
                <MenuItem value= 'townhouse'>Townhouse</MenuItem>
                <MenuItem value= 'duplex'>Duplex</MenuItem>
                <MenuItem value= 'studio'>Studio</MenuItem>
                <MenuItem value= 'chalet'>Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText 
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: '16',
                color: '#11142d'
              }}
              >
                Enter Property price
              </FormHelperText>
              <TextField
              fullWidth
              required
              id="outlined-basic"
              type='number'
              color='info'
              variant= 'outlined'
              {...register('price', {
                required: true
              })}
              />
            </FormControl>
          </Stack>
          <Stack direction='row' gap={4} >
            <FormControl>
              <FormHelperText 
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: '16',
                color: '#11142d'
              }}
              >
                Beds
              </FormHelperText>
              <TextField
              fullWidth
              required
              id="outlined-basic"
              type='number'
              color='info'
              variant= 'outlined'
              {...register('beds', {
                required: true
              })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText 
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: '16',
                color: '#11142d'
              }}
              >
                Room's Lengths
              </FormHelperText>
              <TextField
              fullWidth
              required
              id="outlined-basic"
              type='number'
              color='info'
              variant= 'outlined'
              {...register('room_size', {
                required: true
              })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: '16',
                color: '#11142d'
              }}>
                Bathroom
              </FormHelperText>
              <Select 
              variant='outlined'
              color='info'
              displayEmpty
              required
              inputProps={{'aria-label': 'Without label'}}
              defaultValue='full'
              {...register('bathroom',{required: true})}
              >
                <MenuItem value= 'full'>Full </MenuItem>
                <MenuItem value= 'half'>Half </MenuItem>
                <MenuItem value= 'ensuite'>Ensuite </MenuItem>
                <MenuItem value= 'powder'>Powder </MenuItem>
                <MenuItem value= 'jack & jill'>Jack & Jill </MenuItem>
                <MenuItem value= 'public'>Public </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack>
          <FormControl>
            <FormLabel component="legend">Facilites</FormLabel>
            <FormGroup>
              {facilities.map((facility : any) => (
                <FormControlLabel
                  key={facility.value}
                  control={
                    <Checkbox
                      checked={selectedFacilities.includes(facility.value)}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setSelectedFacilities((prevSelected: any[]) =>
                          checked
                            ? [...prevSelected, facility.value]
                            : prevSelected.filter((selected) => selected !== facility.value)
                        );
                      }}
                      name={facility.value}
                    />
                  }
                  label={facility.label}
                />
              ))}
            </FormGroup>
          </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText 
            sx={{
              fontWeight: 500,
              margin: '10px 0',
              fontSize: '16',
              color: '#11142d'
            }}
            >
              Enter Location
            </FormHelperText>
            <TextField
            fullWidth
            required
            id="outlined-basic"
            color='info'
            variant= 'outlined'
            {...register('location', {
              required: true
            })}
            />
          </FormControl>

          <Stack direction='column'
          justifyContent='center'
          gap={1}
          mb={2}
          >
            <Stack
            direction='row'
            gap={2}
            >
              <Typography
              color='#11142d'
              fontSize={16}
              fontWeight={500}
              my='10px'
              >Property Photo</Typography>

              <Button
              component='label'
              sx={{
                width: 'fit-content',
                color: '#2ed480',
                textTransform: 'capitalize',
                fontSize: 16
              }}
              >
                Upload *
                <input
                hidden
                accept='image/'
                type='file'
                onChange={(e) => {
                  // @ts-ignore
                  handleImageChange(e.target.files[0])
                }}
                />
              </Button>
            </Stack>
            <Typography
            fontSize={14}
            color='#808191'
            sx={{ wordBreak: 'break-all'}}
            >{propertyImage?.name}</Typography>
          </Stack>

          <CustomButton
          type='submit'
          title={formLoading ? 'Submitting...' : 'Submit'}
          backgroundColor="#475be8"
          color='#fcfcfc'
          />

        </form>
      </Box>
    </Box>
  )
}

export default Form