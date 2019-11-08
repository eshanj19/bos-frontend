import React, { useEffect, useState } from 'react';
import File from './../common/File';
import api from '../../api';

export default function EditFile(props) {
  const [initialData,setInitialData] = useState(null);
  useEffect(() => {
    const resourceId = props.match.params.id;
    api.getResource(resourceId).then(({data}) => {
      console.log(data);
      const {label, description} = data;
      setInitialData({selectedFileName : label, fileDescription : description });
    })
  },[])
  return(
    !initialData ? null : <File initialData={initialData}/>
  )
}