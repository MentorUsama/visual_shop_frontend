import { View, Text, Modal, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import MyButton from '../Button/MyButton'
import declined from '../../../assets/images/creditCard.png'

export default function CancelationFailed(props) {
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
                        <Text style={{ color: '#000000', fontSize: 12, marginTop: 10, textAlign: 'center', fontWeight: 'bold' }}>{props.message && props.message.header}</Text>
                        <Text style={{ color: '#000000', fontSize: 12, marginTop: 5, marginBottom: 0, textAlign: 'center' }}>{props.message &&props.message.secondMessage}</Text>
                        <Text style={{ color: '#FF7465', fontSize: 12, marginTop: 5, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>"{props.message &&props.message.errorMessage}"</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MyButton style={styles.buttonStyle} onPress={props.cancelMyOrder} title="Retry" />
                        <MyButton style={styles.buttonStyle} isSecondary={true} onPress={props.viewOrder} title="All Orders" />
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
        width: '100%'
    },
    buttonStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '45%',
        marginRight: 10
    },
    imageStyle: {
        width: 50,
        height: 50
    }
})