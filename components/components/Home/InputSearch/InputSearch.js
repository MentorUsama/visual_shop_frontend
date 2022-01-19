import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MyButton from '../../Button/MyButton'
import File from '../../../../assets/icons/file'
import Camera from '../../../../assets/icons/camera'

export default function InputSearch(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={{flex:1}}>
                <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={styles.textIputStyle}
                    placeholderTextColor="#EEEEEE"
                    placeholder=' Search product'
                />
            </View>
            <View style={styles.iconContainer}>
                <File onPress={props.pickImage} style={styles.iconStyle} />
                <Camera onPress={props.takePicture} style={styles.iconStyle} />
            </View>
            <MyButton
                title="Search"
                style={styles.myButton}
                isDisabled={props.value == ""}
                onPress={props.searchByTextHandler}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 40,
        marginBottom:10
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