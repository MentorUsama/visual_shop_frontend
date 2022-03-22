import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function FeaturesDetected(props) {
    const {isMatched=true,feature,percentage} =props
  return (
    <View style={styles.featureContainer}>
      <View style={styles.heading}>
        <Text style={styles.text}>{feature}</Text>
      </View>
      <View style={styles.heading2}>
        <Text style={styles.text2}>{percentage.toFixed(1)} %</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  featureContainer:{
      display:'flex',
      flexDirection:'row',
      marginBottom:5,
      marginRight:10
  },
  heading:{
    minWidth:50,
    backgroundColor:'#FF7465',
    fontSize:20,
    padding:5,
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text:{
    fontSize:15,
    color:'#FFFFFF',
    textAlign:'center'
  },
  heading2:{
    minWidth:40,
    backgroundColor:'#FFFFFF',
    fontSize:20,
    padding:5,
    borderTopRightRadius:6,
    borderBottomRightRadius:6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text2:{
    fontSize:15,
    textAlign:'center',
    fontSize:13
  }
})