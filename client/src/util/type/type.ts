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

export interface Work {
  id: number
  name: string
  url: string
  onair: boolean
  userId: number
  flag?: boolean
}

export const newWork = ({
  id = 0,
  name = "",
  url = "",
  onair = true,
  userId = 0,
}): Work => {
  const w: Work = {
    id: 0,
    name: name,
    url: url,
    onair: onair,
    userId: userId,
  }
  return w
}

export interface Schedule {
  id: number
  dayOfWeek: number
  url: string
  userId: number
  workId: number
  serviceId: number
}

export const newSchedule = ({
  id = 0,
  dayOfWeek = -1,
  url = "",
  userId = 0,
  workId = 0,
  serviceId = 0,
}): Schedule => {
  const sd: Schedule = {
    id: id,
    dayOfWeek: dayOfWeek,
    url: url,
    userId: userId,
    workId: workId,
    serviceId: serviceId,
  }
  return sd
}
