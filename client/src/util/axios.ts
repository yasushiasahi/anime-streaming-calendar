import axios, { AxiosResponse, AxiosError } from "axios"
import { Service } from "./type/type"
import User from "./type/user"
import { type } from "os"
import { log } from "util"

interface responseQuery {
  OK: boolean
  Query: any //string | User | Service[]
}

export interface responseBody {
  status: boolean
  body: responseQuery
}

export enum url {
  signin,
  login,
  checkSession,
  getService,
  getWorks,
  getWork,
  updateWork,
  addWork,
  addSchedule,
  getSchedules,
}

interface Table { }
type ApiPath = string
const axiosWrapper = async (p: ApiPath, t: Table): Promise<responseBody> => {
  return await axios
    .post(`api/${p}`, t)
    .then((r: AxiosResponse) => {
      console.log("r: ", r)
      console.log("r.data.Query: ", r.data.Query)
      return {
        status: true,
        body: r.data,
      }
    })
    .catch((err: AxiosError) => {
      console.log("err: ", err)
      return {
        status: false,
        body: null,
      }
    })
}

export const api = async (n: number, b: any): Promise<responseQuery> => {
  const { status, body }: responseBody = await axiosWrapper(url[n], b)
  if (!status) {
    return {
      OK: false,
      Query: "サーバーとの通信に失敗しました。時間をおいてやり直して下さい。",
    }
  }

  if (!body.OK) {
    return { OK: false, Query: body.Query }
  }

  return { OK: true, Query: body.Query }
}
