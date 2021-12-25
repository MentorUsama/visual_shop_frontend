import React from 'react';
import { Text, View, Button } from 'react-native';


const Checkout=(props)=>{
    return (
        <View>
            <Text>This is Checkout Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('JazzCash')} title="Purchase By Jazz"/>
            <Button onPress={() => props.navigation.navigate('CreditCard')} title="Purchase By Credit Card"/>
        </View>
    )
}
export default Checkout;