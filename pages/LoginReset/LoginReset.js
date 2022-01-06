import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Axios
import { resetPasswordHandler } from '../../Utility/APIS/index';
// Container
import PageContainer from '../../components/container/PageContainer'
// Importing Components
import Loader from '../../components/components/Loader/Loader';
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton';
// Importing Assets
import Profile from '../../assets/images/profile.png'
const d = new Date();


const LoginReset = (props) => {
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const Validate = async () => {
        if (code == "") {
            setGlobalError("Please enter code that is sent to your email")
            return;
        }
        if (password == "") {
            setGlobalError("Please enter your new password")
            return;
        }
        if (confirmPassword == "") {
            setGlobalError("Please retype your password to confirm")
        }
        if (password != confirmPassword) {
            setGlobalError("Password Does Not Match");
            return;
        }

        setLoading(true);
        const response = await resetPasswordHandler(code, password);
        if (response.status == 200) {
            setLoading(false);
            props.navigation.navigate("Login")
        }
        else {
            setGlobalError(response.data)
            setLoading(false);
            return;
        }
    }


    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            <Loader loading={loading} />

            {/* Profile Image */}
            <View style={styles.profileContainer}>
                <Image
                    source={Profile}
                    style={{ marginBottom: 0 }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 0 }}>Reset Password</Text>
            </View>
            {/* Errors */}
            <View>
                <Text style={styles.errorColor}>{globalError}</Text>
            </View>
            {/* Text Inputs */}
            <View>
                <InputField title="Code" onChange={setCode} placeholder="Enter The Code Sent To Your Email" value={code}></InputField>
                <InputField secure={true} icon="lock" title="New Password" onChange={setPassword} placeholder="Enter Your New Password" value={password}></InputField>
                <InputField secure={true} icon="lock" title="Confirm Password" onChange={setConfirmPassword} placeholder="Enter Your Password Again" value={confirmPassword}></InputField>
            </View>
            {/* Buttons */}
            <MyButton style={{ marginTop: 10 }} onPress={Validate} title="Search" />
            {/* Login */}
            <View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Login")}>
                    <Text style={{ color: '#FF7465', fontWeight: 'bold', textAlign: 'right' }}>Reset Password</Text>
                </TouchableOpacity>
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
        fontWeight: 'bold'
    },
    profileContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }
})
export default LoginReset