import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ky from 'ky';

const UploadContext = createContext();

export const useUpload = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const {Settings} = useSettings();
  const [data, setData] = useState({});
  
  async function fetchUploadToken(type) {
    const json = await ky.post(Constants.serverUrl + '/uploads/getUploadToken', {json: {type: type, token: Settings.token, numChunks: 1}}).json();
    return json;
  }

  async function prepFileForUpload(file) {
    
  }

  return (
      <UploadContext.Provider value={{ }}>
        {children}
      </UploadContext.Provider>
  );
};
