import React,{useEffect} from 'react';
import { Text, View,Button } from 'react-native';
// Redux
import { connect } from 'react-redux';
// Containers
import PageContainer from '../../components/container/PageContainer'
// Importing Component
import Toast from 'react-native-toast-message';


const Home=(props)=>{
    const {navigation,route}=props
    // ====== Checking Any Global Error ======
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(route.params?.error)
            {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: route.params.error
                });
            }   
            return unsubscribe;
        });
    }, [route.params?.error])
    return (
        <PageContainer navigation={props.navigation}>
            <Text>This is homepage {props.token}</Text>
            <View style={{marginTop:10}}></View>
            <Button onPress={() => props.navigation.navigate('ProductDetail')} title="Product Detail"/>
        </PageContainer>
    )
}





const mapStateToProps = state => {
    return {
        token: state.userReducer.token,
        email:state.userReducer.email,
        isLoggedIn:state.userReducer.isLoggedIn
    };
};
export default connect(
    mapStateToProps
)(Home);