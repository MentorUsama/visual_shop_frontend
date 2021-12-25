import React from 'react';
import { Text, View,Button } from 'react-native';


const Orders=(props)=>{
    return (
        <View>
            <Text>This is Orders Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('ComplaintsDetail')} title="Add/See Complaints Of this Order"/>
        </View>
    )
}
export default Orders;