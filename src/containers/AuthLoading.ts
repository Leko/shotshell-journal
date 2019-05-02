import { Dispatch } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { AuthLoading } from "../components/pages/AuthLoading";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";
import { isAuthenticating } from "../redux/selectors/isAuthenticating";

function mapStateToProps(state: State) {
  return {
    authenticating: isAuthenticating(state),
    authenticated: !!getLoggedInUser(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading);
