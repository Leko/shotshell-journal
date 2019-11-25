import React from "react"
import { Text, Icon, Button as ShoutemButton } from "@shoutem/ui"

// FIXME: Move to @types
type IconName =
  | "sidebar"
  | "back"
  | "close"
  | "left-arrow"
  | "right-arrow"
  | "up-arrow"
  | "down-arrow"
  | "drop-down"
  | "share"
  | "share-android"
  | "add-to-favorites-off"
  | "add-to-favorites-on"
  | "play"
  | "pause"
  | "edit"
  | "refresh"
  | "web"
  | "email"
  | "pin"
  | "address"
  | "facebook"
  | "linkedin"
  | "tweet"
  | "cart"
  | "add-to-cart"
  | "add-event"
  | "comment"
  | "call"
  | "activity"
  | "friends"
  | "add-friend"
  | "unfriend"
  | "settings"
  | "take-a-photo"
  | "error"
  | "news"
  | "like"
  | "search"
  | "users"
  | "user-profile"
  | "social-wall"
  | "books"
  | "folder"
  | "events"
  | "photo"
  | "music-video"
  | "radio"
  | "podcasts"
  | "about"
  | "notifications"
  | "exit-to-app"
  | "restaurant-menu"
  | "products"
  | "deals"
  | "restaurant"
  | "more-horizontal"
  | "rss-feed"
  | "missing"
  | "home"
  | "checkbox-on"
  | "checkbox-off"
  | "radiobutton-on"
  | "radiobutton-off"
  | "minus-button"
  | "plus-button"
  | "clear-text"
  | "receipt"
  | "history"
  | "gift"
  | "loyalty-card"
  | "trophy"
  | "lock"
  | "stamp"
  | "turn-off"
  | "stop"
  | "equalizer"
  | "page"
  | "rsvp"
  | "github"
  | "link"
  | "my-location"
  | "laptop"
  | "directions"
  | "maps"
  | "uber"
  | "instagram"

type Props = {
  label: string
  secondary?: boolean
  action?: boolean
  icon?: IconName
  disabled?: boolean
  onPress: () => any
}

export function Button(props: Props) {
  const { label, secondary, action, icon, disabled, onPress } = props
  return (
    <ShoutemButton
      styleName={[
        secondary ? "secondary" : "",
        action ? "action" : "",
        disabled ? "muted" : "",
      ].join(" ")}
      disabled={disabled}
      onPress={onPress}
    >
      {icon ? <Icon name={icon} /> : null}
      <Text>{label}</Text>
    </ShoutemButton>
  )
}
