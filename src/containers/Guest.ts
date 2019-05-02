import { Dispatch } from "redux";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { State } from "../redux/state";
import { Guest } from "../components/pages/Guest";
import { loginWithGoogle } from "../usecases/loginWithGoogle";

function mapStateToProps(state: State) {
  return {};
}
function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: NavigationScreenProps
) {
  return {
    async onRequestLogin() {
      await dispatch(loginWithGoogle());
      ownProps.navigation.dangerouslyGetParent()!.navigate("MemberStack");
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guest);
