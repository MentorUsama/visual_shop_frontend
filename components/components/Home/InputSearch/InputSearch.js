import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MyButton from '../../Button/MyButton'
import File from '../../../../assets/icons/file'
import Camera from '../../../../assets/icons/camera'

export default function InputSearch(props) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                style={styles.textIputStyle}
                placeholderTextColor="#EEEEEE"
                placeholder=' Search product'
            />
            <View style={styles.iconContainer}>
                <File style={styles.iconStyle} onPress={true} />
                <Camera style={styles.iconStyle} onPress={true} />
            </View>
            <MyButton
                title="Search"
                style={styles.myButton}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    textIputStyle: {
        height: 40,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        color: 'black',
        flex: 1,
        paddingRight: 5
    },
    myButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        height: 40
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 40,
        alignItems: 'center',
        paddingRight: 5
    },
    iconStyle: {
        borderLeftColor: '#EEEEEE',
        borderLeftWidth: 3,
        paddingLeft: 8,
        paddingRight: 5,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    }
})