import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
const NUM_OF_LINES = 2;
const SOME_LONG_TEXT_BLOCK = 'Lorem ipsum ...';

export default function Message(props) {
    const [loadMore, setLoadMore] = useState(false);
    const [numOfLines, setNumOfLines] = useState(0);

    const onTextLayout = useCallback(e => {
        if (numOfLines == 0)
            setNumOfLines(e.nativeEvent.lines.length);
    });

    const onLoadMoreToggle = () => {
        setLoadMore(!loadMore);
    }
    return (
        <View style={[styles.container, props.isAdmin ? styles.adminContainer : styles.userContainer]}>
            <Text
                numberOfLines={numOfLines == 0 ? null : loadMore ? numOfLines : NUM_OF_LINES}
                onTextLayout={onTextLayout}
                style={[styles.bodyText, props.isAdmin ? styles.adminBodyText : styles.userBodyText]}
            >
                {props.children}
            </Text>
            {
                (numOfLines > NUM_OF_LINES) &&
                <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={onLoadMoreToggle}>
                        <Text style={[styles.linkText, props.isAdmin ? styles.adminLinkText : styles.userLinkText]}>{loadMore ? 'Load Less' : 'Load More'}</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        width: '80%',
    },
    userContainer: {
        backgroundColor: '#FF7465',
    },
    adminContainer: {
        backgroundColor: '#FFFFFF',
        marginLeft: 'auto'
    },


    bodyText: {
        flex: 1,
        textAlign: 'justify'
    },
    userBodyText: {
        color: '#FFFFFF'
    },
    adminBodyText: {
        color: '#6F6F6F'
    },


    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    linkText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 4
    },
    userLinkText: {

    },
    adminLinkText: {

    }
})