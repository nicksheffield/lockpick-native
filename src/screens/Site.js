import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button, TouchableOpacity } from 'react-native'
import Title from '../components/title'
import graphql from '../libs/graphql'

const getLogins = `
	query($site_id:Int!){
		logins(site_id: $site_id) {
			id
			username
			password
		}
	}
`

export default class Site extends React.Component {
	constructor() {
		super()

		this.state = {
			loading: true,
			data: {}
		}
	}

	componentDidMount() {
		graphql.query(getLogins, {
			site_id: this.props.navigation.state.params.site.id
		}).then(res => {
			this.setState({
				loading: false,
				data: res.data
			})
		})
	}

	clicked(item) {
		return (event) => {
			console.log('clicked', item)
		}
	}

	render() {
		let site = this.props.navigation.state.params.site
		let logins = this.state.data.logins

		return (
			this.state.loading ? (
				<View style={styles.loader}>
					<ActivityIndicator />
				</View>
			) : (
				<View style={styles.container}>
					<Text>{site.name}</Text>

					{logins.map(login => (
						<View key={login.id} style={styles.item}>
							<Text>{login.username}</Text>
							<Text>{login.password}</Text>
						</View>
					))}
				</View>
			)
		);
	}
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	list: {
		width: '100%',
		borderTopWidth: 1,
		borderTopColor: '#ddd'
	},
	item: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#000'
	},
	subtitle: {
		color: '#999'
	}
});
