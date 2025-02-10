import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";
import BackgroundGradient from "../components/BackgroundGradient";
import Header from "../components/Header";
import { useLang } from "../components/Lang";
import { Dimensions, Modal, Pressable, Text, TextInput, View } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { useColors } from "../components/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function MatchFormPages({ route, navigation }) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    const { matchFormId } = route.params;
    
    const scrollY = useRef(0);

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const options = [{name: 'Rename'}, {name: 'Delete'}];
    const [optionsYs, setOptionsYs] = useState([{}]);
    const [selectedOptionY, setSelectedOptionY] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [renameVisible, setRenameVisible] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [adderOpen, setAdderOpen] = useState(false);
    const [temporaryName, setTemporaryName] = useState('');
    const [pages, setPages] = useState([]);
    const [nextPageId, setNextPageId] = useState(0);
    const [selectedPage, setSelectedPage] = useState(null);
    const [changingName, setChangingName] = useState(false);

    const styles = {
      container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary
      },
      text: {
        color: Colors.text,
        fontFamily: 'Inter'
      }
    }
    
    useEffect(() => {
      console.log(`pages: ${JSON.stringify(pages)}`);
    }, [pages])
    
    useEffect(() => {
      console.log(`selectedPage: ${selectedPage}`);
    }, [selectedPage])
    
    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem(`pages_${matchFormId}`).then(jsonValue => {
          const pages = jsonValue != null ? JSON.parse(jsonValue) : [];
          setPages(pages); // Update the state with the fetched pages array
        }).catch(error => {
          console.error('Failed to fetch pages:', error);
        });
    
        AsyncStorage.getItem(`nextPageId_${matchFormId}`).then(jsonValue => {
          const nextPageId = jsonValue != null ? JSON.parse(jsonValue) :  0;
          setNextPageId(nextPageId); // Update the state with the fetched nextPageId
        })
        .catch(error => {
          console.error('Failed to fetch nextPageId from storage:', error);
        });
    
        AsyncStorage.getItem(`selectedPage_${matchFormId}`).then(jsonValue => {
          const selectedPage = jsonValue != null ? JSON.parse(jsonValue) :  0;
          setSelectedPage(selectedPage);
        }).catch(error => {
          console.error('Failed to fetch selectedPage from storage:', error);
        });
    
      }, [])
    );
    
    useEffect(() => {
      const jsonValue = JSON.stringify(pages);
    
      AsyncStorage.setItem(`pages_${matchFormId}`, jsonValue).then(() => {
        console.log('Updated pages stored successfully');
      }).catch(error => {
        console.error('Failed to store updated pages:', error);
      });
    }, [pages])
  
    useEffect(() => {
      pages.forEach(page => {
        if (page.defaultPage === true) {
          const jsonValue = JSON.stringify(page.id);
          AsyncStorage.setItem(`defaultPage_${matchFormId}`, jsonValue).then(() => {
            console.log('Updated defaultPage stored successfully');
          }).catch(error => {
            console.error('Failed to store updated defaultPage:', error);
          });
        }
      })
    }, [pages])
    
    useEffect(() => {
      const jsonValue = JSON.stringify(nextPageId)
      AsyncStorage.setItem(`nextPageId_${matchFormId}`, jsonValue)
      .then(() => {
          console.log('Saved nextPageId to storage');
      })
      .catch(error => {
          console.error('Failed to save nextPageId to storage:', error);
      });
    }, [nextPageId])
    
    useEffect(() => {
      const jsonValue = JSON.stringify(selectedPage);
      AsyncStorage.setItem(`selectedPage_${matchFormId}`, jsonValue).then(() => {
        console.log('Saved selectedPage to storage');
      }).catch(error => {
        console.error('Failed to store selectedPage to storage:', error);
      });
    }, [selectedPage])
    
    const nameExists = pages.some(page => page.name === temporaryName && page.id !== selectedPage);
  
    const addPage = () => {
      if (!nameExists && temporaryName.trim() !== '') {
        setOptionsYs([]);
        let newPages = [...pages, {id: nextPageId, name: temporaryName, defaultPage: false, showTextInput: false}];
        setPages(newPages);
        let nextPage = nextPageId +  1;
        setNextPageId(nextPage);
        setAdderOpen(false);
        setTemporaryName('');
      } else if (nameExists) {
        alert("Name already exists");
      } else if (temporaryName.trim() === '') {
        alert('Name cannot be blank');
      }
    }
    
    const goToPageBuilder = (pageId) => {
      navigation.navigate('MatchFormBuilder', {
        pageId: pageId,
        matchFormId: matchFormId,
      });
      setSelectedPage(pageId);
    }
    
    const doubleTap = (id) => {
      return Gesture.Tap()
        .maxDelay(250)
        .numberOfTaps(2)
        .onStart(() => {
          console.log('Double Tapped!');
          let newPages = pages.map(page =>
            page.id === id ? {...page, showTextInput: true} : page
          );
          setPages(newPages);
          setSelectedPage(id);
          setChangingName(true);
        }).runOnJS(true);
    }
    
    function changePageName(id, name) {
      if (!nameExists && name.trim() !== '') {
        let newPages = pages.map(page =>
          page.id === id ? {...page, name: name} : page
        );
        setPages(newPages);
        setRenameVisible(false);
        setTemporaryName('');
      } else if (nameExists) {
        alert("Name already exists");
      } else if (name.trim() === '') {
        alert('Name cannot be blank');
      }
    }
    
    function resetAsyncStorage() {
      AsyncStorage.clear().then(() => {
          console.log('AsyncStorage is now clear');
      }).catch(error => {
          console.error('Failed to clear AsyncStorage:', error);
      });
    }
    
    const resetStorage = Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        resetAsyncStorage();
    }).runOnJS(true);
    
    const preview = Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        navigation.navigate("Preview");
    }).runOnJS(true);
  
    const back = Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        navigation.goBack();
    }).runOnJS(true);
  
    const openAdder = Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        setAdderOpen(true);
    }).runOnJS(true);
  
    const optionSwitch = (option) => {
      switch (option) {
        case 'Rename':
          console.log('Renaming');
          setRenameVisible(true);
          setTemporaryName(pages.find(page => page.id === selectedPage).name);
          break;
        case 'Delete':
          console.log('Deleting');
          setOptionsYs([]);
          setPages(pages.filter(page => page.id !== selectedPage));
          break;
        case 'Preview':
          console.log('Previewing', matchFormId, selectedPage);
          navigation.navigate('Preview', {matchFormId: matchFormId, pageId: selectedPage});
        default:
          break;
      }
    }
  
    const handleOptionSelect = (option) => {
      optionSwitch(option);
      setOptionsVisible(false);
    }
  
    return (
      <View style={styles.container}>
        <BackgroundGradient />
        <Header title={"Pages"} backButton={true} navigation={navigation} />
  
        {renameVisible && 
          <Modal transparent={true}>
            <View style={{flex: 1, backgroundColor: Colors.primary, opacity: 0.5}} />
  
            <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: width - 20, height: 100, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 10}}>
              <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.secondaryContainer, justifyContent: 'center'}}>
                <TextInput
                  style={{color: Colors.secondaryContainer, fontSize: 24, marginLeft: 10}}
                  autoFocus
                  defaultValue={pages.find(page => page.id === selectedPage)?.name || ''}
                  placeholder='Page Name'
                  placeholderTextColor={Colors.secondaryContainer}
                  onChangeText={text => {
                    setTemporaryName(text);
                  }
                }
                />
              </View>
  
              <Pressable style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setRenameVisible(false); setTemporaryName('');}}>
                <Text style={{fontSize: 20, color: Colors.secondaryContainer}}>Cancel</Text>
              </Pressable>
  
              <Pressable style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {changePageName(selectedPage, temporaryName);}}>
                <Text style={{fontSize: 20, color: Colors.secondaryContainer}}>Submit</Text>
              </Pressable>
            </View>
          </Modal>
        }
  
        {adderOpen && 
          <Modal transparent={true}>
            <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}} />
  
            <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: width - 20, height: 100, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 10}}>
              <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.secondaryContainer, justifyContent: 'center'}}>
                <TextInput
                  style={[styles.text, {color: Colors.secondaryContainer, fontSize: 24, marginLeft: 10}]}
                  autoFocus
                  defaultValue={temporaryName}
                  placeholder='Page Name'
                  placeholderTextColor={Colors.secondaryContainer}
                  onChangeText={text => {
                    setTemporaryName(text);
                    console.log(`temporaryName: ${text}`);
                  }}
                />
              </View>
  
              <Pressable style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setAdderOpen(false); setTemporaryName('');}}>
                <Text style={[styles.text, {fontSize: 20, color: Colors.secondaryContainer}]}>Cancel</Text>
              </Pressable>
  
              <Pressable style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={addPage}>
                <Text style={[styles.text, {fontSize: 20, color: Colors.secondaryContainer}]}>Create</Text>
              </Pressable>
            </View>
          </Modal>
        }
  
        <View style={{height: Dimensions.get('window').height - 60}}>
        <ScrollView style={{marginTop: 120}} onScroll={(event) => {
          scrollY.current = event.nativeEvent.contentOffset.y;
          console.log(scrollY.current);
        }}>
            {pages.map((page, index) => (
              <View key={`${page.id}_${pages.length}`} onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const y = layout.y;
                setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: page.id, y: y}]);
                console.log(`y: ${y}`);
              }}>
                <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 1}}>
                  <Pressable style={{flexGrow: 1}} onPress={() => goToPageBuilder(page.id)}>
                    <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                      <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>{page.name}</Text>
                    </View>
                  </Pressable>
                  
                  <Menu renderer={renderers.NotAnimatedContextMenu}>
                    <MenuTrigger onPress={() => {setSelectedPage(page.id)}}>
                      <View style={{flexShrink: 1, marginRight: -10, zIndex: 9}}>
                        <MaterialIcons name='more-vert' size={50} color={Colors.text}/>
                      </View>
                    </MenuTrigger>
  
                    <MenuOptions customStyles={{optionsContainer: {width: 140, backgroundColor: 'transparent'}}}>
                      <MenuOption style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondaryContainer}} onSelect={() => handleOptionSelect('Rename')}>
                        <MaterialIcons name='edit' size={20} color={Colors.secondary} style={{marginLeft: 5}}/>
                          
                        <Text style={[styles.text, {marginLeft: 10, fontSize: 20, color: Colors.secondary}]}>Rename</Text>
                      </MenuOption>
  
                      <MenuOption style={{marginRight: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondaryContainer}} onSelect={() => handleOptionSelect('Preview')}>
                        <MaterialIcons name='remove-red-eye' size={20} color={Colors.secondary} style={{marginLeft: 5}}/>
                          
                        <Text style={[styles.text, {marginLeft: 10, fontSize: 20, color: Colors.secondary}]}>Preview</Text>
                      </MenuOption>
  
                      <MenuOption style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondaryContainer}} onSelect={() => handleOptionSelect('Delete')}>
                        <MaterialIcons name='delete' size={20} color={Colors.redAlliance} style={{marginLeft: 5}}/>
                          
                        <Text style={[styles.text, {marginLeft: 10, fontSize: 20, color: Colors.redAlliance}]}>Delete</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
            ))}
  
            {optionsVisible && 
              <Modal transparent={true}>
                <Pressable onPress={() => {setOptionsVisible(false);}} style={{flex: 1}}/>
  
                <View style={{position: 'absolute', top: selectedOptionY + 60, right: 10, width: 110, height: 50, backgroundColor: Colors.secondaryContainer, borderRadius: 10, zIndex: 10}}>
                  {options.map((option, index) => (
                    <Pressable key={index} onPress={() => {handleOptionSelect(option.name);}}>
                      <View style={{height: 25, marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name={option.name === 'Rename' ? 'edit' : option.name === 'Preview' ? 'remove-red-eye' : 'delete'} size={17} color={option.name === 'Delete' ? Colors.redAlliance : Colors.secondary} style={{marginLeft: 5}}/>
  
                        <Text style={[styles.text, {marginLeft: 10, fontSize: 17, color: (option.name === 'Delete' ? Colors.redAlliance : Colors.secondary)}]}>{option.name}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </Modal>
            }
        </ScrollView>
        </View>
  
        <GestureDetector gesture={openAdder}>
          <View style={{position: 'absolute', bottom: width * .1, right: width * .1, width: width * .15, height: width * .15, backgroundColor: Colors.accent, borderRadius: width * .075}}>
            <MaterialIcons name='add' size={width * .15} color={Colors.text}/>
          </View>
        </GestureDetector>
  
      </View>
    )
}