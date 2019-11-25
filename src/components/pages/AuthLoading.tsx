import { NavigationScreenProps } from "react-navigation"

type Props = {
  authenticating: boolean
  authenticated: boolean
}

export function AuthLoading(props: Props & NavigationScreenProps) {
  const { authenticating, authenticated, navigation } = props
  if (!authenticating) {
    navigation.navigate(authenticated ? "MemberStack" : "GuestStack")
  }

  return null
}
