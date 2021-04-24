import React, { useState, useEffect, useRef, useContext } from "react";
import {  View, StyleSheet, Modal, Animated, ToastAndroid, TouchableOpacity, FlatList } from "react-native";
import {Text, Button, Layout, Card, Spinner, List, ListItem} from "@ui-kitten/components";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import plants from '../api/plants';
import FadeinView from '../components/FadeinView';
import LocalizationContext from '../components/Translation';
import i18n from 'i18n-js';

export default function PicUploadScreen({parent}) {
	const [image, setImage] = useState(null);
	const [waiting, setWaiting] = useState(false);
	const [visible, setVisible] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const {initializeAppLanguage } = useContext(
		LocalizationContext
	);

	let help = i18n.t('helpList')

	useEffect(() =>{
		initializeAppLanguage();
	},[i18n.locale])

	const openModal = () => {
		setVisible(true);
	}

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
			alert("Permission to access gallery is required!");
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
			<Modal
				visible={visible}
				animationType={'slide'}
				transparent={true}
				
			>
				<FadeinView style={styles.backdrop}>
					<Card style={{ elevation: 5, width: 300 }} disabled={true}>
						<Text category="s1">
							{i18n.t('helpModalTitle')}
						</Text>
						<List
							style={styles.list}
							data={help}
							showsVerticalScrollIndicator={false}
							keyExtractor={(help) => help.id.toString()}
							renderItem={({ item}) => {
								return (
									<ListItem title={`${item.id + 1}) ${item.data}`}/>
								);
							}}
						/>
						<Button
							style={styles.buttonStyle}
							status="danger"
							onPress={() => setVisible(false)}
						>
							{i18n.t('buttonDismiss')}
						</Button>
					</Card>
				</FadeinView>
			</Modal>
			<TouchableOpacity
				style={styles.floating}
				activeOpacity={0.8}
				onPress={openModal}
			>
				<FontAwesome name="question" size={24} color="white" />
			</TouchableOpacity>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		flexDirection: 'row',
		textAlign: 'center',
		marginVertical: 15,
	},
	floating: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2FDA82',
		width: 50,
		height: 50,
		borderRadius: 50,
		position: 'absolute',
		bottom: 10,
		right: 10,
		elevation: 3,
	},
	list: {
		maxHeight: 300,
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15
	},
	buttonStyle: {
		marginVertical: 5
	}
});
