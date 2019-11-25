import { Dispatch, AnyAction } from "redux"
import { connect } from "react-redux"
import { State } from "../redux/state"
import { SignUp } from "../components/pages/SignUp"

function mapStateToProps(_state: State) {
  return {}
}
function mapDispatchToProps(_dispatch: Dispatch<AnyAction>) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
