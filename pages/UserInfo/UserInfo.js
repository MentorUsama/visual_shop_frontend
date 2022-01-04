import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
import Loader from '../../components/components/Loader/Loader';
// Importing APIS
import {getProvincesAndCities,getProfileHandler} from '../../Utility/APIS/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';


const UserInfo=(props)=>{
    const [provinces,setProvinces]=useState(props.provincesAndCities)
    const [profile,setProfile]=useState(null)
    const [loading, setLoading] = useState(false);
    useEffect(async ()=>{
        setLoading(true)
        // Getting The Profile
        if(props.profile==null)
        {
            const profile=await getProfileHandler(props.access)
            if(profile.status==200)
            {
                props.setProfile(profile.data)
                setProfile(profile.data);
            }
            else
            {
                setLoading(false)
                props.navigation.navigate({
                    name:"HomePage",
                    params:{error:'Unable To Fetch Profile Data From Server!!'},
                    merge:true
                })
                return
            }
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
                setLoading(false)
                props.navigation.navigate({
                    name:"HomePage",
                    params:{error:'Unable To Fetch Cities Data From Server!!'},
                    merge:true
                })
                return;
            }
        }
        setLoading(false)
    },[])
    return (
        <PageContainer navigation={props.navigation}>
            <Loader loading={loading} />
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
        provincesAndCities:state.userReducer.provincesAndCities,
        profile:state.userReducer.profile
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setProvincesAndCities:(cities)=>dispatch(actions.setProvincesAndCities(cities)),
        setProfile:(profile)=>dispatch(actions.setProfile(profile))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);