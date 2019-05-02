import { Dispatch } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { Menu } from "../components/pages/Menu";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";

function mapStateToProps(state: State) {
  return {
    user: getLoggedInUser(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    onRequestLogout() {
      alert("TODO: 実装");
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
