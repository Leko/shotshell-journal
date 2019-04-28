import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { State } from "../redux/state";
import { Guest } from "../components/pages/Guest";
import { loginWithGoogle } from "../usecases/loginWithGoogle";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";

function mapStateToProps(state: State) {
  return {
    authenticated: !!getLoggedInUser(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    async onRequestLogin() {
      await dispatch(loginWithGoogle());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guest);
