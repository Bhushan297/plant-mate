import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import LocalizationContext from '../components/Translation';
import i18n from 'i18n-js';

const SettingScreen = ({parent}) => {
    const { setLocale, getLocale, initializeAppLanguage } = useContext(
		LocalizationContext
	);

    const logoutCall = async () =>{
        await SecureStore.setItemAsync("loggedIn", "false");
        parent.replace('Login');
    }

    const changeLanguage = async () => {
        const locale = await SecureStore.getItemAsync('appLanguage');
        if (locale === 'en-US' || locale === 'en'){
            setLocale('hi');
        } else {
            setLocale('en');
        }
    }

    useEffect(() => {
        initializeAppLanguage();
    }, []);

    return (
		<Layout level="2" style={styles.container}>
			<Text category="s1">Plant Mitra v1.0</Text>
			<Button
				style={styles.logoutBtn}
				status="danger"
				onPress={() => logoutCall()}
			>
				{i18n.t('buttonLogout')}
			</Button>
			<Button
				style={styles.logoutBtn}
				status="info"
				onPress={() => changeLanguage()}
			>
				{i18n.t('buttonLanguage')}
			</Button>
		</Layout>
	);
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    logoutBtn: {
        marginVertical: 10
    }
})

export default SettingScreen;