import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton'
import ImageButton from '../../components/components/ImageButton/ImageButton';
// Importing APIS
import { getProvincesAndCities, getProfileHandler, updateProfile } from '../../Utility/APIS/index'
import { getCities, getCityDetail, validateContact } from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import creditCard from '../../assets/images/creditCard.png'
import creditCardDark from '../../assets/images/creditCardDark.png'
import jazzCash from '../../assets/images/JazzCash.png'
import jazzCashDark from '../../assets/images/jazzCashDark.png'
import * as actions from '../../store/Actions/index';
import { withDecay } from 'react-native-reanimated';


const Checkout = (props) => {
    // ===== Props Related To UserData ======
    const [province, setProvince] = useState(null)
    const [openProvince, setOpenProvince] = useState(false)
    const [city, setCity] = useState(null)
    const [openCity, setOpenCity] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [cuopen, setCoupen] = useState("12")
    const [discountPrice, setDiscountedPrice] = useState(null)
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
    const applyDiscount = () => {
        console.log("Will Apply Discount Here")
    }
    return (
        <PageContainer hasPadding={true} navigation={props.navigation} pageLoading={loading}>
            <View>
                <ScrollView   showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 20 }}></View>
                    {/* ============ User Personal Information ============ */}
                    {/* Title */}
                    <Text style={[styles.titleColor, { marginBottom: 10 }]}>Shipping Information</Text>
                    {
                        globalError == "" && success == "" ? null :
                            <View style={{ marginTop: 5, marginBottom: 5 }}>
                                <Text style={styles.errorColor}>{globalError}</Text>
                                <Text style={styles.successColor}>{success}</Text>
                            </View>
                    }
                    <View>
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
                    </View>
                    {/* ============ Discount ============= */}
                    <Text style={[styles.titleColor, { marginTop: 20 }]}>Discount</Text>
                    <InputField
                        icon="discount"
                        title="Discount"
                        onChange={setCoupen}
                        placeholder="Enter Your Cuopen Code"
                        isNumeric={true}
                        isEditable={discountPrice?false:true}
                        value={cuopen}>
                    </InputField>
                    <MyButton title="Apply" isDisabled={discountPrice?true:cuopen ? false : true} onPress={applyDiscount} />
                    {/* ============ Showing Total Price ============= */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.titleColor}>Total</Text>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <Text style={[styles.subTitle,discountPrice?styles.strike:null,{marginRight:5}]}>100</Text>
                            {discountPrice?<Text style={[styles.subTitle,{marginRight:5}]}>{discountPrice}</Text>:null}
                            <Text style={styles.subTitle}>RS</Text>
                        </View>
                        
                    </View>
                    {/* ============ Selecting Payment Method ============= */}
                    <Text style={[styles.titleColor, { marginTop: 20 }]}>Payment Information</Text>
                    <View style={styles.iconContainer}>
                        <ImageButton
                            image={creditCard}
                            greyImage={creditCardDark}
                            isSelected={selectedPaymentMethod == "credit" ? true : false}
                            style={{ width: 100, marginRight: 20 }}
                            onPress={() => setSelectedPaymentMethod("credit")}
                        />
                        <ImageButton
                            image={jazzCash}
                            greyImage={jazzCashDark}
                            isSelected={selectedPaymentMethod == "jazz" ? true : false}
                            style={{ width: 100 }}
                            onPress={() => setSelectedPaymentMethod("jazz")}
                        />
                    </View>
                    <MyButton
                        title="Proceed"
                        style={{ marginTop: 10 }}
                        isDisabled={selectedPaymentMethod == null ? true : false}
                        onPress={() => props.navigation.navigate(selectedPaymentMethod == "jazz" ? "JazzCash" : "CreditCard")}
                    />
                </ScrollView>
            </View>
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
    },
    subTitle: {
        fontSize: 20,
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    strike:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        fontSize:12
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
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

