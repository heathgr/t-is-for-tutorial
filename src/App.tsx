import { StoreProvider } from '@s-is-for-store/react'
import React, {FunctionComponent} from 'react';
import store, { AppState, Details, changeCity } from './store'

import './App.css'

const numberWithCommas = (x: number) => {
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const Fact: FunctionComponent<{ label: string, value: string | null , isWorking: boolean }> = ({ label, isWorking, value}) => (
  <div className='detail'>
    <div className='label'>{label}</div>
    <div className='value'>{(isWorking || !value) ? '---' : value}</div>
  </div>
)

const App = () => (
  <StoreProvider<AppState> store={store}>
    {
      (state) => (
        <div className={`App ${state.isWorking ? 'working' : ''}`}>
          <h2>{state.isWorking ? '---' : `${state.cities[state.currentCity].name} Fact Sheet`}</h2>
          <section>
            <Fact label='Area' value={`${state.details && numberWithCommas(state.details.area)}km`} isWorking={state.isWorking} />
            <Fact label='Founded' value={state.details && state.details.founded.toString()} isWorking={state.isWorking} />
            <Fact label='Population' value={state.details && numberWithCommas(state.details.population)} isWorking={state.isWorking} />
            <Fact label='Time Zone' value={state.details && state.details.timeZone.toString()} isWorking={state.isWorking} />
          </section>
          <select disabled={state.isWorking} value={state.currentCity} onChange={(evt) => changeCity(Number(evt.currentTarget.value))}>
            {
              state.cities.map((city, id) => <option key={city.id} value={id}>{city.name}</option>)
            }
          </select>
        </div>
      )
    }
  </StoreProvider>
)

export default App
