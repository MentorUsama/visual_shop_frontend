import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Cross from '../../../../assets/icons/cross'

export default function SearchedImage(props) {
    return (
        <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row' }}>
            <View>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: props.pickedImage }}
                />
                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.clearImageSearch()} style={styles.iconContainer}>
                        <View style={styles.iconBackground}>
                            <Cross width={10.414} height={10.414} strokeWidth={2} fill="#FFFFFF" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    iconContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 2,
        marginTop: 2
    },
    iconBackground: {
        backgroundColor: '#FF7465',
        borderRadius: 20,
        width: 22,
        height: 22,
        paddingLeft: 6,
        paddingTop: 6
    }
});