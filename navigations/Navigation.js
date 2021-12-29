// Redux
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
import {clearData,USER_LOGIN_INFO_CONST} from '../Utility/HelperFunctions/index'
// Navigation
import MyDrawer from './Drawers';


const Navigation = (props) => {
    const { isLoggedIn } = props;
    const logout=async ()=>{
        props.logout()
        await clearData(USER_LOGIN_INFO_CONST)
    }
    return (
        <MyDrawer 
            isLoggedIn={isLoggedIn} 
            logout={logout}
        />
    )
}


const mapStateToProps = state => {
    return {
        access: state.userReducer.token,
        email: state.userReducer.email,
        isLoggedIn: state.userReducer.isLoggedIn
    };
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation) 