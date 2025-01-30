const fs = require('fs');
const axios = require('axios');
const ProgressBar = require('progress');
require('dotenv').config();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

let totalStrings = 0;
let translatedCount = 0;
let progressBar;

function countStrings(obj, path = '') {
    let count = 0;
    for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            count += countStrings(value, currentPath);
        } else if (typeof value === 'string') {
            if (!(key === 'title' && value === 'Rēkon')) {
                count++;
            }
        }
    }
    return count;
}

async function translateText(text, targetLang, currentPath) {
    try {
        progressBar.tick({
            path: currentPath.length > 30 
                ? '...' + currentPath.slice(-30) 
                : currentPath
        });
        
        const response = await axios.post(DEEPL_API_URL, 
            {
                text: [text],
                target_lang: targetLang
            },
            {
                headers: {
                    'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        translatedCount++;
        return response.data.translations[0].text;
    } catch (error) {
        console.error('Translation error:', error.message);
        return text;
    }
}

async function translateJson(jsonObj, targetLang, path = '') {
    const translatedObj = {};
    
    for (const [key, value] of Object.entries(jsonObj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'object' && value !== null) {
            translatedObj[key] = await translateJson(value, targetLang, currentPath);
        } else if (typeof value === 'string') {
            if (key === 'title' && value === 'Rēkon') {
                translatedObj[key] = value;
            } else {
                translatedObj[key] = await translateText(value, targetLang, currentPath);
            }
        } else {
            translatedObj[key] = value;
        }
    }
    
    return translatedObj;
}

async function main() {
    try {
        const [,, sourcePath, targetLang] = process.argv;
        if (!sourcePath || !targetLang) {
            console.error('Usage: node translateTool.js <source-json-path> <target-language>');
            process.exit(1);
        }

        const sourceJson = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        
        totalStrings = countStrings(sourceJson);
        
        progressBar = new ProgressBar(
            'Translating [:bar] :current/:total strings :percent | :path', 
            {
                complete: '=',
                incomplete: ' ',
                width: 40,
                total: totalStrings
            }
        );

        const translatedJson = await translateJson(sourceJson, targetLang);
        
        const outputPath = sourcePath.replace('EN.json', targetLang + '.json');
        
        fs.writeFileSync(
            outputPath, 
            JSON.stringify(translatedJson, null, 4),
            'utf8'
        );
        
        console.log(`\nTranslation completed! Output saved to: ${outputPath}`);
        
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
