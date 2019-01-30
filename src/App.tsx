import { StoreProvider } from '@s-is-for-store/react'
import React, {StatelessComponent} from 'react';
import store, { AppState, Details, changeCity } from './store'

import './App.css'

const App = () => (
  <StoreProvider<AppState> store={store}>
    {
      (state) => (
        <div className='App'>
          <h2>{`${state.cities[state.currentCity].name} Fact Sheet`}</h2>
          <section>
             <div className='detail'>
              <div className='label'>Area</div>
              <div className='value'>{`${state.details && state.details.area}km`}</div>
             </div>
             <div className='detail'>
              <div className='label'>Founded</div>
              <div className='value'>{state.details && state.details.founded}</div>
             </div>
             <div className='detail'>
              <div className='label'>Population</div>
              <div className='value'>{state.details && state.details.population}</div>
             </div>
             <div className='detail'>
              <div className='label'>Time Zone</div>
              <div className='value'>{state.details && state.details.timeZone}</div>
             </div>
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
