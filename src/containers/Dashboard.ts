import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { Dashboard } from "../components/pages/Dashboard";
import { getLicenses } from "../redux/selectors/getLicenses";
import { getLatestJournals } from "../redux/selectors/getLatestJournals";

function mapStateToProps(state: State) {
  return {
    hasLicense: getLicenses(state).length > 0,
    latestJournals: getLatestJournals(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
