import React from 'react';
import { Text, View,Button } from 'react-native';


const JazzCash=(props)=>{
    return (
        <View>
            <Text>This is JazzCash Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('Orders')} title="Done Purchasing ?"/>
            <Button onPress={() => props.navigation.navigate('CreditCard')} title="Purchase By Credit Card"/>
        </View>
    )
}
export default JazzCash;