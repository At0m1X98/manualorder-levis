import React, {useContext} from 'react'
import { DataContext } from '../Components/Context/DataContext'

import Upload from '../Components/Upload/Upload'
import All from '../Components/All/All'

const Home = () => {
  const { isUploaded, setIsUploaded } = useContext(DataContext);

  const handleUploadSuccess = () => {
    setIsUploaded(true);
  };

  return (
    <div>
      {isUploaded ? (
        <All />
      ) : (
        <Upload onUploadSuccess={handleUploadSuccess} />
      )}
    </div>
  )
}

export default Home
