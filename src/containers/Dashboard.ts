import { Dispatch } from "redux";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
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
import { removeJournal } from "../usecases/removeJournal";
import { Journal } from "../models/Journal";

function mapStateToProps(state: State) {
  return {
    hasCarryOver: getCarryOver(state) === null ? null : !!getCarryOver(state),
    limitedLicense: getLimitedLicense(state),
    latestJournals: getLatestJournals(state),
    remaining: getRemaining(state),
    remainingLicenseCount: getRemainingLicenseCount(state)
  };
}
function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: NavigationScreenProps
) {
  return {
    onLoad() {
      dispatch(fetchJournals());
      dispatch(fetchLicenses());
      dispatch(fetchExamines());
      dispatch(fetchCarryOver());
    },
    onRequestEdit(journal: Journal) {
      ownProps.navigation.navigate("JournalEditForm", {
        id: journal.id,
        initialValues: journal
      });
    },
    onRequestRemove(journal: Journal) {
      Alert.alert("本当によろしいですか？", "この操作は元に戻せません", [
        {
          text: "削除する",
          onPress: () => {
            dispatch(removeJournal(journal));
          },
          style: "destructive"
        },
        {
          text: "キャンセル",
          style: "cancel"
        }
      ]);
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
