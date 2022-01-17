import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native'
import TextWithLoader from '../../TextWithLoader/TextWithLoader';
import { Slider } from '@miblanchard/react-native-slider';
import Modal from '../../Model/Model'
import Tag from '../../TagCheckBox/Tag';
import DropDownList from '../../DropDownList/DropDownList';

export default function FilterProduct(props) {
    const [price, setPrice] = useState([0, 1000])
    const [tags, setTags] = useState([])
    const [tagsToShow, setTagsToShow] = useState(5)
    const [selectedCategory, setSelectedCategory] = useState([-1, -1])
    const tagsHandler = (isSelected, id) => {
        if (isSelected) {
            var filteredAry = [...tags]
            filteredAry.push(id)
            setTags(filteredAry)
        }
        else {
            var filteredAry = tags.filter((val) => val != id)
            setTags(filteredAry)
        }
    }
    return (
        <Modal show={props.show} close={props.close}>
            <View style={{ paddingLeft: 10, paddingRight: 20, height: '100%' }}>
                <ScrollView>
                    {/* Price Scroller */}
                    <View style={styles.filterGap}>
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

                    {/* Price Tags */}
                    <View style={[styles.filterGap]}>
                        <Text style={[styles.title, { marginBottom: 10 }]}>Tags</Text>
                        <View style={styles.tagsContainer}>
                            {
                                props.tags ? props.tags.map((tag, index) => {
                                    return (
                                        index < tagsToShow ?
                                            <View key={tag.id}><Tag title={tag.name} id={tag.id} onChange={tagsHandler} /></View>
                                            :
                                            null
                                    )
                                })
                                    :
                                    <Text>No Tags Found</Text>
                            }
                        </View>
                        <TextWithLoader
                            shouldLoad={false}
                            shouldShow={props.tags && tagsToShow < props.tags.length}
                            onPress={() => setTagsToShow(tagsToShow + 5)}
                        />
                    </View>

                    {/* Categories */}
                    <View>
                        <Text style={[styles.title, { marginBottom: 10 }]}>Categories</Text>
                        <View>
                            {props.categories ?
                                props.categories.map(category => {
                                    return <View key={category.id}><DropDownList
                                        data={category}
                                        selected={selectedCategory}
                                        setSelected={setSelectedCategory}
                                    /></View>
                                })
                                :
                                null
                            }
                        </View>
                    </View>



                </ScrollView>
            </View>
        </Modal>
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
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    filterGap: {
        marginTop: 10
    }
})