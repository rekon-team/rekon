import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { View, Text, Modal, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import ky from 'ky';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from './Colors';
import { useLang } from './Lang';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Constants from '../components/Constants';

const UploadContext = createContext();

export const useUpload = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const { Colors } = useColors();
  const { Lang } = useLang();
  const [data, setData] = useState({});
  const dataRef = useRef({});
  const [isUploading, setIsUploading] = useState(false);
  const [currentTasks, setCurrentTasks] = useState([]);
  const statusPosition = useSharedValue(-100);

  const statusStyle = useAnimatedStyle(() => ({
    bottom: statusPosition.value,
  }));

  useEffect(() => {
    console.log(Object.keys(data));
    if (Object.keys(data).length > 0) {
      setIsUploading(true);
    }
  }, [data]);

  useEffect(() => {
    if (currentTasks.length > 0) {
      statusPosition.value = withSpring(10 / Dimensions.get('window').fontScale);
    } else {
      statusPosition.value = withTiming(-100);
    }
  }, [currentTasks]);
  
  async function fetchUploadToken(type, token, fileName, fileType) {
    try {
      console.log('fetching upload token');
      console.log('Current dataRef:', dataRef.current);
      console.log('fileName:', fileName);
      
      if (!dataRef.current) {
        throw new Error('dataRef.current is undefined');
      }

      if (!dataRef.current[fileName]) {
        throw new Error(`No data found for fileName: ${fileName}`);
      }

      if (!Array.isArray(dataRef.current[fileName])) {
        throw new Error(`Data for ${fileName} is not an array. Got: ${typeof dataRef.current[fileName]}`);
      }

      const numChunks = dataRef.current[fileName].length;
      console.log('numChunks:', numChunks);

      const json = await ky.post(Constants.serverUrl + '/uploads/getUploadToken', {
        json: {
          type: type,
          token: token,
          numChunks: numChunks,
          fileType: fileType
        }
      }).json();
      return json.token;
    } catch (error) {
      console.error('Error in fetchUploadToken:', error);
      // Log the full state of dataRef
      console.error('Full dataRef state:', JSON.stringify(dataRef.current, null, 2));
      throw error;
    }
  }

  async function prepFileForUpload(file, fileName) {
    console.log('prepping file for upload');
    try {
      console.log('Input file:', file);
      
      const fileBase64 = await fetch(file).then(r => r.arrayBuffer());
      
      // Convert array buffer to base64 in chunks
      const uint8Array = new Uint8Array(fileBase64);
      let binary = '';
      const chunkSizePre = 1024;
      for (let i = 0; i < uint8Array.length; i += chunkSizePre) {
        const chunk = uint8Array.slice(i, i + chunkSizePre);
        binary += String.fromCharCode.apply(null, chunk);
      }
      const fileBase64String = btoa(binary);
      
      console.log('Base64 conversion successful');
      const chunkSizePost = 512 * 1024; // 512KB chunks
      const fileChunks = [];
      for (let i = 0; i < fileBase64String.length; i += chunkSizePost) {
        fileChunks.push(fileBase64String.slice(i, i + chunkSizePost));
      }
      
      console.log('Chunks created:', fileChunks.length);
      
      // Initialize dataRef.current if it's undefined
      if (!dataRef.current) {
        dataRef.current = {};
      }
      
      // Update ref first
      dataRef.current[fileName] = fileChunks;
      console.log('dataRef updated:', dataRef.current);

      // Then update state
      return new Promise((resolve) => {
        setData(prevData => {
          const newData = {...prevData, [fileName]: fileChunks};
          console.log('Setting new data state:', newData);
          resolve(fileName);
          return newData;
        });
      });
    } catch (error) {
      console.error('Error in prepFileForUpload:', error);
      console.error('Full error:', error);
      return null;
    }
  }

  async function uploadFile(fileName, token, uploadToken) {
    console.log('uploading file');
    setCurrentTasks(prevTasks => [...prevTasks, {fileName: fileName, token: token, uploadToken: uploadToken, progress: 0}]);
    
    // Use dataRef.current instead of data
    const fileChunks = dataRef.current[fileName];
    if (!fileChunks || !Array.isArray(fileChunks)) {
        throw new Error(`No valid chunks found for ${fileName}`);
    }

    for (let i = 0; i < fileChunks.length; i++) {
        console.log(`uploading chunk ${i} of ${fileChunks.length} using token ${uploadToken}`);
        const chunk = fileChunks[i];
        const json = await ky.post(Constants.serverUrl + '/uploads/uploadChunk', {
            json: {
                userToken: token, 
                uploadToken: uploadToken, 
                chunk: chunk, 
                index: i
            }
        }).json();
        setCurrentTasks(prevTasks => 
            prevTasks.map(task => 
                task.fileName === fileName 
                    ? {...task, progress: (i + 1) / fileChunks.length} 
                    : task
            )
        );
        console.log(json);
    }

    const json = await ky.post(Constants.serverUrl + '/uploads/completeUpload', {
        json: {
            userToken: token, 
            uploadToken: uploadToken
        }
    }).json();
    console.log(json);

    // Clean up the data
    delete dataRef.current[fileName];
    setData(prevData => {
        const newData = {...prevData};
        delete newData[fileName];
        return newData;
    });
}
  return (
      <UploadContext.Provider value={{prepFileForUpload, fetchUploadToken, uploadFile}}>
        {children}
        <Animated.View style={statusStyle}>
          <Pressable 
          style={{
            position: 'absolute',
            bottom: 0,
            right: (Dimensions.get('window').width / 14) / Dimensions.get('window').fontScale,
            zIndex: 1000,
          }}
          onPress={() => {
            setIsVisible(true);
          }}>
          <Animated.View 
          style={{
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: isUploading ? Colors.info : Colors.completedGreen,
            width: (Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale,
            height: (Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale,
            borderRadius: 100,
            elevation: 5,
          }}>
            {isUploading ? <ActivityIndicator size="large" color="white" /> : <MaterialIcons name="check" size={40} color="white" />}
            </Animated.View>
          </Pressable>
        </Animated.View>
      </UploadContext.Provider>
  );
};

