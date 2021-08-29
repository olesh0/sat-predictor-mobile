import React, { createContext, useContext, useEffect } from 'react'
import { useUserLocation } from '../hooks'

const LocationContext = createContext(null)

export const LocationProvider = ({ children }) => {
  const location = useUserLocation()

  console.log({ USER_LOCATION: location })

  return (
    <LocationContext.Provider value={{ ...location }}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const contextValue = useContext(LocationContext)

  if (contextValue === null) {
    throw new Error('You have to wrap your component in LocationProvider before using its context')
  }

  return contextValue
}
