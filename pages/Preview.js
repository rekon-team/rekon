import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useColors } from "../components/Colors";
import { useLang } from "../components/Lang";
import BackgroundGradient from "../components/BackgroundGradient";
import Header from "../components/Header";

export default function Preview({ route, navigation }) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    const { matchFormId } = route.params;
    const { pageId } = route.params;
  
    const [defaultPage, setDefaultPage] = useState(pageId);
    const [boxes, setBoxes] = useState([]);
    const [pages, setPages] = useState([]);
    const gridSizeForSpacing = Dimensions.get("window").width / 8;
  
    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem(`pages_${matchFormId}`).then(jsonValue => {
          const pages = jsonValue != null ? JSON.parse(jsonValue) : [];
          setPages(pages); // Update the state with the fetched pages array
  
          AsyncStorage.getItem(`defaultPage_${pageId}`).then(jsonValue => {
            if (pageId != null) {
              setDefaultPage(pageId);
            } else {
              const defaultPage = jsonValue != null ? JSON.parse(jsonValue) : pages[0]?.id || 0;
              setDefaultPage(defaultPage);
            }
  
            AsyncStorage.getItem(`boxes_${defaultPage}_${matchFormId}`).then(jsonValue => {
              const boxes = jsonValue != null ? JSON.parse(jsonValue) : [];
              setBoxes(boxes); // Update the state with the fetched boxes array
            }).catch(error => {
              console.error('Failed to fetch boxes:', error);
            });
          }).catch(error => {
            console.error('Failed to fetch default page from storage:', error);
          });
        }).catch(error => {
          console.error('Failed to fetch pages:', error);
        });
  
      }, [defaultPage])
    );
  
    useEffect(() => {
      console.log(`defaultPage: ${defaultPage}`);
    }, [defaultPage])
  
    const goToPage = (box) => {
      return Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
          if (box.page !== '') {
            const page = pages.find(page => page.id === box.page);
            if (page) {
              AsyncStorage.getItem(`boxes_${page.id}_${matchFormId}`).then(jsonValue => {
                const boxes = jsonValue != null ? JSON.parse(jsonValue) : [];
                setBoxes(boxes); // Update the state with the fetched boxes array
              }).catch(error => {
                console.error('Failed to fetch boxes:', error);
              });
            } else {
              alert('The original page that it has been mapped to has been deleted!');
            }
          }
        }).runOnJS(true);
    }
  
    useEffect(() => {
      console.log(`boxes: ${JSON.stringify(boxes)}`)
    }, [boxes])
  
    return(
      <View style={{flex: 1, backgroundColor: Colors.primary, width: '100%', height: '100%'}}>
        <BackgroundGradient />
        <Header title={Lang.preview.title} backButton={true} navigation={navigation} />

        {boxes.map((box, index) => (
          <GestureDetector key={box.id} gesture={goToPage(box)}>
            <View style={{
              height: box.height - 10,
              width: box.width - 10,
              left: box.x + gridSizeForSpacing / 5,
              top: box.y + gridSizeForSpacing / 5,
              backgroundColor: box.color,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: box.zIndex,
              borderRadius: 10
              }}>
              <View style={{overflow: 'hidden', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                {box.icon.length != 0 && <MaterialIcons name={box.icon} size={isNaN(parseInt(box.iconSize)) ? 0 : parseInt(box.iconSize)} color={box.iconColor} />}
                {box.text.length != 0 && <Text style={{fontSize: isNaN(parseInt(box.fontSize)) ? 0 : parseInt(box.fontSize), color: box.fontColor, fontWeight: box.bold, fontStyle: box.italic, }}>{box.text}</Text>}
              </View>
            </View>
          </GestureDetector>
        ))}
      </View>
    )
}