import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import MyButton from '../../../components/components/Button/MyButton'
import InputSearch from '../../../components/components/Home/InputSearch/InputSearch'
import FilterModel from '../../../components/components/Home/FilterModel/FilterModel'

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