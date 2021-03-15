import React, { useContext, useState } from 'react'
import { Dimensions, View } from 'react-native'
import FullPageLoader from '../components/FullPageLoader'

const loaderContext = React.createContext({
  isActive: false,
  actionWithLoader: () => {},
  title: null,
})

export default ({ children }) => {
  const { Provider } = loaderContext

  const [showLoader, setShowLoader] = useState(false)

  return (
    <Provider value={{
      actionWithLoader: (action, delay = 500) => {
        return new Promise(async (resolve) => {
          try {
            setShowLoader(true)
            action && await action()

            return setTimeout(() => {
              setShowLoader(false)
              resolve()
            }, delay)
          } catch (error) {
            setShowLoader(false)
            throw error
          }
        })
      },
    }}>
      <FullPageLoader show={showLoader} />

      <View style={{
        position: "relative",
        zIndex: 50,
        elevation: 5,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}>{children}</View>
    </Provider>
  )
}

export const useLoader = () => useContext(loaderContext)