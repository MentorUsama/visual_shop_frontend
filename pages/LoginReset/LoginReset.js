import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const LoginReset=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is Login Reset Password Page</Text>
        </PageContainer>
    )
}
export default LoginReset;