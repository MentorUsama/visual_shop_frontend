import React from 'react';
import { Text, View,Button } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const JazzCash=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is JazzCash Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('Orders')} title="Done Purchasing ?"/>
            <Button onPress={() => props.navigation.navigate('CreditCard')} title="Purchase By Credit Card"/>
        </PageContainer>
    )
}
export default JazzCash;