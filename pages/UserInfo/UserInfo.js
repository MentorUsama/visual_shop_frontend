import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
// Importing APIS
import {getProvincesAndCities,getProfileHandler} from '../../Utility/APIS/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';


const UserInfo=(props)=>{
    const [provinces,setProvinces]=useState(props.provincesAndCities)
    const [profile,setProfile]=useState(null)
    useEffect(async ()=>{
        // Getting The Profile
        const profile=await getProfileHandler("sdsd")
        if(profile.status==200)
        {
            setProfile(profile);
        }
        else
        {
            props.navigation.navigate("Home")
        }
        // Getting The Provinces
        if(props.cities==null)
        {
            const provinces=await getProvincesAndCities()
            if(provinces.status==200)
            {
                props.setProvincesAndCities(provinces.data)
                setProvinces(provinces.data)
            }
            else
            {
                props.navigation.navigate("Home")
            }
        }
    },[])
    return (
        <PageContainer navigation={props.navigation}>
            <View style={{marginTop:60}}></View>
            {/* Title */}
            <Text>Personal Information</Text>
            {/* DropDown */}
            <DropDrown 
                title="State"
            />
        </PageContainer>
    )
}
const mapStateToProps = state => {
    return {
        access: state.userReducer.access,
        email: state.userReducer.email,
        isLoggedIn: state.userReducer.isLoggedIn,
        provincesAndCities:state.userReducer.provincesAndCities
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setProvincesAndCities:(cities)=>dispatch(actions.setProvincesAndCities(cities))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);