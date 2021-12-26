import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const Signup=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is Signup Page</Text>
        </PageContainer>
    )
}
export default Signup;