import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	LayoutAnimation,
	Platform,
	UIManager,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons'; 

const Accordian = ({ title, description }) => {
    const [expanded, setExpanded] = useState(false);

    if (Platform.OS === 'android') {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }

    return (
		<View>
			<TouchableOpacity style={styles.container} onPress={() => toggle()}>
				<Text 
                    category="s1" 
                    style={styles.title} 
                    numberOfLines={ expanded ? 3 : 1 }
                >
					{title}
				</Text>
				<Ionicons
					name={expanded ? 'caret-up' : 'caret-down'}
					size={24}
					color="black"
				/>
			</TouchableOpacity>
			{expanded && (
				<View style={styles.child}>
					<Text>{description}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: '#13293D',
        width: 300
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 20,
		marginHorizontal: 10,
		marginBottom: 5,
	},
	child: {
		padding: 20,
		marginHorizontal: 10,
		marginBottom: 5,
		backgroundColor: '#D1D5DB',
		borderRadius: 5,
	},
});

export default Accordian;