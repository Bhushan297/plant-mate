import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Layout, Text, Icon, Button} from '@ui-kitten/components';
import HomeScreen from '../screens/HomeScreen';
import FaqScreen from '../screens/FaqScreen';
import SettingsScreen from '../screens/SettingScreen';
import PicUploadScreen from '../screens/PicUploadScreen';

const Tab = createMaterialTopTabNavigator();

export default TabNavigation = ({ navigation }) => {
	return (
		<NavigationContainer>
			<StatusBar barStyle="light-content" backgroundColor="#2FDA82" />
			<Tab.Navigator
				tabBarPosition="bottom"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused ? 'home' : 'home-outline';
						} else if (route.name === 'Settings') {
							iconName = focused
								? 'settings'
								: 'settings-outline';
						} else if (route.name === 'Upload') {
							iconName = focused ? 'camera' : 'camera-outline';
						} else if (route.name === 'FAQ') {
							iconName = focused
								? 'question-mark-circle'
								: 'question-mark-circle-outline';
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
				<Tab.Screen name="Upload" component={PicUploadScreen} />
				<Tab.Screen name="FAQ" component={FaqScreen} />
				<Tab.Screen
					name="Settings"
					children={() => <SettingsScreen parent={navigation} />}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};
