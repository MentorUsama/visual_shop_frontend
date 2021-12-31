import React from 'react'
import { View, Text,Button,SafeAreaView  } from 'react-native'

export default function PageContainer(props) {
    return (
        <SafeAreaView style={{backgroundColor:"#EFEFEF",flex:1}}>
            <View style={{paddingLeft:36,paddingRight:36}}>
                <View style={{marginTop:50,marginBottom:50}} >
                    <Text>This is Navigtion Start </Text>
                    <Button title='OpenDrawer' onPress={()=>props.navigation.toggleDrawer()}/>
                    {props.navigation.canGoBack()?<Button title='Back' onPress={()=>props.navigation.goBack()} />:null}
                    <Text>This is Navigtion End </Text>
                </View>
                <View>
                    {props.children}
                </View>
            </View>
        </SafeAreaView>
    )
}