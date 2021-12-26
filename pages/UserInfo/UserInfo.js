import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const UserInfo=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is UserInfo Page</Text>
        </PageContainer>
    )
}
export default UserInfo;