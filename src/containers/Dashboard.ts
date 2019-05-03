import { Dispatch } from "redux";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { State } from "../redux/state";
import { Dashboard } from "../components/pages/Dashboard";
import { getLatestJournals } from "../redux/selectors/getLatestJournals";
import { getLimitedLicense } from "../redux/selectors/getLimitedLicense";
import { getRemaining } from "../redux/selectors/getRemaining";
import { getRemainingLicenseCount } from "../redux/selectors/getRemainingLicenseCount";
import { getCarryOver } from "../redux/selectors/getCarryOver";
import { fetchJournals } from "../usecases/fetchJournals";
import { fetchLicenses } from "../usecases/fetchLicenses";
import { fetchExamines } from "../usecases/fetchExamines";
import { fetchCarryOver } from "../usecases/fetchCarryOver";

function mapStateToProps(state: State) {
  return {
    hasCarryOver: getCarryOver(state) === null ? null : !!getCarryOver(state),
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
      dispatch(fetchExamines());
      dispatch(fetchCarryOver());
    }
  };
}

const withDidMount = lifecycle<{ onLoad: () => void }, {}>({
  componentDidMount() {
    this.props.onLoad();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDidMount(Dashboard));
