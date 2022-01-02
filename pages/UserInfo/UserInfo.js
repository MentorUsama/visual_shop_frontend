import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import DropDrown from '../../components/components/DropDown/DropDrown';
// Importing APIS
import {getCities,getProfileHandler} from '../../Utility/APIS/index'
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/index';


const UserInfo=(props)=>{
    const newPersonData=useState({
        name:'Usama',
        address:"Valencia 8 no gate",
        contact:'03472547540',
        state:'Need To Fetch',
        city:'Need To Fetch'
    })
    useEffect(async ()=>{
        // Getting The Profile
        const profile=await getProfileHandler("sdsd")

        // Getting The Cities
        if(props.cities==null)
        {
            const provinces=await getCities()
            console.log("Now You Got The Cities")
            if(provinces.status==200)
            {
                console.log("Now it is save in store")
                props.setCities(provinces)
            }
            else
            {
                console.log("Error Getting Cities")
            }
        }
        else
        {
            console.log("You got the cities already")
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
        cities:state.userReducer.cities
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setCities:(cities)=>dispatch(actions.setCities(cities))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);