import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const ProductDetail = (props) => {
    const { navigation } = props;
    return (
        <PageContainer navigation={navigation} >
            <ScrollView>
                <Text>This is Product Detail Page</Text>
                <View style={{ marginTop: 10 }}></View>
                <Button onPress={() => navigation.navigate('Cart')} title="Buy Now" />
            </ScrollView>
        </PageContainer>
    )
}
export default ProductDetail;