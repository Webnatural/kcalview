import React from 'react';
import { IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import CameraScreen from '@components/screens/camera';
import HomeScreen from '@components/screens/home';
import RecipesScreen from '@components/screens/recipes';
import { styles } from './index.styles';

// https://articles.wesionary.team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181

const Tab = createBottomTabNavigator();
export default function Tabs() {
    return (
        <NavigationContainer independent>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ],
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Camera') {
                            iconName = 'camera';
                        } else if (route.name === 'Recipes') {
                            iconName = 'receipt';
                        }

                        return <IconButton icon={iconName} size={size} iconColor={color} />;
                    },

                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Camera" component={CameraScreen} />
                <Tab.Screen name="Recipes" component={RecipesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}