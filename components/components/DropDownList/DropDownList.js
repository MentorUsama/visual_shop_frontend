import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Collapsible from 'react-native-collapsible';
// slideInDown
export default function DropDownList(props) {
    var isCategorySelected = props.data.id == props.selected[0]
    const setCategoryHandler = () => {
        if (isCategorySelected)
            props.setSelected([-1, -1])
        else
            props.setSelected([props.data.id, -1])
    }
    return (
        <View key={props.data.id}>
            <TouchableOpacity onPress={setCategoryHandler} activeOpacity={0.7}><Text style={[styles.categoryTextStyle, isCategorySelected ? styles.categoryTextStyleActive : null]}>{props.data.name}</Text></TouchableOpacity>
            <Collapsible collapsed={!isCategorySelected}>
                {
                    props.data.Subcategories.map((subcategory) => {
                        return <TouchableOpacity
                            onPress={() => props.setSelected([props.data.id, subcategory.id])}
                            activeOpacity={0.7} style={styles.subCategoryStyle}
                            key={subcategory.id}>
                            <Text style={[styles.subCategoryTextStyle, isCategorySelected && props.selected[1] == subcategory.id ? styles.subCategoryTextStyleActive : null]}>
                                {subcategory.name}
                            </Text>
                        </TouchableOpacity>
                    })
                }
            </Collapsible>
        </View>
    )
}
const styles = StyleSheet.create({
    categoryTextStyle: {
        color: '#000000',
        fontSize: 14,
        paddingBottom: 3,
        paddingTop: 3
    },
    categoryTextStyleActive: {
        color: '#FF7465'
    },
    subCategoryStyle: {
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3
    },
    subCategoryTextStyle: {
        color: '#000000',
        fontSize: 12
    },
    subCategoryTextStyleActive: {
        color: '#FF7465'
    }
})