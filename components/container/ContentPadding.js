import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

export default function Paddings(props) {
    const { width, height, } = Dimensions.get('window');
    const {style={}}=props
    return (
        <View style={[
            props.hasPadding ?
                width > 380 ?
                    styles.normalWindow
                    : styles.mediumWindow
                : null,style]
        }>
            {props.children}
        </View>
    );
}
const styles = StyleSheet.create({
    normalWindow: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 50,
        flex: 1
    },
    mediumWindow: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        flex: 1
    },
})
