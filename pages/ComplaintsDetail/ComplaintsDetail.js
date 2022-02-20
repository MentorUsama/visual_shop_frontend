import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import PageContainer from '../../components/container/PageContainer'
import ComplaintsDetailBox from '../../components/components/Complaints/ComplaintsDetailBox';
import { getSelectedImage } from '../../Utility/HelperFunctions/index'
import Paddings from '../../components/container/ContentPadding';
import Message from '../../components/components/Complaints/Message';
import InputSearch from '../../components/components/Home/InputSearch/InputSearch';

const ComplaintsDetail = (props) => {
    const [orders, setOrder] = useState(props.route.params.order)
    const [userInput,setUserInput]=useState("")
    const [pageLoading, setPageLoading] = useState(false);
    const [globalError, setGlobalError] = useState("")
    const [complaints,setComplaints]= useState(null)
    useEffect(async () => {
        
    }, [])
    return (
        <PageContainer hasPadding={false} pageLoading={pageLoading} navigation={props.navigation}>
            <View style={{ height: '100%' }}>
                {/* Data */}
                <Paddings hasPadding={true} >
                    {orders?<ComplaintsDetailBox
                        order={orders}
                        getSelectedImage={getSelectedImage}
                    />:null}
                    <Text style={{ color: '#FF7465', fontSize: 15, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>{globalError}</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            {
                                complaints && complaints.messages.map(message => <Message key={message.id} isAdmin={message.isAdmin}>{message.message}</Message>)
                            }
                        </View>
                    </ScrollView>
                </Paddings>
                {/* Input Bar */}
                <View>
                    <InputSearch value={userInput} onChangeText={(val)=>setUserInput(val)} hasIcons={false} containerStyle={{marginBottom:1}}/>
                </View>
            </View>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
})
export default ComplaintsDetail;