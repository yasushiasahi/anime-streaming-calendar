export type statusMessege = string[]
export type Set = (m: statusMessege, initFlag?: boolean) => void

export interface Service {
  id: number
  name: string
  url: string
  flag?: boolean
}

export const newService = () => {
  const s: Service = {
    id: 0,
    name: "",
    url: "",
  }
  return s
}
