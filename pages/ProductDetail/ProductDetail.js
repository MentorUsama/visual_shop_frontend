import React from 'react';
import { Text, View,Button } from 'react-native';


const ProductDetail=(props)=>{
    const {navigation}=props;
    return (
        <View>
            <Text>This is Product Detail Page</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => navigation.navigate('Cart')} title="Buy Now"/>
        </View>
    )
}
export default ProductDetail;