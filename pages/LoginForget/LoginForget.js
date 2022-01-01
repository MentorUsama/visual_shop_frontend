import React, { useState } from 'react';
import { Text, View, Image, StyleSheet,TouchableOpacity } from 'react-native';
// Axios
import {forgetPasswordHandler} from '../../Utility/APIS/index';
// Container
import PageContainer from '../../components/container/PageContainer'
// Importing Components
import Loader from '../../components/components/Loader/Loader';
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton';
// Importing Assets
import Profile from '../../assets/images/profile.png'
// Importing Utilityfunction
import {ValidateEmail } from '../../Utility/HelperFunctions/index'
const d = new Date();


const LoginForget = (props) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const Validate=async ()=>{
        if(!ValidateEmail(email))
        {
            setGlobalError("Invalid Email")
            return;
        }
        setLoading(true);
        const response=await forgetPasswordHandler(email) 
        if(response.status==200)
        {
            setLoading(false);
            props.navigation.navigate("LoginReset")
        }
        else
        {
            setGlobalError(response.data)
            setLoading(false);
            return;
        }
        
    }

   
    return (
        <PageContainer navigation={props.navigation}>
            <Loader loading={loading} />
            <View style={styles.contentContainer}>
                {/* Profile Image */}
                <View style={styles.profileContainer}>
                    <Image
                        source={Profile}
                        style={{marginBottom:0}}
                    />
                    <Text style={{fontSize:20,fontWeight:'bold',marginTop:0}}>Forget Password</Text>
                </View>
                {/* Errors */}
                <View>
                    <Text style={styles.errorColor}>{globalError}</Text>
                </View>
                {/* Text Inputs */}
                <View>
                    <InputField icon="email" title="Email" onChange={setEmail} placeholder="Enter Your Email" value={email}></InputField>
                </View>
                {/* Buttons */}
                <MyButton  style={{marginTop:10}}  onPress={Validate} title="Search" />
                {/* Login */}
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>props.navigation.navigate("Login")}>
                        <Text style={{color:'#FF7465',fontWeight:'bold',textAlign:'right'}}>Login Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    contentContainer: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 50
    },
    errorColor: {
        color: '#FF7465',
        textAlign: 'center',
        fontSize: 10,
        fontWeight:'bold'
    },
    profileContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }
})
export default LoginForget