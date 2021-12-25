import React from 'react';
import { Text, View,Button } from 'react-native';


const CreditCard=(props)=>{
    return (
        <View>
            <Text>This is CreditCard Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('Orders')} title="Done Purchasing ?"/>
            <Button onPress={() => props.navigation.navigate('JazzCash')} title="Purchase By JazzCash"/>
        </View>
    )
}
export default CreditCard;