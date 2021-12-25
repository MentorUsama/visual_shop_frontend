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
        session_id: state.userReducer.session_id,
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