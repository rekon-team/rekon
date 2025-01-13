import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { View, Text, Modal, Dimensions, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import ky from 'ky';
import { MaterialIcons } from '@expo/vector-icons';
import { useColors } from './Colors';
import { useLang } from './Lang';
import * as Progress from 'react-native-progress';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, withDelay } from 'react-native-reanimated';
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
  const dialogWidth = useSharedValue((Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale);
  const dialogHeight = useSharedValue((Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale);
  const dialogRadius = useSharedValue(100);
  const [isExtended, setIsExtended] = useState(false);

  const statusStyle = useAnimatedStyle(() => ({
    bottom: statusPosition.value,
  }));

  const dialogStyle = useAnimatedStyle(() => ({
    width: dialogWidth.value,
    height: dialogHeight.value,
    borderRadius: dialogRadius.value,
  }));

  useEffect(() => {
    console.log(Object.keys(data));
    if (Object.keys(data).length > 0) {
      setIsUploading(true);
    } else {
      setIsUploading(false);
    }
  }, [data]);

  useEffect(() => {
    if (isExtended) {
      dialogWidth.value = withTiming((Dimensions.get('window').width - (Dimensions.get('window').width / 7)));
      dialogHeight.value = withTiming((Dimensions.get('window').width / 2) / Dimensions.get('window').fontScale);
      dialogRadius.value = withTiming(15);
    } else {
      dialogWidth.value = withTiming((Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale);
      dialogHeight.value = withTiming((Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale);
      dialogRadius.value = withTiming(100);
    }
  }, [isExtended]);

  useEffect(() => {
    if (currentTasks.length > 0) {
      statusPosition.value = withTiming(10);
    } else {
      setIsExtended(false);
      console.log('closing dialog');
      statusPosition.value = withDelay(
        500,
        withTiming(-100, {
          duration: 300
        })
      );
    }
  }, [currentTasks]);
  
  async function fetchUploadToken(type, token, fileName, fileType) {
    try {
      console.log('fetching upload token');
      console.log('fileName:', fileName);
      console.log('token:', token);

      
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
      throw new Error(`Error in fetchUploadToken: ${error.message}`);
    }
  }

  async function prepFileForUpload(file, fileName) {
    console.log('prepping file for upload');
    try {
      
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

      // Then update state
      return new Promise((resolve) => {
        setData(prevData => {
          const newData = {...prevData, [fileName]: fileChunks};
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

  async function getUploadedFiles(token) {
    console.log('getting uploaded files');
    try {
      const json = await ky.get(Constants.serverUrl + `/uploads/getUserFiles?userToken=${token}`).json();
      return json;
    } catch (error) {
      console.error('Error in getUploadedFiles:', error);
      console.error('Full error:', error);
      return null;
    }
  }

  async function deleteFile(token, uploadToken) {
    console.log('deleting file', uploadToken);
    try {
      const json = await ky.post(Constants.serverUrl + '/uploads/deleteFile', {
        json: {
          userToken: token,
          uploadToken: uploadToken
        }
      }).json();
      console.log(json);
      return json;
    } catch (error) {
      console.error('Error in deleteFile:', error);
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
      <UploadContext.Provider value={{prepFileForUpload, fetchUploadToken, uploadFile, getUploadedFiles, deleteFile}}>
        {children}
        {/* Everything below this point is for the task list dialog
        This dialog is designed to be a simple way to view the progress of the uploads.
        For now, tasks must be manually dismissed for the popup to close, though auto-dismissal is planned.*/}
        <Animated.View style={[
          {
            position: 'absolute',
            right: 0,
            zIndex: 1000
          },
          statusStyle
        ]}>
          <Pressable 
          style={{
            right: (Dimensions.get('window').width / 14) / Dimensions.get('window').fontScale,
          }}
          hitSlop={20}
          onPress={() => {
            setIsExtended(!isExtended);
          }}>
            <Animated.View 
            style={[{
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: isUploading ? Colors.info : Colors.completedGreen,
              width: (Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale,
              height: (Dimensions.get('window').width / 6) / Dimensions.get('window').fontScale,
              borderRadius: 100,
              elevation: 5,
              flex: 1,
            }, dialogStyle]}>
              {!isExtended && (
                isUploading ? <ActivityIndicator size="large" color="white" /> : <MaterialIcons name="check" size={40} color="white" />
              )}
            </Animated.View>
          </Pressable>
          {isExtended && (
            // This one needs explaining:
            // The scrollview didn't work when it was inside the pressable, as the pressable would override the touch events.
            // Instead, the scrollview is alongside the pressable, and is positioned absolutely and scaled to perfectly match the animated view.
            // This needs testing on other device sizes to make sure the scaling works properly (it should, it's all based on window dimensions).
              <View style={{position: 'absolute', top: 0, left: -Dimensions.get('window').width / 14, right: Dimensions.get('window').width / 14, bottom: 0, zIndex: 1000}}>
                <ScrollView vertical={true}>
                  {
                    currentTasks.map((task, index) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10, gap: 10}}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{task.fileName}</Text>
                      <Pressable hitSlop={20} onPress={() => {
                        if (task.progress === 1) {
                          setCurrentTasks(prevTasks => prevTasks.filter(t => t.fileName !== task.fileName));
                        }
                      }}>
                        {task.progress === 1 ? <MaterialIcons name="close" size={24} color="white" /> : <Progress.Pie progress={task.progress} size={24} color="white" />}
                      </Pressable>
                    </View>
                  ))
                  }
                </ScrollView>
              </View>
            )}
        </Animated.View>
        {isExtended && (
          // This is positioned in-between the other pressable and the scrollview, and is used to close the dialog when the user presses outside of the task list window.
          <Pressable style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onPress={() => {
            setIsExtended(false);
          }}>
          </Pressable>
        )}
      </UploadContext.Provider>
  );
};

