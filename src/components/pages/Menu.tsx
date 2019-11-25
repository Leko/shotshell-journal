import React from "react"
import { NavigationScreenProps } from "react-navigation"
import { View, Divider, Image, Button, Icon, Text, Subtitle } from "@shoutem/ui"
import { PageContainer } from "../molecules/PageContainer"
import { User } from "../../models/User"

type Props = {
  user: User | null
  hasCarryOver: boolean
  onRequestLogout: () => any
}

export function Menu(props: Props & NavigationScreenProps) {
  const { user, hasCarryOver, navigation, onRequestLogout } = props
  return (
    <PageContainer>
      <View style={{ flex: 1 }}>
        {user ? (
          <>
            <View
              styleName="horizontal"
              style={{ padding: 16, alignItems: "center" }}
            >
              <View style={{ marginRight: 16 }}>
                <Image
                  styleName="small-avatar"
                  source={{ uri: user.photoUrl }}
                />
              </View>
              <View>
                <Subtitle>{user.name}</Subtitle>
              </View>
            </View>
            <Divider styleName="line" />
          </>
        ) : null}
        {hasCarryOver === true ? (
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => navigation.navigate("JournalList")}
              styleName="clear full-width action"
              style={{ justifyContent: "flex-start" }}
            >
              <Icon name="page" />
              <Text>記録一覧</Text>
            </Button>
            <Button
              onPress={() => alert("TODO: 実装")}
              styleName="clear full-width action"
              style={{ justifyContent: "flex-start" }}
            >
              <Icon name="page" />
              <Text>譲受許可証一覧</Text>
            </Button>
          </View>
        ) : null}

        <View style={{ flex: 1 }}>
          <Divider styleName="line" />

          <Button
            onPress={() => alert("TODO: 実装")}
            styleName="clear full-width action"
            style={{ justifyContent: "flex-start" }}
          >
            <Icon name="missing" />
            <Text>ヘルプ</Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("Terms")}
            styleName="clear full-width action"
            style={{ justifyContent: "flex-start" }}
          >
            <Icon name="about" />
            <Text>利用規約</Text>
          </Button>
          <Button
            onPress={onRequestLogout}
            styleName="clear full-width action"
            style={{ justifyContent: "flex-start" }}
          >
            <Icon name="exit-to-app" />
            <Text>ログアウト</Text>
          </Button>
        </View>
      </View>
    </PageContainer>
  )
}
