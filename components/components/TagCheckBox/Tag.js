import React,{useState} from 'react'
import { StyleSheet, Text,TouchableOpacity } from 'react-native'

export default function Tag(props) {
    const [selected,setSelected]=useState(false);
    const tagsHandler=()=>{
        const isFalse=selected;
        setSelected(!isFalse)
        props.onChange(!isFalse,props.id)
    }
    return (
        <TouchableOpacity 
            onPress={tagsHandler} 
            activeOpacity={0.5} 
            style={[styles.tagContainer,selected?styles.tagContainerActive:null]}>
            <Text style={[styles.text,selected?styles.textActive:null]}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    tagContainer:{
        borderColor:'#EBEBEB',
        borderWidth:2,
        padding:15,
        borderRadius:50,
        marginBottom:10,
        marginRight:10
    },
    tagContainerActive:{
        backgroundColor:'#FF7465',
        borderWidth:0
    },
    text:{
        fontSize:12,
        fontWeight:'bold',
        color:'#9B9B9B'
    },
    textActive:{
        color:'#FFFFFF'
    }
})