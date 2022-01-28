import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CheckBox(props) {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.onChange(!props.value)}>
                <View style={[styles.checkBoxContainer, props.value ? styles.checkBoxContainerActive : null]}>

                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    checkBoxContainer: {
        borderWidth: 3,
        borderColor: '#707070',
        width: 20,
        height: 20
    },
    checkBoxContainerActive: {
        backgroundColor: '#FF7465',
        borderColor: '#FF7465'
    }
})