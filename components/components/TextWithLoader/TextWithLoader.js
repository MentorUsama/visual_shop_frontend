import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'

export default function TextWithLoader(props) {
    const { shouldLoad = false, shouldShow,title="See More" } = props
    return (
        <View style={{ paddingBottom: '10%' }}>
            {
                shouldLoad ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    shouldShow ?
                        <TouchableOpacity onPress={props.onPress}><Text style={styles.seeMore}>{title}</Text></TouchableOpacity>
                        : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    seeMore: {
        color: '#FF7465',
        textAlign: 'center'
    }
})