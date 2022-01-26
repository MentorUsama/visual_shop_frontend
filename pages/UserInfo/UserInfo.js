import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton'
// Importing APIS
import { getProvincesAndCities, getProfileHandler, updateProfile } from '../../Utility/APIS/index'
import { getCities, getCityDetail, validateContact } from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';


const UserInfo = (props) => {
    // ===== Props Related To UserData ======
    const [province, setProvince] = useState(null)
    const [openProvince, setOpenProvince] = useState(false)
    const [city, setCity] = useState(null)
    const [openCity, setOpenCity] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    // ===== Page Related States =====
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const [success, setSuccess] = useState("")



    // Props Updating Handlers
    const openHandler = (name) => {
        if (name == "provinces") {
            if (openProvince) // If Province is Open
                setOpenProvince(false)
            else {
                setOpenProvince(true)
                setOpenCity(false)
            }
        }
        else {
            if (openCity)
                setOpenCity(false)
            else {
                setOpenCity(true)
                setOpenProvince(false)
            }
        }
    }
    const provinceHandler = (provinceId) => {
        setProvince(provinceId)
        setCity(null)
    }


    // ===== Preloading Data =====
    useEffect(async () => {
        setLoading(true)
        var profile = props.profile;
        var provincesAndCities = props.provincesAndCities

        if (props.profile == null) {
            const profileResponse = await getProfileHandler(props.access)
            if (profileResponse.status == 200) {
                profile = profileResponse.data
                props.setProfile(profileResponse.data)
            }
            else {
                setLoading(false)
                props.navigation.navigate({
                    name: "HomePage",
                    params: { error: 'Unable To Fetch Profile Data From Server!!' },
                    merge: true
                })
                return
            }
        }
        if (props.provincesAndCities == null) {
            const provincesResponse = await getProvincesAndCities()
            if (provincesResponse.status == 200) {
                provincesAndCities = provincesResponse.data
                props.setProvincesAndCities(provincesResponse.data)
            }
            else {
                setLoading(false)
                props.navigation.navigate({
                    name: "HomePage",
                    params: { error: 'Unable To Fetch Cities Data From Server!!' },
                    merge: true
                })
                return;
            }
        }
        // Setting Up The data
        if (profile.cityId != null) {
            setProvince(profile.cityId.provinceId.id)
            setCity(profile.cityId.id)
            setName(profile.name)
            setAddress(profile.address)
            setContact(profile.contact)
        }
        setLoading(false)
    }, [])


    // Checking If the profile data updated
    const isProfileUpdate = () => {
        if (props.profile == null)
            return false
        if (
            props.profile.name != name ||
            props.profile.address != address ||
            props.profile.contact != contact ||
            props.profile.cityId.id != city
        )
            return true
        else
            return false
    }
    // Update Information
    const validate = () => {
        if (contact != "") {
            if (!validateContact(contact)) {
                setGlobalError("Contact number should consist of 11 digits")
                setSuccess("")
                return
            }
        }
        updateInformation()
    }
    const updateInformation = async () => {
        setLoading(true)
        var data = {
            name: name,
            address: address,
            contact: contact,
            cityId: city
        }
        const cityDetail = getCityDetail(props.provincesAndCities, province, city)
        const response = await updateProfile(data, props.access)
        if (response.status == 200) {
            data.cityId = cityDetail
            props.updateProfile(data)
            setSuccess("Profile Updated Successfully")
            setGlobalError("")

        }
        else {
            setGlobalError(response.data)
            setSuccess("")
        }
        setLoading(false)
    }


    return (
        <PageContainer hasPadding={true} navigation={props.navigation} pageLoading={loading}>
            <View style={{ marginTop: 60 }}></View>
            {/* Title */}
            <Text style={styles.titleColor}>Personal Information</Text>
            <View style={{marginTop:5,marginBottom:5}}>
                <Text style={styles.errorColor}>{globalError}</Text>
                <Text style={styles.successColor}>{success}</Text>
            </View>
            {/* Username */}
            <InputField
                icon="person"
                title="Name"
                onChange={setName}
                placeholder="Enter Your Name"
                value={name}>
            </InputField>
            <InputField
                icon="address"
                title="Address"
                onChange={setAddress}
                placeholder="Enter Your Address"
                value={address}>
            </InputField>
            <InputField
                icon="phone"
                title="Contact"
                onChange={setContact}
                placeholder="Enter Your Contact Number"
                isNumeric={true}
                value={contact}>
            </InputField>
            <DropDrown
                title="State"
                data={props.provincesAndCities}
                placeholder="Please Select Your Province"
                value={province}
                setValue={(val) => provinceHandler(val)}
                name="provinces"
                open={openProvince}
                setOpen={openHandler}
                zIndex={50001}
            />
            <DropDrown
                title="City"
                data={getCities(props.provincesAndCities, province)}
                placeholder={province == null ? "Select Your Province First" : "Please Select Your City"}
                value={city}
                disabled={province == null ? true : false}
                setValue={(val) => setCity(val)}
                name="cities"
                open={openCity}
                setOpen={openHandler}
            />
            <MyButton
                onPress={validate}
                isDisabled={!isProfileUpdate()}
                title="Update"
            />
        </PageContainer>
    )
}
const styles = StyleSheet.create({
    errorColor: {
        color: '#FF7465',
        fontSize: 10,
        fontWeight: 'bold'
    },
    successColor: {
        color: '#003E04',
        fontSize: 10,
        fontWeight: 'bold'
    },
    titleColor: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        email: state.userReducer.email,
        isLoggedIn: state.userReducer.isLoggedIn,
        provincesAndCities: state.userReducer.provincesAndCities,
        profile: state.userReducer.profile
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setProvincesAndCities: (cities) => dispatch(actions.setProvincesAndCities(cities)),
        setProfile: (profile) => dispatch(actions.setProfile(profile)),
        updateProfile: (profile) => dispatch(actions.updateProfile(profile))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

