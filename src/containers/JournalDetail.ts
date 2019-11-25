import { Dispatch, AnyAction } from "redux"
import { connect } from "react-redux"
import { State } from "../redux/state"
import { JournalDetail } from "../components/pages/JournalDetail"

function mapStateToProps(state: State) {
  return {}
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalDetail)
