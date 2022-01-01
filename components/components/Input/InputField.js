import React,{useState,useRef} from 'react'
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import Lock from '../../../assets/icons/lock';
import Email from '../../../assets/icons/email'

export default function Input(props) {
    const { secure = false } = props;
    var textInput = useRef(null);
    const [color,setColor]=useState({iconColor:'#464646',textColor:'#828181',borderColor:'#828181'});
    const onFocus=()=>{
        setColor({
            iconColor:'#FF7465',
            textColor:'#FF7465',
            borderColor:'#FF7465'
        })
    }
    const onBlur=()=>{
        setColor({
            iconColor:'#464646',
            textColor:'#828181',
            borderColor:'#828181'
        })
    }
    return (
        <TouchableOpacity onPress={()=>textInput && textInput.focus()} activeOpacity={1} style={[styles.container,{borderBottomColor:color.borderColor}]}>
            <Text style={{color:color.textColor}}>{props.title}</Text>
            <View style={styles.inputContainer}>
                {props.icon=="lock"?<Lock fill={color.iconColor} />:
                 props.icon=="email"?<Email width={22} fill={color.iconColor} />:
                 null}
                <TextInput ref={(ref)=>{textInput=ref}} focus={true} onBlur={onBlur} onFocus={onFocus} style={styles.textFieldStyle} secureTextEntry={secure} onChangeText={(val) => props.onChange(val)} placeholder={props.placeholder} value={props.value} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CACACA',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 4,
        marginBottom: 5,
        marginTop: 5,
        borderTopEndRadius:10,
        borderTopLeftRadius:10
    },
    inputContainer:{
        display:'flex',
        flexDirection:'row',
        marginTop:5,
        alignItems:'center'
    },
    textFieldStyle:{
        marginLeft:10,
        fontSize:15
    }
})