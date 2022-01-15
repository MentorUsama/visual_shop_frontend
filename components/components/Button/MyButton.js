import React from 'react'
import {StyleSheet,Button,View,TouchableOpacity,Text} from 'react-native'

export default function MyButton(props) {
    const {isSecondary=false,isDisabled=false,style={}}=props
    return (
        <TouchableOpacity 
            disabled={props.isDisabled} 
            activeOpacity={0.8} 
            style={[styles.buttonStyle,style,isDisabled?{backgroundColor:'#828181'}:isSecondary?{backgroundColor:'#828181'}:null,props.style]} 
            color={"#FF7465"} 
            onPress={props.onPress} 
            title={props.title}>
            <Text style={[styles.textCotainer,isDisabled?styles.disableColor:null]}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    buttonStyle:{
        marginBottom:10,
        backgroundColor:'#FF7465',
        paddingTop:10,
        paddingBottom:10,
    },
    textCotainer:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15
    },
    disableColor:{
        opacity:0.4
    }
})
