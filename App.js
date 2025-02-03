import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// Theme for React Native Paper
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4CAF50", // Green Accent
    background: "#121212", // Dark Mode
    text: "#FFFFFF",
    card: "#1E1E1E",
  },
};

// Bottom Tab Navigator
function BottomTabNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopWidth: 0 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#B0B0B0",
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#FFF",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerRight: () => (
          <Ionicons
            name="add"
            size={34}
            color="white"
            style={{ marginRight: 15, paddingRight: 10 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recently added",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: "#FFF",
            headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="expenses"
            component={BottomTabNav}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
