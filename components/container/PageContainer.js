import React from 'react'
import { View, Text,Button,SafeAreaView  } from 'react-native'
import { useTheme } from 'react-native-paper';
import styles from './PageContainer.module.css';

export default function PageContainer(props) {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={[styles.saveArea,{backgroundColor:colors.background}]}>
            <View style={styles.mainContainer}>
                {/* Navigations */}
                <View>
                    <Text>This is Navigtion Start </Text>
                    <Button title='OpenDrawer' onPress={()=>props.navigation.toggleDrawer()}/>
                    {props.navigation.canGoBack()?<Button title='Back' onPress={()=>props.navigation.goBack()} />:null}
                    <Text>This is Navigtion End </Text>
                </View>
                {/* All Childerens */}
                <View>
                    {props.children}
                </View>
            </View>
        </SafeAreaView>
    )
}