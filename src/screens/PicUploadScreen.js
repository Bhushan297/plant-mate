import React, { useState, useEffect, useContext } from "react";
import { View, ToastAndroid } from "react-native";
import {Layout, Text, Button, Spinner} from "@ui-kitten/components";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import plants from '../api/plants';
import LocalizationContext from '../components/Translation';
import i18n from 'i18n-js';

export default function PicUploadScreen({parent}) {
	const [image, setImage] = useState(null);
	const [waiting, setWaiting] = useState(false);
	const {initializeAppLanguage } = useContext(
		LocalizationContext
	);

	useEffect(() =>{
		initializeAppLanguage();
	},[i18n.locale])

	const callApi = async (dataUri) => {
		var formData = new FormData();
		let file = {
			uri: dataUri, 
			type: 'multipart/form-data', 
			name: dataUri
		};

		formData.append('image', file)
		try {
			const resultApi = await plants.post(i18n.t('predictApi') , formData);
			let dataToPass = resultApi.data.pred;
			dataToPass["image_url"]=  dataUri;
			setWaiting(false)
			parent.navigate('PlantShow', {data:dataToPass})
		} catch(err) {
			setWaiting(false)
			ToastAndroid.show("Some error occured, Please try again!", ToastAndroid.SHORT)
		}
	}

	let openCamera = async () => {
		let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera is required!");
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			// base64: true,
		});
	  
		if (!result.cancelled) {
			setWaiting(true);
			setImage(result.uri);
			callApi(result.uri);
		}
		
	};

	let openImagePicker = async () => {
		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			// base64: true,
		});

		if (!result.cancelled) {
			setWaiting(true)
			setImage(result.uri);
			callApi(result.uri);
		}
		
		

	};

	return (
		<Layout
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Button onPress={openCamera}> <MaterialIcons name="add-a-photo" size={40} color="white" /> </Button>
			<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
				<View
					style={{height: 1, width: 100, backgroundColor: 'black' }}
				/>
				<View>
					<Text style={{ width: 50, textAlign: 'center'  }}>
						{ waiting ? <Spinner status='success' size='large'/> : i18n.t('predictOr')}
					</Text>
				</View>
				<View
					style={{height: 1, width: 100, backgroundColor: 'black' }}
				/>
			</View>
			<Button onPress={openImagePicker}> <MaterialIcons name="add-photo-alternate" size={40} color="white" /> </Button>
		</Layout>
	);
}
