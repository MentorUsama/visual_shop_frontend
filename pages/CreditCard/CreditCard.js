import React from 'react';
import { Text, View,Button } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const CreditCard=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is CreditCard Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('Orders')} title="Done Purchasing ?"/>
            <Button onPress={() => props.navigation.navigate('JazzCash')} title="Purchase By JazzCash"/>
        </PageContainer>
    )
}
export default CreditCard;