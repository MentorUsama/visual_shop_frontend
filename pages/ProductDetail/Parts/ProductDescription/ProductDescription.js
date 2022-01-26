import { View, Text,StyleSheet } from 'react-native';
import React,{useState} from 'react';
import TextLoader from '../../../../components/components/TextWithLoader/TextWithLoader';

export default function ProductDescription(props) {
    const [showDetail, setShowDetail] = useState(false)
    return (
        <View style={styles.containersSpace}>
            <Text style={styles.title}>Description</Text>
            <View>
                <Text numberOfLines={showDetail ? 0 : 2} style={[styles.subTitle, { textAlign: 'justify' }]}>
                    {props.description}
                </Text>
                <TextLoader
                    shouldShow={true}
                    title={showDetail ? "See Less" : "See More"}
                    textStyle={{ textAlign: "left" }}
                    containerStyle={{ paddingBottom: 0 }}
                    onPress={() => setShowDetail(!showDetail)}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containersSpace: {
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    subTitle: {
        color: '#828181',
        fontSize: 14,
        marginTop: 2
    },
})