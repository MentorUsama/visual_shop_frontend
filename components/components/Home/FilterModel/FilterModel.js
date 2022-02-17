import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native'
import TextWithLoader from '../../TextWithLoader/TextWithLoader';
// import { Slider } from '@miblanchard/react-native-slider';
import Modal from '../../Model/Model'
import Tag from '../../TagCheckBox/Tag';
import DropDownList from '../../DropDownList/DropDownList';
import MyButton from '../../Button/MyButton'

export default function FilterProduct(props) {
    const [price, setPrice] = useState(props.filters == null ? [0, 1000] : props.filters.price == null ? [0, 1000] : props.filters.price)
    const [tags, setTags] = useState(props.filters == null ? [] : props.filters.tags == null ? [] : props.filters.tags)
    const [tagsToShow, setTagsToShow] = useState(5)
    const [selectedCategory, setSelectedCategory] = useState([
        props.filters == null ? -1 : props.filters.categoryId == null ? -1 : props.filters.categoryId,
        props.filters == null ? -1 : props.filters.subcategoryId == null ? -1 : props.filters.subcategoryId
    ])
    const [isPriceChanges, setIsPriceChanges] = useState(false)
    var isFilterChanged = props.isFilterChanged(props.filters, {
        price: isPriceChanges ? price : null,
        tags: tags,
        categoryId: selectedCategory[0] == -1 ? null : selectedCategory[0],
        subcategoryId: selectedCategory[1] == -1 ? null : selectedCategory[1]
    })
    const changePriceHandler = (data) => {
        setPrice(data)
        setIsPriceChanges(true)
    }
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
    const applyFilterHandler = () => {
        props.filterHandler({
            price: isPriceChanges ? price : null,
            tags: tags.length == 0 ? null : tags,
            categoryId: selectedCategory[0] == -1 ? null : selectedCategory[0],
            subcategoryId: selectedCategory[1] == -1 ? null : selectedCategory[1]
        })
    }
    return (
        <Modal show={props.show} close={props.close}>
            <View style={{ paddingLeft: 10, paddingRight: 20, height: '100%' }}>
                <ScrollView>
                    {/* Price Scroller */}
                    <View style={styles.filterGap}>
                        <Text style={styles.title}>Price</Text>
                        {/* <Slider
                            animateTransitions
                            maximumTrackTintColor="#d3d3d3"
                            maximumValue={1000}
                            minimumValue={0}
                            step={10}
                            thumbTintColor="#1a9274"
                            onSlidingComplete={(data) => changePriceHandler(data)}
                            value={price}
                            maximumTrackTintColor="#EBEBEB"
                            minimumTrackTintColor={isPriceChanges ? "#FF7465" : "#EBEBEB"}
                            trackStyle={{ height: 10, borderRadius: 20 }}
                            thumbTintColor="#FFFFFF"
                            thumbStyle={{ borderColor: '#BEBBBB', borderWidth: 2 }}
                        /> */}
                        <View style={styles.priceContainer}>
                            {
                                isPriceChanges
                                    ?
                                    <Text style={styles.priceText}>Price: {price[0]} - {price[1]} RS</Text>
                                    :
                                    props.filters != null && props.filters.price != null ?
                                        <Text style={styles.priceText}>Price: {props.filters.price[0]} - {props.filters.price[1]}</Text>
                                        :
                                        <Text style={styles.priceText}>Price: Any</Text>
                            }
                            {
                                isPriceChanges ?
                                    <TouchableOpacity onPress={() => setIsPriceChanges(false)}><Text style={[styles.priceText, styles.priceTextDecoration]}>Reset</Text></TouchableOpacity>
                                    :
                                    null
                            }
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
                                            <View key={tag.id}><Tag
                                                title={tag.name} id={tag.id}
                                                onChange={tagsHandler}
                                                isDefaulSelected={
                                                    props.filters != null && props.filters.tags != null
                                                        ? props.filters.tags.includes(tag.id) ? true : false :
                                                        false
                                                }
                                            />
                                            </View>
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
                <View style={{ paddingTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MyButton
                        title="Apply Filter"
                        style={{ width: '48%' }}
                        onPress={() => applyFilterHandler()}
                        isDisabled={!isFilterChanged}
                    />
                    <MyButton
                        title="Cancel"
                        style={{ width: '48%' }}
                        isSecondary={true}
                        onPress={() => props.close(false)}
                    />
                </View>
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
        justifyContent: 'space-between',
        marginTop: -7
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
    priceTextDecoration: {
        textDecorationColor: 'red',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    filterGap: {
        marginTop: 10
    }
})