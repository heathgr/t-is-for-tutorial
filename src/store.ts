import { createStore } from 's-is-for-store'

export interface City {
  id: number,
  name: string,
  detailId: number,
}

export interface Details {
  area: number,
  founded: string,
  id: number,
  population: number,
  timeZone: string,
}

export interface AppState {
  cities: City[],
  currentCity: number,
  details: Details | null,
  isWorking: boolean,
}

const initialState: AppState = {
  cities: [{
    id: 0,
    name: '---',
    detailId: 0,
  }],
  currentCity: 0,
  details: null,
  isWorking: true,
}

const store = createStore<AppState>(initialState)
const { resolveState } = store

export const setIsWorking = (status: boolean) => resolveState((getState) => ({
  ...getState(),
  isWorking: status,
}))

export const getCities = () => resolveState(async (getState) => {
  const citiesRequest = await fetch('http://localhost:3001/cities?_sort=name')
  const cities = await citiesRequest.json() as City[]

  return {
    ...getState(),
    cities,
  }
})

export const setCurrentCity = (currentCity: number) => resolveState((getState) => ({
  ...getState(),
  currentCity,
}))

export const getDetails = () => resolveState(async (getState) => {
  const { cities, currentCity: currentCityId } = getState()
  const currentCity = cities[currentCityId]
  const detailsRequest = await fetch(`http://localhost:3001/details/${currentCity.detailId}`)
  const details = await detailsRequest.json() as Details
  return {
    ...getState(),
    details,
  }
})

export const initializeApp = async () => {
  await setIsWorking(true)
  await getCities()
  await getDetails()
  await setIsWorking(false)
}

export const changeCity = async (newCityId: number) => {
  await setIsWorking(true)
  await setCurrentCity(newCityId)
  await getDetails()
  await setIsWorking(false)
}

export default store
