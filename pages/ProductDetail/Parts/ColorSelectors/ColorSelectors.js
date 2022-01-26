import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ColorSelector from '../../../../components/components/ProductDetail/ColorSelector/ColorSelector';

export default function ColorSelectors(props) {
    const {
        firstIndexColor,
        selectedImage,
        images,
        colorHandler
    } = props;
    return (
        <View>
            {
                firstIndexColor ?
                    <View style={styles.containersSpace}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>Color</Text>
                            <Text style={{ paddingLeft: 20, fontWeight: 'bold', color: '#828181', fontSize: 18 }}>{selectedImage.imageColor.toUpperCase()}</Text>
                        </View>
                        <View style={styles.colorContainer}>
                            {
                                images.map((image, index) => {
                                    return (
                                        image.imageColor != null ?
                                            <ColorSelector
                                                isSelected={selectedImage && selectedImage.id == image.id}
                                                onPress={colorHandler}
                                                index={index}
                                                item={image}
                                                key={image.id}
                                            />
                                            : null
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
    colorContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
})