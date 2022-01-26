import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../../Button/MyButton';

export default function QuantitySelector(props) {
    const {cotnainerStyle=null}=props
    return (
        <View>
            <View style={[styles.container,cotnainerStyle]}>
                <Button
                    onPress={() => props.onPress(props.value - 1)}
                    isDisabled={props.value == 1}
                    style={{ flex: 0.3, height: '100%', borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                    textStyle={{ fontSize: 20 }}
                    title="-"
                />
                <View style={styles.textContainer}><Text style={{ textAlign: 'center', fontSize: 20, color: '#FF7465' }}>{props.value}</Text></View>
                <Button
                    onPress={() => props.onPress(props.value + 1)}
                    isDisabled={props.value == props.quantity}
                    style={{ flex: 0.3, height: '100%', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
                    textStyle={{ fontSize: 20 }}
                    title="+"
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        height: 50,
    },
    textContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
