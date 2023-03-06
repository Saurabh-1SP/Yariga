import { Box } from '@mui/system'
import { useList } from '@pankod/refine-core'
import { Typography } from '@pankod/refine-mui'
import { AgentCard } from 'components'
import React from 'react'

const Agents = () => {

  const {data} = useList({
    resource: 'users'
  })

  const allAgents = data?.data ?? [];

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'> Agents List</Typography>

      <Box mt='20px' sx={{display: 'flex' , flexWrap: 'wrap', gap: '20px' , background: '#fcfcfc'}} >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name= {agent.name}
            email= {agent.email}
            avatar= {agent.avatar}
            noOfProperties={agent.allProperties.length}
          />
        ))}        
      </Box>
    </Box>
  )
}

export default Agents