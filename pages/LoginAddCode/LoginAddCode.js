import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const LoginAddCode=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is Login Add Verification Code page</Text>
        </PageContainer>
    )
}
export default LoginAddCode;