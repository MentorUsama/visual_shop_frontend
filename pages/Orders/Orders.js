import React from 'react';
import { Text, View,Button } from 'react-native';
import PageContainer from '../../components/container/PageContainer'

const Orders=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is Orders Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('ComplaintsDetail')} title="Add/See Complaints Of this Order"/>
        </PageContainer>
    )
}
export default Orders;