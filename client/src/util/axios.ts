import axios, { AxiosResponse, AxiosError } from "axios"
import User from "./type/user"
import { type } from "os"
import { log } from "util"

interface responseBody {
  OK: boolean
  Query: string | User
}

export interface ApiResponse {
  status: boolean
  body: responseBody
}

export enum url {
  signin,
  login,
  checkSession,
  getService,
}

interface Table { }
type ApiPath = string
const axiosWrapper = async (p: ApiPath, t: Table): Promise<ApiResponse> => {
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

export const api = async (n: number, b: any): Promise<responseBody> => {
  const { status, body }: ApiResponse = await axiosWrapper(url[n], b)
  if (!status) {
    return { OK: false, Query: "サーバーとの通信に失敗しました" }
  }

  if (!body.OK) {
    return { OK: false, Query: body.Query }
  }

  return { OK: true, Query: body.Query }
}
