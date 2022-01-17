import React, { Component } from 'react';
import Cross from '../../../assets/icons/cross'
import {
    StyleSheet,
    View,
    Modal,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';



const Model = (props) => {
    return (
        <Modal
            visible={props.show}
            transparent={true}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => props.close(false)} style={styles.container}></TouchableOpacity>
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => props.close(false)} style={styles.iconContainer}>
                    <View style={styles.iconBackground}>
                        <Cross fill="#FFFFFF" />
                    </View>
                </TouchableOpacity>
                <View style={{height:'90%'}}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCCCCC',
        height: Dimensions.get('window').height,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
        padding: 50,
        opacity: 0.3
    },
    mainContainer: {
        backgroundColor: "#FFFFFF",
        width: '80%',
        height:'80%',
        position: 'absolute',
        top: 0,
        marginTop: 75,
        alignSelf: 'center',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        paddingBottom:20
    },
    iconBackground: {
        backgroundColor: '#FF7465',
        borderRadius: 20,
        width: 25,
        height: 25,
        paddingLeft: 8,
        paddingTop: 8
    }
});
export default Model;