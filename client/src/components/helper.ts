import { statusMessege } from "../util/type/type"
import { InputText } from "./Header"

/*
 * Header
 */
const getMonthLength = (month: number): number => {
  if (month === 2) {
    const year = new Date().getFullYear()
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
  }
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
}

export const getWeek = (): number[] => {
  const now = new Date()
  const month = now.getMonth() + 1
  const today = now.getDate()
  const day = now.getDay()
  let week = [today]
  let idx: number
  /*
   * today当日とday(0~7)曜日を基準にlength 7の配列を作る
   */
  if (day === 0) {
    for (let i = 1; i < 7; i++) {
      week.unshift(today - i)
    }
  } else {
    for (let i = 1; i < day; i++) {
      week.unshift(today - i)
    }
    for (let i = 1; i < 8 - day; i++) {
      week.push(today + i)
    }
  }
  /*
   * 配列に0が含まれている(前月と今月をまたいでいる)場合
   */
  idx = week.findIndex((n) => n === 0)
  if (idx !== -1) {
    const newWeek: number[] = []
    for (let i = 0; i < idx + 1; i++) {
      newWeek.push(getMonthLength(month - 1) - i)
    }
    week = newWeek.reverse().concat(week.slice(-6 + idx))
    return week
  }
  /*
   * 配列に当月の日数+1が含まれている(今月と来月をまたいでいる)場合
   */
  idx = week.findIndex((n) => n === getMonthLength(month) + 1)
  if (idx !== -1) {
    const newWeek: number[] = []
    for (let i = 1; i < 8 - idx; i++) {
      newWeek.push(i)
    }
    week = week.slice(0, idx).concat(newWeek)
    return week
  }
  return week
}

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
