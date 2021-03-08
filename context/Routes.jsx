import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native'

import Passes from '../views/Passes'
import Pass from '../views/Pass'

const INITIAL_SCREEN = '__PASSES__'

const context = React.createContext({
  currentScreen: null,
  paramsToPass: {},
  screens: [],
  changeScreen: () => {},
})

export const NavigationProvider = ({ children }) => {
  const { Provider } = context

  const screens = React.useMemo(() => [
    {
      name: '__PASSES__',
      title: 'Passes',
      inMenuList: true,
      component: Passes,
    },
    {
      name: '__PASS__',
      title: 'Pass',
      inMenuList: true,
      component: Pass,
    },
  ])

  const [currentScreen, setCurrentScreen] = React.useState(null)
  const [paramsToPass, setParamsToPass] = React.useState(null)

  const changeScreen = (screenName, params = {}) => {
    const screen = screens.find(({ name }) => screenName === name)

    console.log('changing screen...', { screenName, params }, screen)

    if (!screen) return

    params && setParamsToPass(params)

    setCurrentScreen(screen)
  }

  React.useEffect(() => {
    changeScreen(INITIAL_SCREEN)
  }, []);

  return (
    <Provider
      value={{
        currentScreen,
        paramsToPass,
        screens,
        changeScreen,
      }}
    >
      {children}
    </Provider>
  )
}

export const Routes = () => {
  const [showFullMenu, setShowFullMenu] = useState(false)

  const {
    currentScreen: CurrentScreen,
    paramsToPass = {},
    screens,
    changeScreen,
  } = useNavigation()

  const menuListRoutes = screens.filter(({ inMenuList }) => inMenuList)

  return (
    <View style={MenuStyles.wrapper}>
      <Text style={MenuStyles.heading}>Sat Predictor</Text>

      <ScrollView style={MenuStyles.content}>
        {CurrentScreen && CurrentScreen.component && <CurrentScreen.component params={paramsToPass} />}
      </ScrollView>

      <TouchableOpacity
        style={[
          MenuStyles.menu,
          showFullMenu ? MenuStyles.fullMenu : {},
        ]}
        onPress={() => {
          setShowFullMenu(!showFullMenu)
          console.log('show full menu:', !showFullMenu)
        }}
      >
        {!showFullMenu && (
          <Text style={{ fontSize: 20, color: "#FFF" }}>
            {CurrentScreen && CurrentScreen.title}
          </Text>
        )}

        {showFullMenu && (
          <ScrollView>
            <FlatList
              contentContainerStyle={MenuStyles.screensList}
              data={menuListRoutes || []}
              numColumns={1}
              keyExtractor={(_, index) => `menu-item-${index}` }
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={MenuStyles.navItem}
                    onPress={() => {
                      changeScreen(item.name)
                      setShowFullMenu(false)
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>{item.title}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </ScrollView>
        )}
      </TouchableOpacity>
    </View>
  )
}

export const useNavigation = () => {
  return React.useContext(context)
}


const MenuStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  navItem: {
    paddingVertical: 20,
    backgroundColor: "transparent",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Arial",
  },
  content: {
    flex: 1,
  },
  menu: {
    padding: 20,
    backgroundColor: "#242729",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fullMenu: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5F6D77",
    margin: 20,
    marginBottom: 5,
    marginTop: 30,
  },
})
