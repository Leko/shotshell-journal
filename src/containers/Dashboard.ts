import { Dispatch } from "redux";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { State } from "../redux/state";
import { Dashboard } from "../components/pages/Dashboard";
import { getLicenses } from "../redux/selectors/getLicenses";
import { getLatestJournals } from "../redux/selectors/getLatestJournals";
import { getLimitedLicense } from "../redux/selectors/getLimitedLicense";
import { getRemaining } from "../redux/selectors/getRemaining";
import { getRemainingLicenseCount } from "../redux/selectors/getRemainingLicenseCount";
import { fetchJournals } from "../usecases/fetchJournals";
import { fetchLicenses } from "../usecases/fetchLicenses";
import { app } from "../firebase";

function mapStateToProps(state: State) {
  return {
    hasLicense: getLicenses(state).length > 0,
    limitedLicense: getLimitedLicense(state),
    latestJournals: getLatestJournals(state),
    remaining: getRemaining(state),
    remainingLicenseCount: getRemainingLicenseCount(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    onLoad() {
      dispatch(fetchJournals());
      dispatch(fetchLicenses());
    }
  };
}

const withDidMount = lifecycle({
  componentDidMount() {
    this.props.onLoad();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDidMount(Dashboard));
