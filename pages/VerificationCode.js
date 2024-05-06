import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { CodeField, Cursor, getCellOnLayoutHandler, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useEffect, useState } from 'react';

export default function VerificationCode({route, navigation}) {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const [code, setCode] = useState('');
    const [correctCode, setCorrectCode] = useState('123456');
    const [email, setEmail] = useState('27tfisch@mypanthers.org');
    const [wrongCode, setWrongCode] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const [timeUntilResend, setTimeUntilResend] = useState(30);

    //No clue what this props or getCellOnLayoutHandler does, but don't mess with it!!
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        code,
        setCode,
    });

    const styles = {
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 18
        },
        subText: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 15
        },
        resendContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            top: Dimensions.get('window').height / 2 + 10, //the 40 is the cell height
        },
        emailSentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            top: 10
        },
        codeFieldRoot: {
            top: Dimensions.get('window').height / 2,
            width: '80%',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        cell: {
            width: Dimensions.get('window').width / 6 * .8 - 5, //Divides width by 6 and then does 80% of that due to codeFieldRoot being 80% of scrren. Then adds 5 for padding
            height: Dimensions.get('window').width / 6 * .8 - 5,
            lineHeight: Dimensions.get('window').width / 6 * .8 - 7,
            fontSize: Dimensions.get('window').width / 6 * .8 - 20,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: Colors.text,
            textAlign: 'center',
            color: Colors.text,
        },
        /*focusCell: {
            borderColor: Colors.accent,
        },*/
        errorCell: {
            borderColor: Colors.error,
        },
        correctCell: {
            borderColor: Colors.completedGreen,
        }
    };

    useEffect(() => {
        if (code.length == 6) {
            if (code == correctCode) {
                setWrongCode(false);
                navigation.navigate('Start');
            } else {
                setWrongCode(true);
            }
        } else {
            setWrongCode(false);
        }
    }, [code]);

    useEffect(() => {
        if (emailSent) {
            setTimeout(() => {
                setTimeUntilResend(timeUntilResend - 1);
            }, 1000);
        }
    }, [timeUntilResend, emailSent])

    useEffect(() => {
        if (emailSent) {
            setTimeout(() => {
                setEmailSent(false);
            }, 32000);
        }
    }, [emailSent])

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.verification.title} navigation={navigation} backButton={false}>
                <Text style={[styles.subText, {top: 10}]}>{`Email sent to: ${email}`}</Text>
            </Header>

            <Text style={[styles.text, {top: Dimensions.get('window').height / 2}]}>{Lang.verification.enter_code}</Text>

            <CodeField
                value={code}
                onChangeText={text => {
                    let newText = text.replace(/\D/g, ''); //Replaces non-numerical values with nothing.
                    setCode(newText);
                }}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, /*isFocused && styles.focusCell,*/ wrongCode && styles.errorCell, !wrongCode && code.length == 6 && styles.correctCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />

            <Pressable style={styles.resendContainer} onPress={() => {
                if (!emailSent) {
                    console.log('resending email!');
                    setEmailSent(true);
                    setTimeUntilResend(30);
                }
            }}>
                <Text style={[styles.subText, !emailSent && {textDecorationLine: 'underline'}]}>{Lang.verification.resend}</Text>
            </Pressable>

            {emailSent && (
                <View style={styles.emailSentContainer}>
                    <Text style={styles.text}>{`${Lang.verification.email_sent} ${timeUntilResend}s`}</Text>
                </View>
            )}
        </View>
    );
}