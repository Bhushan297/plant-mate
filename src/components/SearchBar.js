import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
	return (
		<View style={styles.backgroundStyle}>
			<Feather name="search" fill="#86EAB6" style={styles.iconStyle} />
			<TextInput
				value={term}
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Search"
				style={styles.inputStyle}
				onChangeText={onTermChange}
				onSubmitEditing={onTermSubmit}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundStyle: {
		height: 50,
		backgroundColor: '#EEFCF5',
		borderColor: '#2FDA82',
		borderWidth: 1,
		marginHorizontal: 10,
		marginVertical: 5,
		borderRadius: 8,
		flexDirection: 'row',
		alignContent: 'center',
		marginBottom: 10,
	},
	inputStyle: {
		flex: 1,
		padding: 10,
		fontSize: 18,
	},
	iconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginHorizontal: 10,
		color: '#2FDA82',
	},
});

export default SearchBar;