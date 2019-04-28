import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { AppBar } from "../components/AppBar";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";

function mapStateToProps(state: State) {
  return {
    user: getLoggedInUser(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar);
