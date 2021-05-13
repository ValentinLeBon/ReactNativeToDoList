import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={ HomeScreen }
                    optons={{ title:Welcome }}
                />
                <Stack.Screen name="Lists" component={ ListsScreen } />
            </Stack.Navigator>
        </NavigationContainer>
    )
}