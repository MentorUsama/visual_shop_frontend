import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
import InputField from '../../components/components/Input/InputField';
import MyButton from '../../components/components/Button/MyButton'
import ImageButton from '../../components/components/ImageButton/ImageButton';
import CheckBox from '../../components/components/CheckBox/CheckBox';
// Importing APIS
import { getProvincesAndCities, getProfileHandler, validateCoupen,updateProfile,createOrder } from '../../Utility/APIS/index'
import { getCities, getCityDetail, validateContact, getTotalPrice } from '../../Utility/HelperFunctions/index'
import { clearData } from '../../Utility/HelperFunctions/asyncStorage'
import { CART_DATA } from '../../Utility/HelperFunctions/storageKeys'
// Redux
import { connect } from 'react-redux';
import creditCard from '../../assets/images/creditCard.png'
import creditCardDark from '../../assets/images/creditCardDark.png'
import jazzCash from '../../assets/images/JazzCash.png'
import jazzCashDark from '../../assets/images/jazzCashDark.png'
import cashOnDelivery from '../../assets/images/cash_on_delivery.png'
import cashOnDeliveryDark from '../../assets/images/cash_on_delivery_grey.png'
import * as actions from '../../store/Actions/index';


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
    const [cuopenError, setCoupenError] = useState("")
    const [cuopen, setCoupen] = useState()
    const [discountPrice, setDiscountedPrice] = useState(null)
    const [totalPrice, setTotalPrice] = useState(getTotalPrice(props.cartData, props.cartProductsDetail))
    const [cuopenId, setCoupenId] = useState(null)
    const [saveProfile, setSaveProfile] = useState(false)
    // ===== Page Related States =====
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const [globalError2, setGlobalError2] = useState("")
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
        if (props.checkoutData) {
            setProvince(props.checkoutData.profile.provinceId)
            setCity(props.checkoutData.profile.cityId)
            setName(props.checkoutData.profile.name)
            setAddress(props.checkoutData.profile.address)
            setContact(props.checkoutData.profile.contact)
            setCoupen(props.checkoutData.coupen)
            if (props.checkoutData.cuopenId != null) {
                var newCoupen = props.checkoutData
                newCoupen.discountPrice = null
                newCoupen.cuopenId = null
                newCoupen.orignalPrice = null
                props.addCheckoutData(newCoupen)
            }
        }
        else {
            if (profile.cityId != null) {
                setProvince(profile.cityId.provinceId.id)
                setCity(profile.cityId.id)
            }
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
            props.profile.cityId && props.profile.cityId.id != city
        )
            return true
        else
            return false
    }
    // Update Information
    const clearCoupen = () => {
        setCoupen(null)
        setDiscountedPrice(null)
        setCoupenId(null)
    }
    const applyDiscount = async () => {
        setLoading(true)
        const result = await validateCoupen(cuopen, props.cartData,props.access)
        if (result.status == 200) {
            setCoupenError("")
            setDiscountedPrice(result.data.discountPrice)
            setCoupenId(result.data.cuopenId)
        }
        else {
            setCoupenError(result.data)
            setCoupenId(null)
            setDiscountedPrice(null)
        }
        setLoading(false)
    }
    const validate = () => {
        if (!validateContact(contact)) {
            if (globalError == "") {
                setGlobalError("Contact Is Required")
            }
            return false
        }
        if (name.replace(/\s/g, '') == "") {
            if (globalError == "") {
                setGlobalError("Name Is Required")
            }
            return false
        }
        if (address.replace(/\s/g, '') == "") {
            if (globalError == "") {
                setGlobalError("Address Is Required")
            }
            return false
        }
        if (!city) {
            if (globalError == "") {
                setGlobalError("City Is Required")
            }
            return false
        }
        if (!province) {
            if (globalError == "") {
                setGlobalError("Province Is Required")
            }
            return false
        }
        if (globalError != "") {
            setGlobalError("")
        }
        return true
    }
    const proceedPayment = async () => {
        var profileData = {
            name: name,
            address: address,
            contact: contact,
            cityId: city,
            provinceId: province
        }
        // Saving Data To Server If it is checked
        setLoading(true)
        if (saveProfile && isProfileUpdate()) {
            const cityDetail = getCityDetail(props.provincesAndCities, province, city)
            const response = await updateProfile(profileData, props.access)
            if (response.status == 200) {
                profileData.cityId = cityDetail
                props.updateProfile(profileData)
            }
        }
        if (selectedPaymentMethod == "cash")
        {
            // Validating the data
            const billingDetail = {
                shippingAddress: profileData.address,
                receiverName: profileData.name,
                receiverContact: profileData.contact,
                cuopenId: cuopenId,
                cityId: profileData.cityId,
                orderedProducts: props.cartData,
                paymentMethod:"CASH"
            }
            // Getting the secret key of the client
            const createOrderResponse = await createOrder(billingDetail, props.access)
            setLoading(false)
            if (createOrderResponse.status != 200) // If error occured
            {
                setGlobalError2(createOrderResponse.data)
                console.log(createOrderResponse.data)
                return
            }
            props.removeDataFromCart()
            props.removeCheckoutData()
            props.shouldUpdateUserOrder(true)
            await clearData(CART_DATA)
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage'},{name:'Orders'}],
            });
        }
        else
        {
            setLoading(false)
            // Saving Data into Redux
            props.addCheckoutData({
                profile: profileData,
                coupen: cuopenId ? cuopen : null,
                orignalPrice: totalPrice,
                discountPrice: cuopenId ? discountPrice : null,
                cuopenId: cuopenId
            })
            // Navigating To Another Page
            props.navigation.navigate(selectedPaymentMethod == "jazz" ? "JazzCash" : "CreditCard")
        }   
    }
    return (
        <PageContainer hasPadding={true} navigation={props.navigation} pageLoading={loading}>
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 20 }}></View>
                    {/* ============ User Personal Information ============ */}
                    {/* Title */}
                    <Text style={[styles.titleColor, { marginBottom: 10 }]}>Shipping Information</Text>
                    {
                        globalError == "" && success == "" ? null :
                            <View>
                                <Text style={styles.errorColor}>{globalError}</Text>
                                <Text style={styles.successColor}>{success}</Text>
                            </View>
                    }
                    <View>
                        {/* Username */}
                        <InputField
                            icon="person"
                            title="Name*"
                            onChange={setName}
                            placeholder="Enter Your Name"
                            value={name}>
                        </InputField>
                        <InputField
                            icon="address"
                            title="Address*"
                            onChange={setAddress}
                            placeholder="Enter Your Address"
                            value={address}>
                        </InputField>
                        <InputField
                            icon="phone"
                            title="Contact*"
                            onChange={setContact}
                            placeholder="Enter Your Contact Number"
                            isNumeric={true}
                            value={contact}>
                        </InputField>
                        <DropDrown
                            title="State*"
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
                            title="City*"
                            data={getCities(props.provincesAndCities, province)}
                            placeholder={province == null ? "Select Your Province First" : "Please Select Your City"}
                            value={city}
                            disabled={province == null ? true : false}
                            setValue={(val) => setCity(val)}
                            name="cities"
                            open={openCity}
                            setOpen={openHandler}
                        />
                        {
                            isProfileUpdate() ?
                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                                    <CheckBox
                                        value={saveProfile}
                                        onChange={setSaveProfile}
                                    />
                                    <Text style={{ color: '#595959', marginLeft: 10 }}>Save For Latter User</Text>
                                </View> : null
                        }
                    </View>
                    {/* ============ Discount ============= */}
                    <Text style={[styles.titleColor, { marginTop: 20 }]}>Discount</Text>
                    <Text style={styles.errorColor}>{cuopenError}</Text>
                    <InputField
                        icon="discount"
                        title="Discount"
                        onChange={setCoupen}
                        placeholder="Enter Your Cuopen Code"
                        isNumeric={true}
                        isEditable={discountPrice ? false : true}
                        value={cuopen}>
                    </InputField>
                    {discountPrice ? null : <MyButton title="Apply" isDisabled={discountPrice ? true : cuopen ? false : true} onPress={applyDiscount} />}
                    {discountPrice ? <MyButton isSecondary={true} title="Clear Coupen" onPress={clearCoupen} /> : null}
                    {/* ============ Showing Total Price ============= */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.titleColor}>Total</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={[styles.subTitle, discountPrice ? styles.strike : null, { marginRight: 5 }]}>{totalPrice}</Text>
                            {discountPrice ? <Text style={[styles.subTitle, { marginRight: 5 }]}>{discountPrice}</Text> : null}
                            <Text style={styles.subTitle}>$</Text>
                        </View>

                    </View>
                    {/* ============ Selecting Payment Method ============= */}
                    <Text style={[styles.titleColor, { marginTop: 20 }]}>Payment Information</Text>
                    <View style={styles.iconContainer}>
                        <ImageButton
                            image={creditCard}
                            greyImage={creditCardDark}
                            isSelected={selectedPaymentMethod == "credit" ? true : false}
                            style={{ width: 50, height: 40, marginRight: 20 }}
                            onPress={() => setSelectedPaymentMethod("credit")}
                        />
                        <ImageButton
                            image={jazzCash}
                            greyImage={jazzCashDark}
                            isSelected={selectedPaymentMethod == "jazz" ? true : false}
                            style={{ width: 100, height: 40 }}
                            onPress={() => setSelectedPaymentMethod("jazz")}
                            isDisabled={true}
                        />
                        <ImageButton
                            image={cashOnDelivery}
                            greyImage={cashOnDeliveryDark}
                            isSelected={selectedPaymentMethod == "cash" ? true : false}
                            style={{ width: 100, height: 40 }}
                            onPress={() => setSelectedPaymentMethod("cash")}
                        />

                    </View>
                    <Text style={styles.errorColor}>{globalError2}</Text>
                    <MyButton
                        title={selectedPaymentMethod == "cash"?"Place order":"Proceed"}
                        style={{ marginTop: 10 }}
                        isDisabled={validate() == true ? selectedPaymentMethod == null ? true : false : true}
                        onPress={proceedPayment}
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
    strike: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: 12
    }
})
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        email: state.userReducer.email,
        isLoggedIn: state.userReducer.isLoggedIn,
        provincesAndCities: state.userReducer.provincesAndCities,
        profile: state.userReducer.profile,
        cartData: state.shopReducer.cartData,
        cartProductsDetail: state.shopReducer.cartProductsDetail,
        checkoutData: state.orderReducer.checkoutData
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setProvincesAndCities: (cities) => dispatch(actions.setProvincesAndCities(cities)),
        setProfile: (profile) => dispatch(actions.setProfile(profile)),
        updateProfile: (profile) => dispatch(actions.updateProfile(profile)),
        addCheckoutData: (checkoutData) => dispatch(actions.addCheckoutData(checkoutData)),
        removeDataFromCart: () => dispatch(actions.addToCart(null, null)),
        removeCheckoutData: () => dispatch(actions.addCheckoutData(null)),
        shouldUpdateUserOrder: (shouldUpdate) => dispatch(actions.shouldUpdateUserOrder(shouldUpdate)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

