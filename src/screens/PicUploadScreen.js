import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import {Layout, Text, Button, Icon} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import plants from '../api/plants';

export default function PicUploadScreen() {
	const [image, setImage] = useState(null);

	const callApi = async (dataUri) => {
		var formData = new FormData();
		let file = {
			uri: dataUri, 
			type: 'multipart/form-data', 
			name: dataUri
		};

		formData.append('image', file)
		try {
			const resultApi = await plants.post('/predict' , formData)
			console.log(resultApi.data)
		} catch(err) {
			console.log(err)
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
			setImage(result.uri);
			callApi(result.uri);
		}
		
		

	};

	return (
		<Layout
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			{image && (
				<Image
					// source={{ uri : 'data:image/jpeg;base64,' + image }}
					source={{ uri : image }}
					style={{ width: 200, height: 200 }}
				/>
			)}
			<Button onPress={openCamera}> Camera </Button>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<View
					style={{ flex: 1, height: 1, backgroundColor: "black" }}
				/>
				<View>
					<Text style={{ width: 50, textAlign: "center" }}>OR</Text>
				</View>
				<View
					style={{ flex: 1, height: 1, backgroundColor: "black" }}
				/>
			</View>
			<Button onPress={openImagePicker}> Image Picker </Button>

		</Layout>
	);
}
