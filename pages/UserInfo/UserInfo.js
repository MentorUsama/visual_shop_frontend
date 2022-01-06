import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
import Loader from '../../components/components/Loader/Loader';
// Importing APIS
import { getProvincesAndCities, getProfileHandler } from '../../Utility/APIS/index'
import { getCities } from '../../Utility/HelperFunctions/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';


const UserInfo = (props) => {
    // ===== Props Related To Dropdown ======
    const [province, setProvince] = useState(null)
    const [openProvince, setOpenProvince] = useState(false)
    const [city, setCity] = useState(null)
    const [openCity, setOpenCity] = useState(false)
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
    // ===== Props Related To Loading =====
    const [loading, setLoading] = useState(false);
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
        }
        setLoading(false)
    }, [])
    return (
        <PageContainer navigation={props.navigation}>
            <Loader loading={loading} />
            <View style={{ marginTop: 60 }}></View>
            {/* Title */}
            <Text>Personal Information</Text>
            {/* DropDown */}
            <View style={{marginTop:10}}>
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
                <View style={{ marginTop: 10, marginBottom: 10 }}></View>
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
        </PageContainer>
    )
}
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
        setProfile: (profile) => dispatch(actions.setProfile(profile))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

