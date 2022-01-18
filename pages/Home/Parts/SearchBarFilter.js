import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from '../../../components/components/Button/MyButton'
import InputSearch from '../../../components/components/Home/InputSearch/InputSearch'
import FilterModel from '../../../components/components/Home/FilterModel/FilterModel'
import Tag from '../../../components/components/TagCheckBox/Tag'
import TextWithLoader from '../../../components/components/TextWithLoader/TextWithLoader'
export default function SearchBarFilter(props) {
    return (
        <View style={styles.searchContainer}>
            <InputSearch
                value={props.searchText}
                onChangeText={props.searchTextChange}
            />
            <View style={{ marginTop: 5 }}>
                <MyButton
                    title="Filter Products"
                    onPress={() => props.setFilterModel(true)}
                />
                {props.filterModel ? <FilterModel
                    show={props.filterModel}
                    close={props.setFilterModel}
                    tags={props.tags}
                    categories={props.categories}
                    filterHandler={props.filterHandler}
                /> : null}
                {/* Clearing All Filters */}
                <TextWithLoader
                    shouldLoad={false}
                    title="Clear All"
                    shouldShow={props.isFilteredApplied}
                    onPress={props.clearFilter}
                    containerStyle={{ paddingBottom: 2, marginTop: 0, paddingLeft: 5 }}
                    textStyle={{ textAlign: 'left', fontWeight: 'bold', fontSize: 12 }}
                />
                {/* Showing All Filters */}
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        props.filters != null && props.filters.price != null ?
                            <Tag
                                title={`${props.filters.price[0]} - ${props.filters.price[1]} RS`}
                                isBackground={true}
                                isStatic={true}
                                containerStyle={{ padding: 10, backgroundColor: '#FFFFFF', borderColor: '#C3C3C3', width: 100 }}
                                textStyle={{ color: '#FF7465' }}
                                numberOfLines={1}
                            />
                            :
                            null
                    }
                    {
                        props.filters == null || props.filters.categoryId == null ?
                            null
                            :
                            props.filters.subcategoryId == null ?
                                <Tag
                                    title="Category"
                                    isStatic={true}
                                    containerStyle={{ padding: 10, backgroundColor: '#FFFFFF', borderColor: '#C3C3C3', width: 100 }}
                                    textStyle={{ color: '#FF7465' }}
                                    numberOfLines={1}
                                /> :
                                <Tag
                                    title="Subcategory"
                                    isStatic={true}
                                    containerStyle={{ padding: 10, backgroundColor: '#FFFFFF', borderColor: '#C3C3C3', width: 100 }}
                                    textStyle={{ color: '#FF7465' }}
                                    numberOfLines={1}
                                />
                    }
                    {
                        props.filters != null && props.filters.tags != null ?
                            props.filters.tags.map(tag => {
                                return <View key={tag}><Tag
                                    title={tag}
                                    isStatic={true}
                                    containerStyle={{ padding: 10, backgroundColor: '#FFFFFF', borderColor: '#C3C3C3', width: 100 }}
                                    textStyle={{ color: '#FF7465' }}
                                    numberOfLines={1}
                                /></View>
                            }) : null
                    }
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 25,
        marginBottom: 25
    }
})