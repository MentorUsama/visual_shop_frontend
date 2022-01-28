import React,{useState} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import PageContainer from '../../components/container/PageContainer'


const ComplaintsDetail=(props)=>{
    const [orders,setOrder]=useState(props.route.params.data)
    const [pageLoading, setPageLoading] = useState(false);
    return (
        <PageContainer hasPadding={true} pageLoading={pageLoading} navigation={props.navigation}>
            <Text>This is ComplaintsDetail Page</Text>
        </PageContainer>
    )
}
const styles = StyleSheet.create({
})
export default ComplaintsDetail;