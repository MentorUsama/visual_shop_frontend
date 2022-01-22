import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Profile from '../../../../assets/icons/profile'
import Star from '../../../../assets/icons/star'

export default function Feedback(props) {
    return (
        <View style={{marginTop:20}}>
            <View style={styles.contentContainer}>
                {/* Icon */}
                <View style={styles.profileContainer}>
                    <Profile />
                </View>
                {/* Content */}
                <View style={styles.detailContainer}>
                    <Text style={{color:'#FF7465',fontWeight:'bold'}}>{props.name}</Text>
                    <Text style={[styles.subTitle,{marginBottom:10}]}>{props.description}</Text>
                    <View style={styles.starContainer}>
                        <Star fill={props.activeStars >= 1 ? "#FF7465" : "#909090"} />
                        <Star fill={props.activeStars >= 2 ? "#FF7465" : "#909090"} />
                        <Star fill={props.activeStars >= 3 ? "#FF7465" : "#909090"} />
                        <Star fill={props.activeStars >= 4 ? "#FF7465" : "#909090"} />
                        <Star fill={props.activeStars >= 5 ? "#FF7465" : "#909090"} />
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    subTitle: {
        color: '#828181',
        fontSize: 14,
        marginTop: 2
    },
    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileContainer: {
        width: 70
    },
    detailContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})