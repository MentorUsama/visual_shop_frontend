// Redux
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
// Navigation
import MyDrawer from './Drawers';


const Navigation = (props) => {
    const { isLoggedIn } = props;
    return (
        <MyDrawer 
            isLoggedIn={isLoggedIn} 
            logout={props.logout}
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