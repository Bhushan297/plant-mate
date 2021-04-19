import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import {Layout, Text, Button, Icon} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import plants from '../api/plants';

export default function PicUploadScreen() {
	const [image, setImage] = useState(null);

	const callApi = async (blob) =>{
		try {
			var formData = new FormData();
			formData.append('image', blob)
            const response = await plants.post('/predict' , formData, {
				headers: {
				 	'content-type': 'multipart/form-data' // do not forget this 
				}})
            console.log(response);
        } catch(err) {
            console.log(err);
            // setErrorMessage('Something went wrong');
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
			const response = await fetch(result.uri);
			const blob = await response.blob();
			var formData = new FormData();
			formData.append('image', blob, 'test.jpg')
            const response1 = await plants.post('/predict' , formData, {
				headers: {
				 	'content-type': 'multipart/form-data' // do not forget this 
				}})
            console.log(response1);
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
