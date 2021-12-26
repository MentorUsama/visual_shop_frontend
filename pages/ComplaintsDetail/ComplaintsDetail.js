import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const ComplaintsDetail=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is ComplaintsDetail Page</Text>
        </PageContainer>
    )
}
export default ComplaintsDetail;