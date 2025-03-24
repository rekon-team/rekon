import React from 'react';

import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';

import TextPreview from '../components/PreviewComponents/TextPreview';
import NumberPreview from '../components/PreviewComponents/NumberPreview';
import MultipleChoicePreview from '../components/PreviewComponents/MultipleChoicePreview';
import CheckboxPreview from '../components/PreviewComponents/CheckboxPreview';
import SliderPreview from '../components/PreviewComponents/SliderPreview';
import PicturePreview from '../components/PreviewComponents/PicturePreview';
import { useColors } from '../components/Colors';
import { useLang } from '../components/Lang';
import BackgroundGradient from '../components/BackgroundGradient';
import Header from '../components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function PreviewForm({ route, navigation }) {
  const { Colors } = useColors();
  const { Lang } = useLang();

  const sections = route.params?.sections;

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
  });

  return(
      <View style={styles.container}>
        <BackgroundGradient />
        <Header title={Lang.preview.title} backButton={true} navigation={navigation} />
        <View style={{ width: '100%', height: Dimensions.get('window').height - getStatusBarHeight() - 60, top: getStatusBarHeight() + 60 }}>
          <ScrollView>
            {sections.map((section, index) => (
              <View key={index} style={styles.sections}>
                {section.type === 'text' && (
                  <TextPreview
                    question={section.question}
                    onChangeQuestion={(textQuestion) => {
                      //console.log('Text Question: ', textQuestion);
                      const newSections = [...sections];
                      newSections[index].question = textQuestion;
                    }}
                    onDelete={() => deleteSection(index)}
                  />
                    )}
                {section.type === 'number' && (
                  <NumberPreview
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
                  <MultipleChoicePreview
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
                  <CheckboxPreview
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
                  <SliderPreview
                    question={section.question}
                    minimum={section.minimum}
                    maximum={section.maximum}
                  />
                )}
                {section.type === 'picture' && (
                  <PicturePreview
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
      </View>

  );
}