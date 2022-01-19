import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import Phone from '../../assets/icons/phone'
import Email from '../../assets/icons/email'


const About = (props) => {
    return (
        <PageContainer hasPadding={true} navigation={props.navigation}>
            <ScrollView>
                <View style={styles.containerBottomGap}>
                    <Text style={styles.title}>About Company</Text>
                    <Text style={styles.textStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.</Text>
                </View>
                <View>
                    <Text style={[styles.title, styles.containerBottomGap]}>Privacy And Policy</Text>
                    <View style={[styles.subcontainerLeftGap, styles.containerBottomGap]}>
                        <Text style={styles.subTitle}>1) Privacy And Policy</Text>
                        <Text style={styles.textStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of </Text>
                    </View>
                    <View style={[styles.subcontainerLeftGap, styles.containerBottomGap]}>
                        <Text style={styles.subTitle}>2) Returned Policy</Text>
                        <Text style={styles.textStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of </Text>
                    </View>
                </View>
                <View style={styles.containerBottomGap}>
                    <Text style={[styles.title,styles.containerBottomGap]}>Contact Us</Text>
                    <View style={styles.subcontainerLeftGap}>
                        <View style={styles.iconContainer}>
                            <View style={styles.icon}><Phone /></View>
                            <Text style={styles.textStyle}>03772947540</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <View style={styles.icon}><Email /></View>
                            <Text style={styles.textStyle}>Usama.farhat.08@gmail.com</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </PageContainer>
    )
}
export default About;
const styles = StyleSheet.create({
    containerBottomGap: {
        marginBottom: 20
    },
    subcontainerLeftGap: {
        paddingLeft: 30
    },
    title: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    subTitle: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textStyle: {
        color: '#000000',
        fontSize: 12,
    },
    iconContainer:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20
    },
    icon:{
        width:40
    }
})