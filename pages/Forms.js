import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useColors } from "../components/Colors";
import { useLang } from "../components/Lang";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundGradient from "../components/BackgroundGradient";
import Header from "../components/Header";

export default function Forms({ navigation }) {
    // WARNING! THIS IS FROM BEFORE THE RE-WRITE SO ALL STYLES ARE INLINE, DOESNT SCALE, AND CODE IS BAD. DESIGNS ARE ALSO NOT UP TO DATE
    const { Colors } = useColors();
    const { Lang } = useLang();

    const [renameVisible, setRenameVisible] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [optionsYs, setOptionsYs] = useState([]);
    const [totalForms, setTotalForms] = useState([]);
    const [selectedOptionY, setSelectedOptionY] = useState(0);
    const scrollY = useRef(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [{name: 'Rename'}, {name: 'Preview'}, {name: 'Delete'}];
    const [temporaryName, setTemporaryName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [type, setType] = useState('Pit');
    const [adderOpen, setAdderOpen] = useState(false);
    const [pitForms, setPitForms] = useState([]);
    const [matchForms, setMatchForms] = useState([]);
    const [data, setData] = useState([]);
    const [compare, setCompare] = useState([]);
    const [nextId, setNextId] = useState(0);

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            width: '100%',
            height: '100%'
        },
        text: {
            color: Colors.text,
            fontFamily: 'Inter',
        },
    });
  
    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem('pitForms').then(jsonValue => {
          const pitForms = jsonValue != null ? JSON.parse(jsonValue) : [];
          setPitForms(pitForms); // Update the state with the fetched pitForms array
        }
        ).catch(error => {
          console.error('Failed to fetch pitForms:', error);
        });
  
        AsyncStorage.getItem('matchForms').then(jsonValue => {
          const matchForms = jsonValue != null ? JSON.parse(jsonValue) : [];
          setMatchForms(matchForms); // Update the state with the fetched matchForms array
        }
        ).catch(error => {
          console.error('Failed to fetch matchForms:', error);
        });
  
        AsyncStorage.getItem('data').then(jsonValue => {
          const data = jsonValue != null ? JSON.parse(jsonValue) : [];
          setData(data); // Update the state with the fetched data array
        }
        ).catch(error => {
          console.error('Failed to fetch data:', error);
        });
  
        AsyncStorage.getItem('compare').then(jsonValue => {
          const compare = jsonValue != null ? JSON.parse(jsonValue) : [];
          setCompare(compare); // Update the state with the fetched compare array
        }
        ).catch(error => {
          console.error('Failed to fetch compare:', error);
        });
  
        AsyncStorage.getItem('nextId').then(jsonValue => {
          const nextId = jsonValue != null ? JSON.parse(jsonValue) : 0;
          setNextId(nextId); // Update the state with the fetched nextId
        }
        ).catch(error => {
          console.error('Failed to fetch nextId:', error);
        });
      }, [])
    )
  
    useEffect(() => {
      const jsonValue = JSON.stringify(pitForms);
      AsyncStorage.setItem('pitForms', jsonValue).then(() => {
        console.log('Updated pitForms stored successfully');
      }).catch(error => {
        console.error('Failed to store updated pitForms:', error);
      });
  
      console.log(`pitForms: ${JSON.stringify(pitForms)}`);
    }, [pitForms])
  
    useEffect(() => {
      const jsonValue = JSON.stringify(matchForms);
      AsyncStorage.setItem('matchForms', jsonValue).then(() => {
        console.log('Updated matchForms stored successfully');
      }).catch(error => {
        console.error('Failed to store updated matchForms:', error);
      });
  
      console.log(`matchForms: ${JSON.stringify(matchForms)}`);
    }, [matchForms])
  
    useEffect(() => {
      const jsonValue = JSON.stringify(data);
      AsyncStorage.setItem('data', jsonValue).then(() => {
        console.log('Updated data stored successfully');
      }).catch(error => {
        console.error('Failed to store updated data:', error);
      });
  
      console.log(`data: ${JSON.stringify(data)}`);
    }, [data])
  
    useEffect(() => {
      const jsonValue = JSON.stringify(compare);
      AsyncStorage.setItem('compare', jsonValue).then(() => {
        console.log('Updated compare stored successfully');
      }).catch(error => {
        console.error('Failed to store updated compare:', error);
      });
  
      console.log(`compare: ${JSON.stringify(compare)}`);
    }, [compare])
  
    useEffect(() => {
      const jsonValue = JSON.stringify(nextId);
      AsyncStorage.setItem('nextId', jsonValue).then(() => {
        console.log('Updated nextId stored successfully');
      }).catch(error => {
        console.error('Failed to store updated nextId:', error);
      });
  
      console.log(`nextId: ${nextId}`);
    }, [nextId])
  
    useEffect(() => {
        let forms = pitForms.concat(matchForms, data, compare);
        setTotalForms(forms);
        console.log(`totalForms: ${JSON.stringify(forms)}`);
    }, [pitForms, matchForms, data, compare]);
  
    const goToPitFormBuilder = (pitFormId) => {
      console.log(`Going to pit form with id of ${pitFormId}`);
    }
  
    const goToData = (dataId) => {
      console.log(`Going to pit form with id of ${dataId}`);
    }
  
    const goToCompare = (compareId) => {
      console.log(`Going to pit form with id of ${compareId}`);
    }
  
    const goToMatchFormPages = (matchFormId) => {
      console.log(`Going to match form page editor with id of ${matchFormId}`);
      navigation.navigate('MatchFormPages', {
        matchFormId: matchFormId,
      });
    };
  
    const closeAdder = () => {
      console.log('Closing adder');
      setAdderOpen(false);
      setTemporaryName('');
      setDropdownOpen(false);
      setType('Pit');
    }
  
    const openDropdown = () => {
      console.log('Opening dropdown');
      setDropdownOpen(true);
    }
  
    const create = () => {
      if (temporaryName.trim() !== '' && !isNameUsed(temporaryName)) {
        console.log(`Creating a new ${type} form with the name of ${temporaryName}`);
        setOptionsYs([]);
        let newForm = {id: nextId, name: temporaryName};
        if (type === 'Pit') {
          setPitForms([...pitForms, newForm]);
        } else if (type === 'Match') {
          setMatchForms([...matchForms, newForm]);
        } else if (type === 'Data') {
          setData([...data, newForm]);
        } else if (type === 'Compare') {
          setCompare([...compare, newForm]);
        }
        setNextId(prevNextId => prevNextId + 1);
        closeAdder();
      } else if (temporaryName.trim() === '') {
        alert('Name cannot be blank');
      } else {
        alert('Name is already used');
      }
    }
  
    const isNameUsed = (name) => {
      return pitForms.some(pitForm => pitForm.name === name) || 
        matchForms.some(matchForm => matchForm.name === name) || 
        data.some(datum => datum.name === name) || 
        compare.some(comp => comp.name === name);
    }
  
    const getSelectedOption = () => {
      if (pitForms.some(pitForm => pitForm.id === selectedOption)) {
        return pitForms.find(pitForm => pitForm.id === selectedOption);
      } else if (matchForms.some(matchForm => matchForm.id === selectedOption)) {
        return matchForms.find(matchForm => matchForm.id === selectedOption);
      } else if (data.some(datum => datum.id === selectedOption)) {
        return data.find(datum => datum.id === selectedOption);
      } else if (compare.some(comp => comp.id === selectedOption)) {
        return compare.find(comp => comp.id === selectedOption);
      }
    }
  
    const getSelectedOptionType = () => {
      if (pitForms.some(pitForm => pitForm.id === selectedOption)) {
        return 'Pit';
      } else if (matchForms.some(matchForm => matchForm.id === selectedOption)) {
        return 'Match';
      } else if (data.some(datum => datum.id === selectedOption)) {
        return 'Data';
      } else if (compare.some(comp => comp.id === selectedOption)) {
        return 'Compare';
      }
    }
  
    useEffect(() => {
      console.log(`temporaryName: ${temporaryName}`);
    }, [temporaryName])
  
    const optionSwitch = (option) => {
      switch (option) {
        case 'Rename':
          console.log('Renaming');
          setRenameVisible(true);
          setTemporaryName(getSelectedOption().name);
          break;
        case 'Preview':
          console.log('Previewing');
          if (getSelectedOptionType() === 'Match') {
            navigation.navigate('Preview', {
              matchFormId: selectedOption,
            });
          }
          break;
        case 'Delete':
          console.log('Deleting');
          setOptionsYs([]);
          if (getSelectedOptionType() === 'Pit') {
            setPitForms(pitForms.filter(pitForm => pitForm.id !== selectedOption));
            console.log(JSON.stringify(pitForms))
          } else if (getSelectedOptionType() === 'Match') {
            setMatchForms(matchForms.filter(matchForm => matchForm.id !== selectedOption));
          } else if (getSelectedOptionType() === 'Data') {
            setData(data.filter(datum => datum.id !== selectedOption));
          } else if (getSelectedOptionType() === 'Compare') {
            setCompare(compare.filter(comp => comp.id !== selectedOption));
          }
          break;
        default:
          break;
      }
    }
  
    const handleOptionSelect = (option) => {
      optionSwitch(option);
      setOptionsVisible(false);
    }
  
    const rename = () => {
      if (!isNameUsed(temporaryName) && temporaryName.trim() !== '') {
        if (getSelectedOptionType() === 'Pit') {
          setPitForms(pitForms.map(pitForm =>
            pitForm.id === selectedOption ? {...pitForm, name: temporaryName} : pitForm
          ));
        } else if (getSelectedOptionType() === 'Match') {
          setMatchForms(matchForms.map(matchForm =>
            matchForm.id === selectedOption ? {...matchForm, name: temporaryName} : matchForm
          ));
        } else if (getSelectedOptionType() === 'Data') {
          setData(data.map(datum =>
            datum.id === selectedOption ? {...datum, name: temporaryName} : datum
          ));
        } else if (getSelectedOptionType() === 'Compare') {
          setCompare(compare.map(comp =>
            comp.id === selectedOption ? {...comp, name: temporaryName} : comp
          ));
        }
        setTemporaryName('');
        setRenameVisible(false);
      } else if (temporaryName.trim() === '') {
        alert('Name cannot be blank');
      } else if (isNameUsed(temporaryName)){
        if (temporaryName !== getSelectedOption().name) {
          alert('Name is already used');
        } else {
          setTemporaryName('');
          setRenameVisible(false);
        }
      }
    }
  
    useEffect(() => {
      console.log(`optionYs: ${JSON.stringify(optionsYs)}`);
    }, [optionsYs])
  
    return (
      <View style={styles.container}>
        <BackgroundGradient />
        <Header title={Lang.forms.title} backButton={false} hamburgerButton={true} />

        {adderOpen && 
          <Modal transparent={true}>
            <View style={{flex: 1, backgroundColor: Colors.primary, opacity: 0.5}}/>
  
            {dropdownOpen && 
              <>
                <Pressable style={{height: height, width: width, backgroundColor: Colors.primary, opacity: 0.5}} onPress={() => {setDropdownOpen(false);}} />
  
                <View style={{position: 'absolute', top: height / 2 - 100, right: 10, width: 200, height: 240, backgroundColor: Colors.secondaryContainer, borderRadius: 10, zIndex: 11}}>
                  <Pressable onPress={() => {setType('Pit'); setDropdownOpen(false);}}>
                    <View style={{marginTop: 0, height: 65}}>
                      <MaterialIcons name='event-note' size={25} color={Colors.secondary} style={{position: 'absolute', top: 10, left: 10}}/>
                      
                      <Text style={[styles.text, {position: 'absolute', right: 0, top: 10, width: 150, fontSize: 24, color: Colors.secondary}]}>Pit</Text>
  
                      <View style={{position: 'absolute', right: 0, top: 35, width: 150}}>
                        <Text style={[styles.text, {fontSize: 12, color: Colors.secondary}]}>Form builder similar to Google Forms</Text>
                      </View>
                    </View>
                  </Pressable>
  
                  <Pressable onPress={() => {setType('Match'); setDropdownOpen(false);}}>
                    <View style={{marginTop: 0, height: 55}}>
                      <MaterialIcons name='smart-toy' size={25} color={Colors.secondary} style={{marginLeft: 10}}/>
  
                      <Text style={[styles.text, {position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: Colors.secondary}]}>Match</Text>
  
                      <View style={{position: 'absolute', right: 0, top: 25, width: 150}}>
                        <Text style={[styles.text, {fontSize: 12, color: Colors.secondary}]}>Drag and drop button builder for match data</Text>
                      </View>
                    </View>
                  </Pressable>
  
                  <Pressable onPress={() => {setType('Data'); setDropdownOpen(false);}}>
                    <View style={{marginTop: 0, height: 55}}>
                      <MaterialIcons name='bar-chart' size={25} color={Colors.secondary} style={{marginLeft: 10}}/>
  
                      <Text style={[styles.text, {position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: Colors.secondary}]}>Data</Text>
  
                      <View style={{position: 'absolute', right: 0, top: 25, width: 150}}>
                        <Text style={[styles.text, {fontSize: 12, color: Colors.secondary}]}>Data visualization for strategy mode</Text>
                      </View>
                    </View>
                  </Pressable>
  
                  <Pressable onPress={() => {setType('Compare'); setDropdownOpen(false);}}>
                    <View style={{marginTop: 0, height: 65}}>
                      <MaterialIcons name='compare-arrows' size={25} color={Colors.secondary} style={{marginLeft: 10}}/>
  
                      <Text style={[styles.text, {position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: Colors.secondary}]}>Compare</Text>
  
                      <View style={{position: 'absolute', right: 0, top: 25, width: 150}}>
                        <Text style={[styles.text, {fontSize: 12, color: Colors.secondary}]}>Build a viewer to compare teams data</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </>
            }
  
            <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 10}}>
              <View style={{marginLeft: 10, marginTop: 10, height: 50, width: Dimensions.get('window').width - 150, borderRadius: 10, borderWidth: 2, borderColor: Colors.secondaryContainer, justifyContent: 'center'}}>
                <TextInput
                  style={[styles.text, {color: Colors.secondaryContainer, fontSize: 24, marginLeft: 10}]}
                  autoFocus
                  defaultValue={temporaryName}
                  placeholder='Template Title'
                  placeholderTextColor={Colors.secondaryContainer}
                  onChangeText={text => {
                    setTemporaryName(text);
                  }}
                />
              </View>
  
              <Pressable style={{position: 'absolute', top: 10, right: 0, height: 50, width: 115, justifyContent: 'center'}} onPress={openDropdown}>
                <MaterialIcons name={type === 'Pit' ? 'event-note' : type === 'Match' ? 'smart-toy' : type === 'Data' ? 'bar-chart' : type === 'Compare' ? 'compare-arrows' : ''} size={25} color={Colors.secondaryContainer}/>
  
                <Text style={[styles.text, {position: 'absolute', top: (type === 'Pit' || type === 'Data') ? 6.25 : type === 'Match' ? 10.25 : 14, left: 30, fontSize: (type === 'Pit' || type === 'Data') ? 25 : type === 'Match' ? 20 : 13.5, color: Colors.secondaryContainer}]}>{type}</Text>
  
                <MaterialIcons name='arrow-drop-down' size={35} color={Colors.secondaryContainer} position='absolute' right={0}/>
              </Pressable>
  
              <Pressable style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={closeAdder}>
                <Text style={[styles.text, {fontSize: 20, color: Colors.secondaryContainer}]}>Cancel</Text>
              </Pressable>
  
              <Pressable style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={create}>
                <Text style={[styles.text, {fontSize: 20, color: Colors.secondaryContainer}]}>Create</Text>
              </Pressable>
            </View>
          </Modal>
        }
  
        {renameVisible && 
          <Modal transparent={true}>
            <View style={{flex: 1, backgroundColor: Colors.primary, opacity: 0.5}} />
  
            <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 10}}>
              <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colors.secondaryContainer, justifyContent: 'center'}}>
                <TextInput
                  style={[styles.text, {color: Colors.secondaryContainer, fontSize: 24, marginLeft: 10}]}
                  autoFocus
                  defaultValue={pitForms.find(pitForm => pitForm.id === selectedOption)?.name || matchForms.find(matchForm => matchForm.id === selectedOption)?.name || data.find(datum => datum.id === selectedOption)?.name || compare.find(comp => comp.id === selectedOption)?.name || ''}
                  placeholder='Template Title'
                  placeholderTextColor={Colors.secondaryContainer}
                  onChangeText={text => {
                    setTemporaryName(text);
                  }
                }
                />
              </View>
  
              <Pressable style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setRenameVisible(false); setTemporaryName('');}}>
                <Text style={[styles.text, {fontSize: 20, color: Colors.secondaryContainer}]}>Cancel</Text>
              </Pressable>
  
              <Pressable style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={rename}>
                <Text style={[styles.text, {fontSize: 20, color: Colors.secondaryContainer}]}>Submit</Text>
              </Pressable>
            </View>
          </Modal>
        }
  
        <View style={{top: height * .15, height: height * .8}}>
            <ScrollView vertical={true} onScroll={(event) => {
            scrollY.current = event.nativeEvent.contentOffset.y;
            console.log(scrollY.current);
            }}>
            <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>Pit</Text>
  
            {pitForms.map((pitForm, index) => (
              <View key={`${pitForm.id}_${totalForms.length}`} onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const y = layout.y;
                setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: pitForm.id, y: y}]);
                console.log(`y: ${y}`);
              }}>
                <View style={{flexDirection: 'row', height: 60, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 1, alignItems: 'center'}}>
                  <Pressable style={{flexGrow: 1}} onPress={() => goToPitFormBuilder(pitForm.id)}>
                    <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2, justifyContent: 'center'}}>
                      <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>{pitForm.name}</Text>
                    </View>
                  </Pressable>
                  
                  <Menu renderer={renderers.NotAnimatedContextMenu}>
                    <MenuTrigger onPress={() => setSelectedOption(pitForm.id)}>
                      <View style={{flexShrink: 1, height: '100%', marginRight: -0, zIndex: 9, justifyContent: 'center'}}>
                        <MaterialIcons name='more-vert' size={40} color={Colors.text}/>
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
  
            <Text style={[styles.text, {marginTop: 0, marginLeft: 10, fontSize: 34, color: Colors.text}]}>Match</Text>
  
            {matchForms.map((matchForm, index) => (
              <View key={`${matchForm.id}_${totalForms.length}`} onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const y = layout.y;
                setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: matchForm.id, y: y}]);
                console.log(`y: ${y}`);
              }}>
                <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 1}}>
                  <Pressable style={{flexGrow: 1}} onPress={() => goToMatchFormPages(matchForm.id)}>
                    <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                      <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>{matchForm.name}</Text>
                    </View>
                  </Pressable>
                  
                  <Menu renderer={renderers.NotAnimatedContextMenu}>
                    <MenuTrigger onPress={() => setSelectedOption(matchForm.id)}>
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
  
            <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>Data</Text>
  
            {data.map((datum, index) => (
              <View key={`${datum.id}_${totalForms.length}`} onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const y = layout.y;
                setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: datum.id, y: y}]);
                console.log(`y: ${y}`);
              }}>
                <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 1}}>
                  <Pressable style={{flexGrow: 1}} onPress={() => goToData(datum.id)}>
                    <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                      <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>{datum.name}</Text>
                    </View>
                  </Pressable>
                  
                  <Menu renderer={renderers.NotAnimatedContextMenu}>
                    <MenuTrigger onPress={() => setSelectedOption(datum.id)}>
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
  
            <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>Compare</Text>
  
            {compare.map((comp, index) => (
              <View key={`${comp.id}_${totalForms.length}`} onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const y = layout.y;
                setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: comp.id, y: y}]);
                console.log(`y: ${y}`);
              }}>
                <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: Colors.secondary, borderRadius: 10, zIndex: 1}}>
                  <Pressable style={{flexGrow: 1}} onPress={() => goToCompare(comp.id)}>
                    <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                      <Text style={[styles.text, {marginLeft: 10, fontSize: 34, color: Colors.text}]}>{comp.name}</Text>
                    </View>
                  </Pressable>
                  
                  <Menu renderer={renderers.NotAnimatedContextMenu}>
                    <MenuTrigger onPress={() => setSelectedOption(comp.id)}>
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
  
            {/*optionsVisible && 
              <Modal transparent={true}>
                <Pressable onPress={() => {setOptionsVisible(false);}} style={{flex: 1}}/>
  
                <View style={{position: 'absolute', top: selectedOptionY + 37.5, right: 10, width: 110, height: 80, backgroundColor: Colors.secondaryContainer, borderRadius: 10, zIndex: 10}}>
                  {options.map((option, index) => (
                    <Pressable key={index} onPress={() => {handleOptionSelect(option.name);}}>
                      <View style={{height: 25, marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name={option.name === 'Rename' ? 'edit' : option.name === 'Preview' ? 'remove-red-eye' : 'delete'} size={17} color={option.name === 'Delete' ? Colors.redAlliance : Colors.secondary} style={{marginLeft: 5}}/>
                        
                        <Text style={{marginLeft: 10, fontSize: 17, color: (option.name === 'Delete' ? Colors.redAlliance : Colors.secondary)}}>{option.name}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </Modal>
                  */}
            </ScrollView>
        </View>
  
        <Pressable onPress={() => {console.log('Opening adder'); setAdderOpen(true);}} style={{width: width * .15, height: width * .15, backgroundColor: Colors.accent, position: 'absolute', bottom: width * .1, right: width * .1, borderRadius: width * .075}}>
            <MaterialIcons name='add' size={width * .15} color={Colors.text}/>
        </Pressable>
      </View>
    )
}