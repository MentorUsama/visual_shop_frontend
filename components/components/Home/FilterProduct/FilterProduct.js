import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import MyButton from '../../Button/MyButton'
import { Slider } from '@miblanchard/react-native-slider';
import Modal from '../../Model/Model'

export default function FilterProduct() {
    const [filterModel, setFilterModel] = useState(true)
    const [price, setPrice] = useState([0, 1000])
    return (
        <View>
            <MyButton
                title="Filter Products"
                onPress={() => setFilterModel(true)}
            />
            <Modal show={filterModel} close={setFilterModel}>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <ScrollView>
                        {/* Scroller */}
                        <View>
                            <Text style={styles.title}>Price</Text>
                            <Slider
                                animateTransitions
                                maximumTrackTintColor="#d3d3d3"
                                maximumValue={1000}
                                minimumTrackTintColor="#1fb28a"
                                minimumValue={0}
                                step={10}
                                thumbTintColor="#1a9274"
                                onSlidingComplete={(data) => setPrice(data)}
                                value={price}
                                maximumTrackTintColor="#EBEBEB"
                                minimumTrackTintColor="#FF7465"
                                trackStyle={{ height: 10, borderRadius: 20 }}
                                thumbTintColor="#FFFFFF"
                                thumbStyle={{ borderColor: '#BEBBBB', borderWidth: 2 }}
                            />
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>From {price[0]} To {price[1]} RS</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FF7465'
    },
    priceText: {
        fontSize: 12,
        color: '#FF7465'
    }
})