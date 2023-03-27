import { useGetIdentity, useOne, } from '@pankod/refine-core';
import { CircularProgress } from '@pankod/refine-mui';
import { Profile } from 'components';

const MyProfile = () => {

  const { data: user } = useGetIdentity();

    const  { data, isLoading, isError} = useOne({
      resource: 'users',
      id: user?.userid
    });
  
    const allProfile = data?.data ?? [];

    if(isLoading) return <div><CircularProgress/></div>
    if(isError) return <div>errr....</div>
    return (
      <Profile
        type='My'
        name={allProfile.name}
        avatar={allProfile.avatar}
        email={allProfile.email}
        properties={allProfile.allProperties}
      />)
  
}

export default MyProfile