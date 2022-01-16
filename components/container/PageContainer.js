import React, { useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
// Importing Icons
import MenuBar from '../../assets/icons/menue-bar'
import BackArrow from '../../assets/icons/back-arrow'
import Basket from '../../assets/icons/basket'
import { useRoute } from '@react-navigation/native';

export default function PageContainer(props) {
    const route = useRoute();
    const { hasPadding = false } = props;
    const { width, height } = Dimensions.get('window');
    return (
        <SafeAreaView style={[styles.saveArea]}>
            <View style={styles.mainContainer}>
                {/* ====== Navigations =====*/}
                <View style={styles.navigationContainer}>
                    <TouchableOpacity
                        underlayColor="white"
                        activeOpacity={0.5}
                        onPress={() => props.navigation.toggleDrawer()}
                        style={[styles.iconContainer, route.name != "HomePage" ? { backgroundColor: "white" } : null]}>
                        <MenuBar width={20} height={20} />
                    </TouchableOpacity>
                    {
                        route.name == "HomePage" ?
                            <TouchableOpacity
                                style={[styles.iconContainer, route.name != "HomePage" ? { backgroundColor: "white" } : null]}
                                onPress={() => props.navigation.navigate("Cart")}>
                                <Basket width={30} height={30} fill="black" />
                            </TouchableOpacity> :
                            props.navigation.canGoBack() ?
                                <TouchableOpacity underlayColor="white" onPress={() => props.navigation.goBack()} style={[styles.iconContainer, { paddingLeft: 5, paddingTop: 3 }, route.name != "HomePage" ? { backgroundColor: "white" } : null]}>
                                    <BackArrow width={20} height={20} fill="black" />
                                </TouchableOpacity> : null
                    }
                </View>
                {/* ====== All Childerens =====*/}
                <View style={
                    hasPadding?
                        width > 380? 
                            styles.normalWindow
                            :styles.mediumWindow 
                    :null
                    }>
                    {props.children}
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
        backgroundColor: "#E5E5E5"
    },
    mainContainer: {
        marginTop: 50,
        flex:1
    },
    navigationContainer: {
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 5,
        elevation: 5
    },
    normalWindow: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 50,
        flex:1
    },
    mediumWindow: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        flex:1
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})