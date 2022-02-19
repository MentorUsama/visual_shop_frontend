import { View, Text, Modal, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import MyButton from '../Button/MyButton'
import declined from '../../../assets/images/creditCard.png'

export default function ConfirmOrder(props) {
    return (
        <Modal
            visible={props.show}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View>
                        <Image
                            style={styles.imageStyle}
                            source={declined}
                        />
                    </View>
                    <View>
                        <Text style={{ color: '#000000', fontSize: 12, marginTop: 10, textAlign:'center',fontWeight:'bold' }}>{props.message.header}</Text>
                        <Text style={{ color: '#000000', fontSize: 12, marginTop: 10,marginBottom:10,textAlign:'center'}}>{props.message.message}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MyButton style={styles.buttonStyle} onPress={props.onPress} title="View All Orders" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        height: Dimensions.get('window').height,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        width: '100%',
    },
    mainContainer: {
        backgroundColor: "#FFFFFF",
        width: '80%',
        marginTop: 75,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        width:'100%'
    },
    buttonStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        marginRight: 10
    },
    imageStyle: {
        width: 50,
        height: 50
    }
})