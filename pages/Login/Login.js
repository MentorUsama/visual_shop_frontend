import React, { useState } from 'react';
import { Text, View, Image, StyleSheet,TouchableOpacity } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';
// Axios
import { customerLoginHandler,continueWithGoogle } from '../../Utility/APIS/index';
// Container
import PageContainer from '../../components/container/PageContainer'
// Importing Components
import Loader from '../../components/components/Loader/Loader';
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton';
// Importing Function
import {ValidateEmail} from '../../Utility/HelperFunctions/preparedataHelper';
// Importing Assets
import Profile from '../../assets/images/profile.png'
// Importing Utilityfunction
import { storeData, USER_LOGIN_INFO_CONST } from '../../Utility/HelperFunctions/index'
const d = new Date();


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const Validate=()=>{
        if(!ValidateEmail(email))
        {
            setGlobalError("Invalid Email")
            return false;
        }
        if(password=="")
        {
            setGlobalError("Please Enter Password")
            return false;
        }
        UserLogin()
    }
    const UserLogin = async () => {
        setLoading(true);
        const response = await customerLoginHandler(email, password);
        if (response.status == 200) {
            props.login(response.data.access, email, true)
            await storeData(USER_LOGIN_INFO_CONST, { access: response.data.access, email: email, isLoggedIn: true, timeAdded: d.getTime() })
        }
        else // Error Occured 
        {
            if(response.status==400) // Invalid Data Error
            {   
                setGlobalError("Incorrect Email or Password")
                setLoading(false);
            }
            else // Unknown Error
            {
                setGlobalError(response.data)
                setLoading(false);
            }
        }
    }
    const loginWithGoogle = async () => {
        setLoading(true);
        try 
        {
            const response = await continueWithGoogle()
            if(response.status==200)
            {
                props.login(response.data.access, email, true)
                await storeData(USER_LOGIN_INFO_CONST, { access: response.data.access, email: email, isLoggedIn: true, timeAdded: d.getTime() })
                return;
            }
            else // Unknown Error
            {
                setGlobalError(response.data)
                setLoading(false);
                return;
            }
        }
        catch (e) 
        {
            console.log(e)
            setGlobalError("Something Went Wrong!! e")
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
                    <Text style={{fontSize:20,fontWeight:'bold',marginTop:0}}>Login</Text>
                </View>
                {/* Errors */}
                <View>
                    <Text style={styles.errorColor}>{globalError}</Text>
                </View>
                {/* Text Inputs */}
                <View>
                    <InputField icon="email" title="Email" onChange={setEmail} placeholder="Enter Your Email" value={email}></InputField>
                    <InputField icon="lock" title="Password" onChange={setPassword} placeholder="Enter Your Password" secure={true} value={password} />
                </View>
                {/* Buttons */}
                <MyButton  style={{marginTop:10}} isDisabled={props.isLoggedIn} onPress={Validate} title="Login" />
                {/* Seoerator */}
                <Text style={{textAlign:'center',fontSize:20,marginBottom:10}}>OR</Text>
                <MyButton isSecondary={true} onPress={loginWithGoogle} title="Login With Google" />
                {/* Foreget Password */}
                <TouchableOpacity style={{marginBottom:20}} activeOpacity={0.8} onPress={()=>props.navigation.navigate("LoginForget")}>
                        <Text style={{color:'#FF7465',textAlign:'right',fontWeight:'bold'}}>Forget Password</Text>
                </TouchableOpacity>
                {/* Already Login */}
                <View style={styles.textContainer}>
                    <Text>Does not have account ?</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>props.navigation.navigate("Signup")}>
                        <Text style={{color:'#FF7465',fontWeight:'bold'}}>Register Here</Text>
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
    },
    textContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    }
})
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        email: state.userReducer.email,
        isLoggedIn: state.userReducer.isLoggedIn
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (access, email, isLoggedIn, timeAdded) => dispatch(actions.login(access, email, isLoggedIn, timeAdded))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);