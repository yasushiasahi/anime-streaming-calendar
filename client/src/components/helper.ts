import { statusMessege } from "../util/type/type"
import { InputText } from "./Header"

export const isValid = ({ name = "", pass = "", passRe = "" }: InputText): statusMessege => {
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
  if (pass !== passRe) {
    m.push("パスワードの入力が一致しません")
  }
  return m
}
