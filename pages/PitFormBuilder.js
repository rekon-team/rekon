import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, Text, Modal, View, StyleSheet, Dimensions, TextInput } from 'react-native';

import TextSection from '../components/SurveyComponents/TextSection';
import NumberSection from '../components/SurveyComponents/NumberSection';
import MultipleChoiceSection from '../components/SurveyComponents/MultipleChoiceSection';
import CheckboxSection from '../components/SurveyComponents/CheckboxSection';
import SliderSection from '../components/SurveyComponents/SliderSection';
import PictureSection from '../components/SurveyComponents/PictureSection';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColors } from '../components/Colors';
import { useLang } from '../components/Lang';
import BackgroundGradient from '../components/BackgroundGradient';
import Header from '../components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';


export default function PitFormBuilder({ navigation, route }){
  const { Colors } = useColors();
  const { Lang } = useLang();

  const { pitFormId } = route.params;

  const [forms, setForms] = useState([]);
  const [sections, setSections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  let indent = Dimensions.get('window').width * .1;
  let verticalIndent = Dimensions.get('window').height * .1;
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const sectionsString = await AsyncStorage.getItem(`sections_${pitFormId}`);
        const parsedSections = JSON.parse(sectionsString);
        const sectionsArray = parsedSections ? parsedSections : [];
        setSections(sectionsArray);

        const formsString = await AsyncStorage.getItem('pitForms');
        const parsedForms = JSON.parse(formsString);
        const formsArray = parsedForms ? parsedForms : [];
        setForms(formsArray);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveSections = async () => {
      try {
        const sectionsString = JSON.stringify(sections);
        await AsyncStorage.setItem(`sections_${pitFormId}`, sectionsString);
      } catch (error) {
        console.error(error);
      }
    };
    saveSections();
    console.log(sections);
  }, [sections]);

  const addSection = (sectionType, sectionOptions = [], minimum = 0, maximum = 0) => {
    setSections([...sections, { type: sectionType, options: sectionOptions, question: '', minimum: minimum, maximum: maximum }]);
    setModalVisible(false);
  };

  const deleteSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const updateOptions = (index, newOptions) => {
    const newSections = [...sections];
    newSections[index].options = newOptions;
    setSections(newSections);
  };

  const validateSections = () => {
    return sections.every(section => {
      if (!section.question || section.question.trim() === '') {
        console.log('1')
        return false;
      }

      if (section.type === 'slider') {
        if (section.minimum !== undefined && section.maximum !== undefined) {
          if (isNaN(section.minimum) || isNaN(section.maximum)) {
            console.log('2')
            return false;
          }
        } else {
          console.log('3')
          return false;
        }
      }

      return true;
    });
  };

  const navigateToPreview = () => {
    if (validateSections()) {
      navigation.navigate('Preview Form', { sections });
    } else {
      alert('Please fill all in all questions and required fields before previewing.');
    }
  };

  //logs the question types and its properties in the console
  /*sections.forEach((section, index) => {
    console.log('   New Update')
    console.log(`Section ${index + 1}:`);
    console.log(`Type: ${section.type}`);
    console.log(`Question: ${section.question}`);

    if (section.minimum) {
      console.log(`Minimum: ${section.minimum}`)
    }

    if (section.maximum) {
      console.log(`Maximum: ${section.maximum}`)
    }

    if (section.options && section.options.length > 0) {
      console.log('Options:');
      section.options.forEach((option, i) => {
        console.log(`  Option ${i + 1}: ${option}`);
      });
    }
  });*/
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary
    },
    sections: {
      //borderWidth: 1,
      backgroundColor: Colors.secondaryBright,
      margin: 10,
      borderRadius: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
      backgroundColor: Colors.secondary,
      width: indent * 8,
      height: verticalIndent * 5,
      borderRadius: 10,
      alignItems: "center",
    },
    addSectionPressable: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.accent,
      bottom: verticalIndent / 4,
      width: indent * 8,
      height: verticalIndent * .75,
      left: indent,
      borderRadius: 10,
      position: 'absolute'
    },
    modalPressables: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      width: '90%',
      height: verticalIndent / 2,
      marginTop: verticalIndent / 7,
      borderColor: Colors.text
    },
  });
  
  return(
    <View style={styles.container}>
      <BackgroundGradient />
      <Header title={forms.find(form => form.id == pitFormId) ? forms.find(form => form.id == pitFormId).name : 'Loading'} backButton={true} navigation={navigation} previewButton={true} matchOrPit='Pit' sections={sections} singleLine={true} />

      <View style={{height: Dimensions.get('window').height * .9 - getStatusBarHeight() - 60, width: Dimensions.get('window').width, position: 'absolute', top: getStatusBarHeight() + 60}}>
        <ScrollView>

          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable style={styles.modalPressables} onPress={() => addSection('text')}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color: Colors.text, fontSize: verticalIndent * .3}}>Add Text Section</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.modalPressables} onPress={() => addSection('number')}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color: Colors.text, fontSize: verticalIndent * .3}}>Add Number Section</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.modalPressables} onPress={() => addSection('multiple-choice', ['Option 1', 'Option 2'])}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color: Colors.text, fontSize: verticalIndent * .3}}>Add Multiple Choice Section</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.modalPressables} onPress={() => addSection('checkbox', ['Option 1', 'Option 2'])}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color: Colors.text, fontSize: verticalIndent * .3}}>Add Checkbox Section</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.modalPressables} onPress={() => addSection('slider')}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color: Colors.text, fontSize: verticalIndent * .3}}>Add Slider Section</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.modalPressables} onPress={() => addSection('picture')}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color: Colors.text, fontSize: verticalIndent * .3}}>Add Picture Section</Text>
                  </View>
                </Pressable>
                <Pressable style={[styles.modalPressables, {borderColor: Colors.redAlliance}]} onPress={() => setModalVisible(false)}>
                  <Text style={{color: Colors.redAlliance, fontSize: verticalIndent * .3}}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {sections.map((section, index) => (
            <View key={index} style={styles.sections}>
              {section.type === 'text' && (
                <TextSection
                  question={section.question}
                  onChangeQuestion={(textQuestion) => {
                    //console.log('Text Question: ', textQuestion);
                    const newSections = [...sections];
                    newSections[index].question = textQuestion;
                    setSections(newSections);
                  }}
                  onDelete={() => deleteSection(index)}
                  />
                  )}
              {section.type === 'number' && (
                <NumberSection
                  question={section.question}
                  onChangeQuestion={(numberQuestion) => {
                    //console.log('Number Question: ', numberQuestion)
                    const newSections = [...sections];
                    newSections[index].question = numberQuestion;
                    setSections(newSections);
                  }}
                  onDelete={() => deleteSection(index)}
                />
              )}
              {section.type === 'multiple-choice' && (
                <MultipleChoiceSection
                  question={section.question}
                  onChangeQuestion={(multipleChoiceQuestion) => {
                    const newSections = [...sections];
                    newSections[index].question = multipleChoiceQuestion;
                    setSections(newSections);
                  }}
                  options={section.options}
                  onUpdateOptions={(newOptions) => updateOptions(index, newOptions)}
                  onDelete={() => deleteSection(index)}
                />
                )}
              {section.type === 'checkbox' && (
                <CheckboxSection
                question={section.question}
                onChangeQuestion={(checkboxQuestion) => {
                  const newSections = [...sections];
                  newSections[index].question = checkboxQuestion;
                  setSections(newSections);
                }}
                  options={section.options}
                  onUpdateOptions={(newOptions) => updateOptions(index, newOptions)}
                  onDelete={() => deleteSection(index)}
                />
              )}
              {section.type === 'slider' && (
                <SliderSection
                  question={section.question}
                  minimum={section.minimum}
                  maximum={section.maximum}
                  onChangeQuestion={(sliderQuestion) => {
                    const newSections = [...sections];
                    newSections[index].question = sliderQuestion;
                    setSections(newSections);
                  }}
                  onChangeMin={(minimum) => {
                    const newSections = [...sections];
                    newSections[index].minimum = minimum;
                    setSections(newSections);
                  }}
                  onChangeMax={(maximum) => {
                    const newSections = [...sections];
                    newSections[index].maximum = maximum;
                    setSections(newSections);
                  }}
                  onDelete={() => deleteSection(index)}
                />
              )}
              {section.type === 'picture' && (
                <PictureSection
                  question={section.question}
                  onChangeQuestion={(pictureQuestion) => {
                    const newSections = [...sections];
                    newSections[index].question = pictureQuestion;
                    setSections(newSections);
                  }}
                  onDelete={() => deleteSection(index)}
                />
              )}
              
            </View>
          ))}
        </ScrollView>
      </View>

      <Pressable style={styles.addSectionPressable} onPress={() => setModalVisible(true)}>
        <Text style={{color: Colors.onAccent, fontSize: 20}}>Add New Section</Text>
      </Pressable>
    </View>
  ); 
}