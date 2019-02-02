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

// Creates the store for the app state.
const store = createStore<AppState>(initialState)
// Exposes the store's resolve state function.
const { resolveState } = store

/**
 * Sets the `isWorking` state property to true or false.
 * Setting `isWorking` to true signifies that the app is in the middle of an http request.
 * @param status True if the app is in the middle of an http request.  False if the app is not
 */
export const setIsWorking = (status: boolean) => resolveState((getState) => ({
  ...getState(),
  isWorking: status,
}))

/**
 * Makes an HTTP request to fetch the available cities.
 * Once the HTTP request is complete, the `cities` property is set to the result.
 */
export const getCities = () => resolveState(async (getState) => {
  const citiesRequest = await fetch('http://localhost:3001/cities?_sort=name')
  const cities = await citiesRequest.json() as City[]

  return {
    ...getState(),
    cities,
  }
})

/**
 * Sets the `currentCity` state property.
 * @param currentCity The index of the city that will be focused on.
 */
export const setCurrentCity = (currentCity: number) => resolveState((getState) => ({
  ...getState(),
  currentCity,
}))

/**
 * Makes an http request to retrieve the details of the current city.
 * The `details` state is set to the result of the request.
 */
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

/**
 * Called when the app is initialized.
 * It retrieves the available cities and gets the details of the first city.
 */
export const initializeApp = async () => {
  await setIsWorking(true)
  await getCities()
  await getDetails()
  await setIsWorking(false)
}

/**
 * Sets the current city and retrieves its details.
 * @param newCityId The new current city.
 */
export const changeCity = async (newCityId: number) => {
  await setIsWorking(true)
  await setCurrentCity(newCityId)
  await getDetails()
  await setIsWorking(false)
}

export default store
