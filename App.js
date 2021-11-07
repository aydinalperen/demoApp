import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    StatusBar,
    Image
} from 'react-native';
import Home from "./src/screens/Home";
import Detail from "./src/screens/Detail";

const Stack = createNativeStackNavigator();

const App = () => {

    const headerOptions = {
        headerTitle: () => <Image
            source={require("./src/assets/header.png")}
            style={{
                width: '50%',
                height: 30,
            }}
            resizeMode="contain"
            resizeMethod="resize"
        />,
        headerStyle: {backgroundColor: '#fff'},
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTintColor: '#02b1c8',
    };

    return (

        <NavigationContainer>
            <StatusBar barStyle="dark-content"/>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={headerOptions} />
                <Stack.Screen name="Detail" component={Detail} options={headerOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
