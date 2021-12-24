import React from 'react';
// Redux
import { connect } from 'react-redux';


const Home=(props)=>{
    return (
        <div>
            This is homepage
        </div>
    )
}



const mapStateToProps = state => {
    return {
        session_id: state.userReducer.session_id,
        email:state.userReducer.email,
        isLoggedIn:state.userReducer.isLoggedIn
    };
};
export default connect(
    mapStateToProps
)(Home);