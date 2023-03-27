import { useOne, } from '@pankod/refine-core';
import { CircularProgress } from '@pankod/refine-mui';
import { useParams } from '@pankod/refine-react-router-v6';
import { Profile } from 'components';

const MyProfile = () => {

    const { id } = useParams();

    const  { data, isLoading, isError} = useOne({
      resource: 'users',
      id: id as string
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
        properties=''
      />)
  
}

export default MyProfile