import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../views/Home/HomeScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";
import LoginScreen from "../views/Login/LoginScreen";
import RegisterScreen from "../views/Register/RegisterScreen";
import HistoryScreen from "../views/History/HistoryScreen";

import { StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Header from "../components/Header";
import SalaDetails from "../views/RoomDetail/RoomDetail";
import HeaderRoom from "../components/HeaderRoom";
import HeaderProfile from "../components/HeaderProfile";
import HeaderPassword from "../components/HeaderPassword";
import ProfileDetail from "../views/ProfileDetail/ProfileDetail";
import ChangeProfile from "../views/ChangeProfile";
import RoomScreenAdmin from "../views/RoomScreenAdmin";
import HeaderRoomScreen from "../components/HeaderRoomScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: styles.bottomTab
        }}>
            <Tab.Screen 
                name='Home'
                component={HomeScreen} 
                options={{
                    tabBarLabel:"Inicio", 
                    tabBarLabelStyle:{color: "white"},
                    header: () => <Header />,
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Entypo name="home" size={24} color="white" />
                    ) : (
                        <AntDesign name="home" size={24} color="white" />
                    )
                }}
            />
            <Tab.Screen 
                name='History'
                component={HistoryScreen} 
                options={{
                    tabBarLabel:"Historial", 
                    tabBarLabelStyle:{color: "white"},
                    header: () => <Header />,
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Octicons name="history" size={24} color="white" />
                    ) : (
                        <SimpleLineIcons name="clock" size={24} color="white" />
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarLabel:"Mi Perfil", 
                    tabBarLabelStyle:{color: "white"},
                    header: () => <HeaderProfile />,
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Ionicons name="person" size={24} color="white" />
                    ) : (
                        <Ionicons name="person-outline" size={24} color="white" />
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
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}}/>  
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false,}}/>  
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false,}}/>
                <Stack.Screen name="SalaDetails" component={SalaDetails} options={{header: () => <HeaderRoom />,}}/>
                <Stack.Screen name="ProfileDetail" component={ProfileDetail} options={{headerShown: false,}}/>
                <Stack.Screen name="ChangePassword" component={ChangeProfile} options={{header: () => <HeaderPassword />,}}/>
                <Stack.Screen name="RoomScreenAdmin" component={RoomScreenAdmin} options={{header: () => <HeaderRoomScreen />,}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    bottomTab: {
        backgroundColor: "#180000",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        shadowOpacity: 4,
        elevation: 4,
        shadowOffset:{
            width: 0,
            height: -4
        },
        borderTopWidth: 0,
    }
})

export default Navigation;