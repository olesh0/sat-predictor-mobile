import React, { useState, lazy, Suspense } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'

// Importing screens
import { Chevron } from '../components/icons/Chevron'
import LoadingScreen from '../views/LoadingScreen'
import { useTheme } from './Theme'

const INITIAL_SCREEN = '__PASSES__'

const context = React.createContext({
  currentScreen: null,
  paramsToPass: {},
  screens: [],
  changeScreen: () => {},
})

const nonMenuItems = [
  {
    name: '__PASS__',
    title: ({ satName }) => `Pass - ${satName}`,
    component: lazy(() => import('../views/Pass')),
  },
]

const menuItems = [
  {
    name: '__PASSES__',
    title: () => 'Upcoming passes overhead',
    component: lazy(() => import('../views/Passes')),
  },
  {
    name: '__SUN_AND_MOON__',
    title: () => 'Sun & Moon',
    component: lazy(() => import('../views/SunAndMoon')),
  },
  {
    name: '__USER_COORDS__',
    title: () => 'User coords',
    component: lazy(() => import('../views/UserCoords')),
  },
  {
    name: '__THEMES__',
    title: () => 'Themes',
    component: lazy(() => import('../views/Themes')),
  },
]

const width = Dimensions.get('window').width

export const NavigationProvider = ({ children }) => {
  const { Provider } = context

  const screens = React.useMemo(() => [
    ...nonMenuItems,
    ...menuItems.map((item) => ({ ...item, inMenuList: true })),
  ], [nonMenuItems, menuItems])

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
  const { theme } = useTheme()

  const MenuStyles = MenuStylesGenerator(theme)

  const {
    currentScreen: CurrentScreen,
    paramsToPass = {},
    screens,
    changeScreen,
  } = useNavigation()

  const menuListRoutes = screens.filter(({ inMenuList }) => inMenuList)

  return (
    <Suspense
      fallback={
        <LoadingScreen />
      }
    >
      <View style={MenuStyles.wrapper}>
        <Text style={MenuStyles.heading}>Sat Predictor</Text>

        <ScrollView style={MenuStyles.content}>
          {
            CurrentScreen
            && CurrentScreen.component
            && <CurrentScreen.component params={paramsToPass} />
          }
        </ScrollView>

        <TouchableOpacity
          style={[
            MenuStyles.menu,
            showFullMenu ? MenuStyles.fullMenu : {},
          ]}
          onPress={() => setShowFullMenu(!showFullMenu)}
        >
          {!showFullMenu && (
            <Text
              style={{
                fontSize: 15,
                color: theme.colors.colorFontDark,
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
                fontFamily: "Orbitron-Regular",
              }}
            >
              {CurrentScreen && CurrentScreen.title(paramsToPass)}

              <View
                style={{
                  transform: [{ scale: 1.3 }],
                }}
              >
                <Chevron style={{ marginLeft: 5, marginBottom: 2 }} />
              </View>
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
                      <Text
                        style={{
                          color: item.name === CurrentScreen.name ? theme.colors.colorAccentGreen : theme.colors.colorFontDark,
                          fontFamily: "Orbitron-Regular",
                        }}
                      >{item.title()}</Text>
                    </TouchableOpacity>
                  )
                }}
              />
            </ScrollView>
          )}
        </TouchableOpacity>
      </View>
    </Suspense>
  )
}

export const useNavigation = () => {
  return React.useContext(context)
}


const MenuStylesGenerator = (theme) => (
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    navItem: {
      paddingVertical: 20,
      backgroundColor: "transparent",
      alignSelf: "stretch",
      textTransform: "uppercase",
      paddingHorizontal: 10,
      fontFamily: "Arial",
      borderBottomColor: theme.colors.colorFontDark,
      borderBottomWidth: 1,
      width,
    },
    content: {
      flex: 1,
    },
    menu: {
      padding: 20,
      backgroundColor: theme.colors.colorBgLight,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    fullMenu: {
      flex: 1,
    },
    heading: {
      fontSize: 18,
      fontFamily: "Orbitron-Medium",
      color: theme.colors.colorFontDark,
      margin: 20,
      marginBottom: 0,
      marginTop: 40,
    },
  })
)