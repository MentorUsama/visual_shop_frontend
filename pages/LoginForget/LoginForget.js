import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const LoginForget=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is LoginForget Page</Text>
        </PageContainer>
    )
}
export default LoginForget;