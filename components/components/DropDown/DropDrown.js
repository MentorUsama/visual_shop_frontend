import React, { useState } from 'react'
import { StyleSheet, View,Text,TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ArrowIcon from '../../../assets/icons/downArrow'

export default function DropDrown(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { name: 'Apple', id: 'apple' },
        { name: 'Banana', id: 'banana' },
        { name: 'Banana1', id: 'banana1' },
        { name: 'Banana2', id: 'banana2' },
        { name: 'Banana3', id: 'banana3' },
        { name: 'Banana4', id: 'banana4' }
    ]);

    return (
        <View style={{paddingLeft:20,paddingRight:20}}>
            <TouchableOpacity 
                onPress={()=>setOpen(!open)} 
                activeOpacity={1} 
                style={[myStyle.textContainer,open?myStyle.textContainerActive:null]}>
                <Text style={open?myStyle.textActiveStyle:myStyle.textStyle}>{props.title}</Text>
            </TouchableOpacity>
            <DropDownPicker
                schema={{
                    label: 'name',
                    value: 'id'
                }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                showTickIcon={false}
                placeholder="Select an item"
                closeAfterSelecting={true}
                closeOnBackPressed={true}
                ArrowDownIconComponent={({ style }) => <View style={style}><ArrowIcon width={15} /></View>}
                ArrowUpIconComponent={({ style }) => <View style={style}><ArrowIcon direction="up" fill="#FF7465" width={15} /></View>}
                style={
                    open?myStyle.styleActive:myStyle.style
                }
                {...styles}
                props={{activeOpacity:1}}
                itemProps={{activeOpacity:1}}
            />
        </View>
    );
}

// Dropdown Styling
const styles = StyleSheet.create({
    arrowIconStyle:{
        justifyContent:'center'
    },
    dropDownContainerStyle:{
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopColor:'#FF7465',
        borderTopWidth:2
    },  
    selectedItemContainerStyle:{
        backgroundColor: "#D7D7D7",
        paddingTop:0
    },
    listItemContainerStyle:{
        backgroundColor:'#ECECEC'
    }
})
// Other Styling
const myStyle=StyleSheet.create({
    style:{
        flexDirection:'row',
        backgroundColor:'#CACACA',
        borderTopWidth:0,
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderRadius:0,
        alignContent:'center',
        alignItems:'center',
        paddingTop:0,
        height:33,
        opacity:1,
    },
    styleActive:{
        flexDirection:'row',
        backgroundColor:'#ECECEC',
        borderTopWidth:0,
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderRadius:0,
        alignContent:'center',
        alignItems:'center',
        paddingTop:0,
        height:33,
        opacity:1
    },
    textContainer:{
        backgroundColor:'#CACACA',
        paddingLeft:10,
        borderTopEndRadius:10,
        borderTopLeftRadius:10,
        paddingTop:5
    },
    textContainerActive:{
        backgroundColor:'#ECECEC'
    },
    textActiveStyle:{
        color:'#FF7465'
    },
    textStyle:{
        color:'#828181'
    }
})