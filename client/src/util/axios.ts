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

interface Table { }
type ApiPath = string
export const api = async (p: ApiPath, t: Table): Promise<ApiResponse> => {
  return await axios
    .post(`api/${p}`, t)
    .then((r: AxiosResponse) => {
      console.log(r.data.Query)
      return {
        status: true,
        body: r.data,
      }
    })
    .catch((err: AxiosError) => {
      console.log(err)
      return {
        status: false,
        body: null,
      }
    })
}

export const checkSession = async (): Promise<responseBody> => {
  const { status, body }: ApiResponse = await api("checkSession", {})
  if (!status) {
    return { OK: true, Query: "サーバーとの通信に失敗しました" }
  }

  if (!body.OK) {
    return { OK: false, Query: body.Query }
  }

  return { OK: true, Query: body.Query }
}
