import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { JournalList } from "../components/pages/JournalList";
import { getJournals } from "../redux/selectors/getJournals";

function mapStateToProps(state: State) {
  return {
    journals: getJournals(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JournalList);
