import { Dispatch } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { Guest } from "../components/pages/Guest";
import { loginWithGoogle } from "../usecases/loginWithGoogle";

function mapStateToProps(state: State) {
  return {};
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
