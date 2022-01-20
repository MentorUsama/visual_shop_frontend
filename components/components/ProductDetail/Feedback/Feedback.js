import { View, Text } from 'react-native';
import React from 'react';
import Profile from '../../../../assets/icons/profile'

export default function Feedback(props) {
    return (
        <View>
            <View>
                {/* Icon */}
                <View>
                    <Profile />
                </View>
                {/* Content */}
                <View>
                    <Text>Feedback</Text>
                </View>
            </View>
        </View>
    );
}
