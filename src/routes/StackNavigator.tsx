import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../views/Home/HomeScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='Home'
                component={HomeScreen} 
                options={{
                    tabBarLabel:"Inicio", 
                    tabBarLabelStyle:{color: "white"},
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Entypo name="home" size={24} color="black" />
                    ) : (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarLabel:"Mi Perfil", 
                    tabBarLabelStyle:{color: "white"},
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Ionicons name="person" size={24} color="black" />
                    ) : (
                        <Ionicons name="person-outline" size={24} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;