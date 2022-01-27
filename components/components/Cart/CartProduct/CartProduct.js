import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Cross from '../../../../assets/icons/cross'
import Edit from '../../../../assets/icons/edit'

export default function CartProduct(props) {
  const {
    containerStyle = {},
    cart,
    productDetail,
    removeHandler,
    editHandler
  } = props
  return (
    <View style={[styles.productContainer, containerStyle]}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        {/* Image */}
        <View>
          {
            productDetail.images == null ?
              null :
              productDetail.images.length == 0 ?
                null :
                <Image
                  source={{
                    uri: productDetail.images[0].image,
                  }}
                  style={styles.imageStyle}
                />
          }
        </View>
        {/* Icon Container */}
        <View style={styles.iconCotainer}>
          <Cross
            onPress={() => removeHandler(cart.productId)}
            style={[styles.circleContainer, { backgroundColor: '#FF7465' }]}
            fill="#FFFFFF"
          />
          <Edit
            onPress={() => editHandler(productDetail)}
            style={[styles.circleContainer, { backgroundColor: '#FFFFFF', paddingTop: 7,paddingLeft:6 }]}
            fill="#FF7465"
          />
        </View>
      </View>
      {/* Detail Container */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{productDetail.name}</Text>
        <View style={styles.priceContainer}>
          <Text>Price</Text>
          <Text>{productDetail.price*cart.totalQuantity}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: '#FFFFFF',
    width: 150,
    marginBottom: '10%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingBottom: 10
  },
  imageStyle: {
    width: '100%',
    height: 100,
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },
  title: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  imageContainer: {
    position: 'relative'
  },
  iconCotainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 5
  },
  circleContainer: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginTop: 3,
    display: 'flex',
    paddingLeft: 5,
    paddingTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  }
})