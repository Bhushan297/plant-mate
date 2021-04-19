import React, {useState} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPassScreen from './src/screens/ForgotPassScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import TabsScreen from './src/components/TabNavigator';
import PlantShowScreen from './src/screens/PlantShowScreen';

const screenName = SecureStore.getItemAsync("loggedIn")=="true"? 'Tabs' : 'Login'

const navigator = createStackNavigator(
	{
		Login: LoginScreen,
		// Tabs: {
		// 	screen: TabsScreen,
		// 	navigationOptions: {
		// 		headerLeft: ()=> null,
		// 	},
		// },
		Tabs: TabsScreen,
		PlantShow: PlantShowScreen,
		Register: RegisterScreen,
		ForgotPass: ForgotPassScreen,
	},
	{
		initialRouteName: screenName,
		defaultNavigationOptions: {
			title: 'Plant Mitra',
			headerStyle: {
				backgroundColor: '#2FDA82',
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
  	}
	else {
		return (
			<>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider
					{...eva}
					theme={{ ...eva.light, ...theme }}
					customMapping={mapping}
				>
					<App/>
				</ApplicationProvider>
			</>
		);
	}
};