import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const navigator = createStackNavigator(
	{
		Login: LoginScreen,
	},
	{
		initialRouteName: 'Login',
		defaultNavigationOptions: {
			title: 'Plant Mitra',
			headerStyle: {
				backgroundColor: '#22BF6E',
			},
			headerTintColor: 'white',
			headerTitleAlign: 'center',
		},
	}
);

const App = createAppContainer(navigator);

export default () => {
	let [fontsLoaded] = useFonts({
		'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
		'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
		'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
	});
	if (!fontsLoaded) {
    	return <AppLoading />;
  	} else {
		return (
			<>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider
					{...eva}
					theme={{ ...eva.light, ...theme }}
					customMapping={mapping}
				>
					<App />
				</ApplicationProvider>
			</>
		);
	}
};