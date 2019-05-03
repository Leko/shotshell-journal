import { Dispatch } from "redux";
import { Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { State } from "../redux/state";
import { Menu } from "../components/pages/Menu";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";
import { getCarryOver } from "../redux/selectors/getCarryOver";
import { logout } from "../usecases/logout";

function mapStateToProps(state: State) {
  return {
    user: getLoggedInUser(state),
    hasCarryOver: !!getCarryOver(state)
  };
}
function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: NavigationScreenProps
) {
  return {
    async onRequestLogout() {
      Alert.alert("本当によろしいですか？", undefined, [
        {
          text: "ログアウトする",
          onPress: async () => {
            await dispatch(logout());
            ownProps.navigation.navigate("GuestStack");
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
