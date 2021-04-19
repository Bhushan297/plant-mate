import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';

const SettingScreen = ({parent}) => {

    const logoutCall = async () =>{
        await SecureStore.setItemAsync("loggedIn", "false");
        parent.replace('Login');
    }

    return(
        <Layout level='2' style={styles.container}>
            <Text category='s1'>Plant Mitra v1.0</Text>
            <Button style={styles.logoutBtn} status='danger' onPress={() => logoutCall()}>Log Out</Button>
        </Layout>
    )
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