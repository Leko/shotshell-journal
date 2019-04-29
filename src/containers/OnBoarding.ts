import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { OnBoarding } from "../components/pages/OnBoarding";

function mapStateToProps(state: State) {
  return {};
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnBoarding);
