import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function Tag(props) {
    const { id = -1, isStatic = false, containerStyle = {}, textStyle = {},numberOfLines=10,isDefaulSelected=false } = props
    const [selected, setSelected] = useState(isDefaulSelected);
    const tagsHandler = () => {
        if (isStatic)
            return
        const isFalse = selected;
        setSelected(!isFalse)
        props.onChange(!isFalse, id)
    }
    return (
        <TouchableOpacity
            onPress={tagsHandler}
            activeOpacity={isStatic ? 1 : 0.5}
            style={[styles.tagContainer, selected ? styles.tagContainerActive : null, containerStyle]}>
            <Text numberOfLines={numberOfLines} style={[styles.text, selected ? styles.textActive : null, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    tagContainer: {
        borderColor: '#EBEBEB',
        borderWidth: 2,
        padding: 15,
        borderRadius: 50,
        marginBottom: 10,
        marginRight: 10
    },
    tagContainerActive: {
        backgroundColor: '#FF7465',
        borderWidth: 0
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#9B9B9B'
    },
    textActive: {
        color: '#FFFFFF'
    }
})