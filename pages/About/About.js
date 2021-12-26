import React from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const About=(props)=>{
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is About Page</Text>
        </PageContainer>
    )
}
export default About;