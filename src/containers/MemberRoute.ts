import { connect } from "react-redux";
import { State } from "../redux/state";
import { MemberRoute } from "../components/MemberRoute";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";

const mapStateToProps = (state: State) => ({
  authenticated: !!getLoggedInUser(state)
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberRoute);
