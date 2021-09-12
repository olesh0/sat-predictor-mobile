import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  lazy,
  Suspense,
} from 'react'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'

// Importing screens
import { Chevron } from '../components/icons/Chevron'
import LoadingScreen from '../views/LoadingScreen'
import { useTheme } from './Theme'

const INITIAL_SCREEN = '__SUN_PHASES__' // '__SUN_AND_MOON__'

const context = React.createContext({
  currentScreen: null,
  paramsToPass: {},
  screens: [],
  changeScreen: () => {},
})

const menuTransition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

const nonMenuItems = [
  {
    name: '__PASS__',
    title: ({ satellite }) => `Pass - ${satellite.name}`,
    component: lazy(() => import('../views/Pass')),
  },
  {
    name: '__SATELLITE__',
    title: ({ name }) => `Satellite - ${name}`,
    component: lazy(() => import('../views/Satellite')),
  },
  {
    name: '__MONTH_SUN_PHASES__',
    title: ({ monthName }) => `Sun Phase - ${monthName}`,
    component: lazy(() => import('../views/SunPhases/MonthSunPhase')),
  },
]

const menuItems = [
  // temprorary here
  {
    name: '__SUN_PHASES__',
    title: () => `Sun Phases`,
    component: lazy(() => import('../views/SunPhases/SunPhases')),
  },
  {
    name: '__SATELLITES__',
    title: () => 'Satellites list',
    component: lazy(() => import('../views/Satellites')),
  },
  // Commented until the best times
  // {
  //   name: '__PASSES__',
  //   title: () => 'Upcoming passes overhead',
  //   component: lazy(() => import('../views/Passes')),
  // },
  {
    name: '__ISS__',
    title: () => 'ISS',
    component: lazy(() => import('../views/Satellite')),
    meta: {
      satelliteNoradId: 25544,
    },
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
  {
    name: '__CREDITS__',
    title: () => 'Credits',
    component: lazy(() => import('../views/Credits')),
  },
]

const width = Dimensions.get('window').width

export const NavigationProvider = ({ children }) => {
  const { Provider } = context

  const screens = useMemo(() => [
    ...nonMenuItems,
    ...menuItems.map((item) => ({ ...item, inMenuList: true })),
  ], [nonMenuItems, menuItems])

  const [currentScreen, setCurrentScreen] = useState(null)
  const [paramsToPass, setParamsToPass] = useState(null)
  const [metaData, setMetaData] = useState(null)

  const changeScreen = async (screenName, params = {}) => {
    const screen = screens.find(({ name }) => screenName === name)

    if (!screen) return

    setParamsToPass(params)
    setMetaData(screen.meta)
    setCurrentScreen(screen)
  }

  useEffect(() => {
    changeScreen(INITIAL_SCREEN)
  }, []);

  return (
    <Provider
      value={{
        currentScreen,
        paramsToPass,
        screens,
        meta: metaData,
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
    meta: metaData = {},
    screens,
    changeScreen,
  } = useNavigation()

  const menuListRoutes = screens.filter(({ inMenuList }) => inMenuList)
  const ref = useRef()

  return (
    <Suspense
      fallback={
        <LoadingScreen />
      }
    >
      <Transitioning.View
        style={MenuStyles.wrapper}
        transition={menuTransition}
        ref={ref}
      >
        <Text style={MenuStyles.heading}>Sat Predictor</Text>

        <ScrollView style={MenuStyles.content}>
          {
            CurrentScreen
            && CurrentScreen.component
            && (
              <CurrentScreen.component
                params={paramsToPass}
                meta={metaData}
              />
            )
          }
        </ScrollView>

        <TouchableOpacity
          style={[MenuStyles.menu]}
          onPress={() => {
            ref.current.animateNextTransition()
            setShowFullMenu(!showFullMenu)
          }}
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
      </Transitioning.View>
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
      flexGrow: 1,
    },
    fullMenuStyles: {
      flexGrow: 1,
    },
    menu: {
      padding: 20,
      backgroundColor: theme.colors.colorBgLight,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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