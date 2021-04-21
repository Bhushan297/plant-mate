import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import useResults from '../hooks/useResults';
import PlantDetails from '../components/PlantDetails';
import LocalizationContext from '../components/Translation';
import i18n from 'i18n-js';

const HomeScreen = ({parent}) => {
	const [term, setTerm] = useState('');
	const [results, waiting, errorMessage, searchApi] = useResults();
	const { initializeAppLanguage } = useContext(
		LocalizationContext
	);

	useEffect(() => {
		initializeAppLanguage();
		searchApi();
	}, [i18n.locale])

	return (
		<Layout level="2" style={styles.container}>
			{errorMessage ? <Text>{errorMessage}</Text> : null}
			{results.length == 0 ? 
				(
					<Spinner size="giant" />
				) : 
				(
					<FlatList
						data={results}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						keyExtractor={(result) => result.id.toString()}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									onPress={() =>
										parent.navigate('PlantShow', {
											data: item,
										})
									}
									style={styles.image}
								>
									<PlantDetails result={item} />
								</TouchableOpacity>
							);
						}}
					/>
				)
			}
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		alignItems: 'center'
	},
	image: {
		marginBottom: 5,
	},
});

export default HomeScreen;


