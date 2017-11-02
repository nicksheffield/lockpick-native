import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Contact extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the contact screen.</Text>
				<Text>You could put whatever you want here.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
