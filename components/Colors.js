import React, { createContext, useContext, useEffect, useState } from 'react';
import tinycolor from "tinycolor2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ColorContext = createContext();

export const useColors = () => useContext(ColorContext);

//Subtraction table
/*let hslDiffTable = {
    secondaryContainer: [0, -20, 10],
    secondary: [-1, -33, -38],
    tabSelected: [0, -32, -45],
    border: [0, -20, 10],
    graphPrimary: [0, -20, 10],
    secondaryText: [0, -20, 10],
    accent: [0, 0, 0],
    secondaryDim: [0, -20, 10, -0.5],
    secondaryBright: [0, -32, -23]
}*/

//Multiplication table
let hslDiffTable = {
    secondaryContainer: [1, 0.666, 1.172],
    border: [1, 0.666, 1.172],
    graphPrimary: [1, 0.666, 1.172],
    secondaryText: [1, 0.666, 1.172],
    secondaryContainerDim: [1, 0.666, 1.172, -0.5],
    secondary: [0.99, 0.45, 0.34],
    secondaryDim: [0.99, 0.45, 0.34, -0.5],
    tabSelected: [1, 0.466, 0.224],
    accent: [1, 1, 1],
    secondaryBright: [0.99, 0.46, 0.60]
}

const defaultColors = {
    primary: '#000000',
    errorBackground: '#c73737',
    secondary: '#312541',
    secondaryDim: '#3125417c',
    secondaryBright: '#574174',
    secondaryConatinerDim: '#aa8dce7c',
    secondaryContainer: '#AA8DCE',
    accent: '#3E4758',  
    imageHeader: '#1a1b1ece',
    text: '#e3e2e6',
    secondaryText: '#AA8DCE',
    textDim: '#8E9099',
    header: '#BDC7DC',
    border: '#AA8DCE',
    tabIcons: '#e3e2e6',
    onAccent: '#e3e2e6',
    tabSelected: '#1F1729',
    graphPrimary: '#AA8DCE',
    accent: '#8D53D4',
    error: '#F8002A'
}

export const ColorProvider = ({ children }) => {
    const [Colors, setColors] = useState(defaultColors);

    // Load colors from AsyncStorage to make them persistent across app restarts
    async function loadColors() {
        try {
            const storedColors = await AsyncStorage.getItem('colors');
            const loadedColors = storedColors ? JSON.parse(storedColors) : defaultColors;
            setColors(loadedColors);
        } catch (error) {
            console.error('Error loading colors from AsyncStorage:', error);
        }
    }

    // Loads colors from AsyncStorage on app start and on state changes
    useEffect(() => {
        loadColors();
    }, []);

    // This really complex function calculates the new colors based on the difference table
    // It uses HSL color for the calculations, and multiplies the accent HSL values by the difference values from the default colors
    // This ensures new colors share the same relationship to each other as the default colors
    function calcDiffFromTable(accent) {  
        let newColors = {};
        // This for loop seems intimidating, but it's just multiplying the accent HSL by the different diff values in the table
        for (let color in hslDiffTable) {
            let diff = hslDiffTable[color];
            let accentHSL = tinycolor(accent).toHsl();
            accentHSL.h *= diff[0];
            accentHSL.s *= diff[1];
            accentHSL.l *= diff[2];
            if (diff.length > 3) {
                accentHSL.a += diff[3];
            }
            // Ensure the HSL values stay within the valid range
            accentHSL.h = Math.max(0, Math.min(360, accentHSL.h));
            accentHSL.s = Math.max(0, Math.min(1, accentHSL.s));
            accentHSL.l = Math.max(0, Math.min(1, accentHSL.l));
            if (diff.length > 3) {
                accentHSL.a = Math.max(0, Math.min(1, accentHSL.a));
            }
            // Convert the new HSL values back to hex with the same alpha value (if applicable)
            // Don't worry, I have no clue how the alpha value is calculated either, ChatGPT wrote that part.
            newColors[color] = tinycolor(accentHSL).toHexString() + (diff.length > 3 ? Math.round(accentHSL.a * 255).toString(16) : '');
        }
        
        // Checks if the contrast sucks and fixes it if it does.
        if (tinycolor.readability(accent, defaultColors.onAccent) < 4.5) {
            let accentHSL = tinycolor(accent).toHsl();

            // generate array of potential colors
            // this is a very unoptimized way to do this, but it shouldn't need to be run often
            let possibleColors = [];

            for (let l = 0; l <= 100; l += 5) {
                for (let s = 0; s <= 100; s += 5) {
                    possibleColors.push(tinycolor({ h: accentHSL.h, s, l }).toHexString());
                }
            }

            // filter out colors that don't meet the minimum contrast ratio
            possibleColors = possibleColors.filter(color => tinycolor.readability(accent, color) >= 4.5);

            // find the most readable color out of the list of possible permutations of grayscale colors
            newColors.onAccent = tinycolor.mostReadable(accent, possibleColors).toHexString();
        } else {
            // if the contrast is already good, just use the default color
            newColors.onAccent = defaultColors.onAccent;
        }
        
        return newColors;
    }

    /* This function updates the color list. Because the list is a state, it will update the colors in the app instantly.
    This is a separate function because I would like to add another preview set so the color picker page can have a live preview
    without updating the entire state of the app*/
    function updateColorsFromCalc(newColors) {
        setColors(prevColors => {
            const updatedColors = { ...prevColors };
            for (const color in newColors) {
                if (updatedColors[color] !== newColors[color]) {
                    updatedColors[color] = newColors[color];
                }
            }
            AsyncStorage.setItem('colors', JSON.stringify(updatedColors));
            return updatedColors;
        });
    }

    // Resets the colors to their defaults, in case the user doesn't like their theme ;)
    function resetColorsToDefault() {
        setColors(defaultColors);
        AsyncStorage.setItem('colors', JSON.stringify(defaultColors));
    }
    
    // More weird provider stuff, I'm not sure what this does, but it does it!
    return (
        <ColorContext.Provider value={{ Colors, calcDiffFromTable, updateColorsFromCalc, resetColorsToDefault }}>
          {children}
        </ColorContext.Provider>
    );
}