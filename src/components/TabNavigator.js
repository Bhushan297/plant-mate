import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Layout, Text, Icon } from '@ui-kitten/components';
import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator();

const UploadScreen = () => {
	return (
		<Layout
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text>Uploader!</Text>
		</Layout>
	);
};

const SettingsScreen = () => {
	return (
		<Layout
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text>Settings!</Text>
		</Layout>
	);
};

export default TabNavigation = ({ navigation }) => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarPosition="bottom"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused ? 'home' : 'home-outline';
						} else if (route.name === 'Settings') {
							iconName = focused ? 'settings' : 'settings-outline';
						} else if (route.name === 'Upload') {
							iconName = focused ? 'camera' : 'camera-outline';
						}

						return <Icon name={iconName} fill="#2FDA82" />;
					},
				})}
				tabBarOptions={{
					activeTintColor: '#2FDA82',
					inactiveTintColor: 'gray',
					showIcon: true,
					iconStyle: {
						width: 32,
						height: 32,
					},
					showLabel: false,
					indicatorStyle: {
						backgroundColor: '#2FDA82',
					},
				}}
			>
				<Tab.Screen
					name="Home"
					children={() => <HomeScreen parent={navigation} />}
				/>
				<Tab.Screen name="Upload" component={UploadScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
