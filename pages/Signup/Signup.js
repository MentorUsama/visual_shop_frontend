import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';
// Container
import PageContainer from '../../components/container/PageContainer'
// Importing Components
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton';
// Importing Assets
import Profile from '../../assets/images/profile.png'
// Importing Utilityfunction
import { storeData, USER_LOGIN_INFO_CONST, ValidateEmail } from '../../Utility/HelperFunctions/index'
import { customerRegister, continueWithGoogle } from '../../Utility/APIS/index'
const d = new Date();


const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const Validate = async () => {
        if (!ValidateEmail(email)) {
            setGlobalError("Invalid Email")
            return false;
        }
        if (password == "") {
            setGlobalError("Please Enter Password")
            return false;
        }
        if (newPassword == "") {
            setGlobalError("Please Enter New Password")
            return false;
        }
        if (password != newPassword) {
            setGlobalError("Password Does Not Match")
            return false;
        }

        // Registering
        setLoading(true);
        const response = await customerRegister(email, password)
        if (response.status == 200) {
            props.login(response.data.access, email, true, d.getTime())
            await storeData(USER_LOGIN_INFO_CONST, { access: response.data.access, email: email, isLoggedIn: true, timeAdded: d.getTime() })
            return;
        }
        else {
            setGlobalError(response.data)
            setLoading(false);
            return;
        }
    }
    const loginWithGoogle = async () => {
        setLoading(true);
        const response = await continueWithGoogle()
        if (response.status == 200) {
            props.login(response.data.access, email, true, d.getTime())
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
    return (
        <PageContainer hasPadding={true} navigation={props.navigation} pageLoading={loading}>

            {/* Profile Image */}
            <View style={styles.profileContainer}>
                <Image
                    source={Profile}
                    style={{ marginBottom: 0 }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 0 }}>Signup</Text>
            </View>
            {/* Errors */}
            <View>
                <Text style={styles.errorColor}>{globalError}</Text>
            </View>
            {/* Text Inputs */}
            <View>
                <InputField icon="email" title="Email" onChange={setEmail} placeholder="Enter Your Email" value={email}></InputField>
                <InputField icon="lock" title="Password" onChange={setPassword} placeholder="Enter Your Password" secure={true} value={password} />
                <InputField icon="lock" title="Confirm Password" onChange={setNewPassword} placeholder="Type You Password Again" secure={true} value={newPassword} />
            </View>
            {/* Buttons */}
            <MyButton style={{ marginTop: 10 }} isDisabled={props.isLoggedIn} onPress={Validate} title="Signup" />
            {/* Seoerator */}
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>OR</Text>
            <MyButton isSecondary={true} onPress={loginWithGoogle} title="Continue With Google" />
            {/* Already Login */}
            <View style={styles.textContainer}>
                <Text>Already Register ?</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Login")}>
                    <Text style={{ color: '#FF7465', fontWeight: 'bold' }}>Login Here</Text>
                </TouchableOpacity>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
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
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);