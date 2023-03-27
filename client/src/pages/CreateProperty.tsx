import { useState } from "react"
import { useGetIdentity } from "@pankod/refine-core"
import { FieldValues, useForm } from "@pankod/refine-react-hook-form"

import Form from "components/common/Form"

const CreateProperty = () => {
  // const navigate = useNavigate();
  const { data: user} = useGetIdentity();
  const [ propertyImage, setPropertyImage] = useState({ name: '', url: ''});
  const { refineCore: {onFinish, formLoading}, register, handleSubmit} = useForm();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const facilities = [
    { value: 'pool', label: 'Swimming pool' },
    { value: 'gym', label: 'Gym' },
    { value: 'parking', label: 'Parking' },
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'ac', label: 'Air conditioning' },
  ];
  

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler= async (data: FieldValues) =>{
    if(!propertyImage.name) return alert ('Please select an image')
    
    await onFinish({...data, photo: propertyImage.url, email: user.email , facilities: selectedFacilities})
  }

  return (
    <Form
      type='Create'
      register={register}
      onFinish= {onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler= {onFinishHandler}
      propertyImage={propertyImage}
      facilities={facilities}
      selectedFacilities= {selectedFacilities}
      setSelectedFacilities={setSelectedFacilities}
    />
  )
}

export default CreateProperty