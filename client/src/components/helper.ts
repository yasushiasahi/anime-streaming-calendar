import { statusMessege } from "../util/type/type"
import { InputText } from "./Header"

/*
 * Login Signin
 */
export const isValid = (
  { name, pass, passRe }: InputText,
  isSignin: boolean = false
): statusMessege => {
  let m: statusMessege = []
  if (name === "") {
    m.push("名前を入力して下さい")
  }
  if (!/.+/.test(name)) {
    m.push("名前の入力が不正です")
  }
  if (!/^[a-zA-Z\d-_~#$%&@:;*+?!,.¥]{4,}$/.test(pass)) {
    m.push("パスワードが不正です")
  }
  if (isSignin && pass !== passRe) {
    m.push("パスワードの入力が一致しません")
  }
  return m
}

/*
 * WorkEditer
 */
export const getDay = (DOW: number): string => {
  const week = [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ]
  return week[DOW]
}
