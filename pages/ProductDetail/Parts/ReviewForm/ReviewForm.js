import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

import Smiley1 from '../../../../assets/icons/smiley1'
import Smiley2 from '../../../../assets/icons/smiley2'
import Smiley3 from '../../../../assets/icons/smiley3'
import Smiley4 from '../../../../assets/icons/smiley4'
import Smiley5 from '../../../../assets/icons/smiley5'
import MyButton from '../../../../components/components/Button/MyButton';
import Feedback from '../../../../components/components/ProductDetail/Feedback/Feedback';
import TextLoader from '../../../../components/components/TextWithLoader/TextWithLoader';

export default function ReviewForm(props) {
    const {
        feedbackError,
        canFeedback,
        feedback,
        setFeedbackDescription,
        feedbackDescription,
        setFeedback,
        submitFeedbackHandler,
        access,
        navigation,
        feedbacks
    } = props
    return (
        <View>
            <View style={styles.containersSpace}>
                <Text style={styles.title}>Reviews</Text>
                <Text style={styles.errorColor}>{feedbackError}</Text>
                {
                    access ?
                        <View>
                            {
                                canFeedback ?
                                    <View>
                                        <View style={styles.iconContainer}>
                                            <Smiley1 onPress={() => setFeedback(1)} fill={feedback == 1 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                            <Smiley2 onPress={() => setFeedback(2)} fill={feedback == 2 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                            <Smiley3 onPress={() => setFeedback(3)} fill={feedback == 3 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                            <Smiley4 onPress={() => setFeedback(4)} fill={feedback == 4 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                            <Smiley5 onPress={() => setFeedback(5)} fill={feedback == 5 ? '#FF7465' : "rgba(46,45,45,0.4)"} />
                                        </View>
                                        <View style={styles.textAreaContainer}>
                                            <TextInput
                                                multiline={true}
                                                numberOfLines={3}
                                                style={{ textAlignVertical: 'top', }}
                                                placeholder='Please Provide Your Previous Feedback'
                                                onChangeText={(val) => setFeedbackDescription(val)}
                                                value={feedbackDescription}
                                            />
                                        </View>
                                        <MyButton
                                            isDisabled={feedbackDescription == "" ? true : false}
                                            title="Submit"
                                            style={{ marginTop: 10, borderRadius: 10 }}
                                            onPress={() => submitFeedbackHandler()}
                                        />
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        :
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[{ marginRight: 5 }, styles.subTitle]}>Please</Text>
                                <TextLoader shouldShow={true} onPress={() => navigation.navigate("Login")} containerStyle={{ paddingBottom: 0, marginRight: 5 }} textStyle={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14, marginTop: 2 }} title="Login" />
                                <Text style={styles.subTitle}>To Give Review</Text>
                            </View>
                        </View>
                }
            </View>
            {/* Previous Feedbacks */}
            <View>
                {
                    feedbacks ?
                        feedbacks.map((feedback) => {
                            if (!feedback.feedback)
                                return null
                            return (
                                <Feedback
                                    key={feedback.feedback.id}
                                    description={feedback.feedback.description}
                                    activeStars={feedback.feedback.rating}
                                    name={feedback.customer.name} />)
                        })
                        :
                        null
                }
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
    iconContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    textAreaContainer: {
        backgroundColor: '#D0CFCF',
        marginTop: 10,
        padding: 10
    },
    errorColor: {
        color: '#FF7465',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 2
    },
})