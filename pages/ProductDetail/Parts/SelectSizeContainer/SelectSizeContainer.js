import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import TagRadio from '../../../../components/components/TagRadio/TagRadio';

export default function SelectSizeContainer(props) {
    const {
        sizes,
        changeSelectedSizeHandler,
        selectedSize
    }=props
    return (
        <View>
            {
                sizes != null ?
                    <View style={styles.containersSpace}>
                        <Text style={styles.title}>Size</Text>
                        <View style={styles.sizeContainer}>
                            {
                                sizes.map(size => {
                                    return (
                                        <View key={size} style={{ width: 100 }}>
                                            <TagRadio
                                                title={size}
                                                onChange={changeSelectedSizeHandler}
                                                selected={selectedSize == size}
                                                id={size}
                                                containerStyle={{ alignItems: 'center', paddingTop: 12, paddingBottom: 12 }}
                                                textStyle={{ fontSize: 17 }}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    : null
            }
        </View>
    );
}
const styles=StyleSheet.create({
    containersSpace: {
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify',
    },
    sizeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 10
    },
})