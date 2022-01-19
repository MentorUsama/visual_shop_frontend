import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
const Box = (props) => {
    return (
        <View key={props.id} style={styles.boxStyle}>
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.boxContentContainer}>
                    <Text style={styles.boxTitle}>Complaint ID</Text>
                    <Text style={styles.boxText}>{props.id}</Text>
                </View >
                <View style={styles.boxContentContainer}>
                    <Text style={styles.boxTitle}>Status</Text>
                    <Text style={styles.boxText}>{props.status}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        borderRadius: 22,
        marginBottom: 15,
        marginTop: 10
    },
    title: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    boxContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    boxTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        width: 110
    },
    boxText: {
        color: '#000000',
        fontSize: 13,
    }
})
export default Box