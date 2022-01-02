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
        <TouchableOpacity onPress={()=>setOpen(!open)} style={{paddingBottom:0,marginBottom:0}}>
            <View style={[styles.textContainer,open?styles.textContainerActive:null]}><Text style={open?{color:'#FF7465'}:{color:'#828181'}}>{props.title}</Text></View>
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
                containerStyle={[styles.containerStyleNotActive, open ? styles.containerStyleActive : null]}
                {...styles}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textContainer:{
        backgroundColor: '#CACACA',
        marginBottom:-1,
        paddingTop:2,
        paddingLeft:10,
        borderTopEndRadius:10,
        borderTopStartRadius:10
    },
    textContainerActive:{
        backgroundColor: '#ECECEC',
    },

    style: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        alignContent: 'center',
        marginTop:0
    },
    containerStyleNotActive: {
        backgroundColor: '#CACACA',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 2,
        marginBottom: 5,
        marginTop: 5,
        marginTop:0
    },
    containerStyleActive: {
        backgroundColor: '#ECECEC',
    },
    arrowIconStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2
    },
    dropDownContainerStyle: {
        top: 30,
        backgroundColor: '#ECECEC',
        borderTopColor: '#FF7465',
        borderTopWidth: 2,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    listParentContainerStyle: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    listItemLabelStyle:
    {
        color: '#595959'
    }
})