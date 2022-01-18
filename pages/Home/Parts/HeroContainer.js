import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HeroContainer() {
    return (
        <View style={styles.heroContainer}>
            <Text style={styles.heroText}>Search Your Favorite Dresses</Text>
            <View style={styles.heroDetailContainer}>
                <Text style={styles.heroTextDetail}>Ready to wear dresses tailored for you online. Hurry up while stock lasts.</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    heroContainer: {
        marginTop: 10,

    },
    heroText: {
        color: '#000000',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5
    },
    heroDetailContainer: {
        maxWidth: 250,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    heroTextDetail: {
        color: '#000000',
        fontSize: 12,
        textAlign: 'center',
    }
})
