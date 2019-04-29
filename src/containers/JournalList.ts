import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { JournalList } from "../components/pages/JournalList";

function mapStateToProps(state: State) {
  return {};
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JournalList);
