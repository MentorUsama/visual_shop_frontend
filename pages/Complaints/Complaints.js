import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'

const Complaints=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is Complaints Page</Text>
        </PageContainer>
    )
}
export default Complaints;