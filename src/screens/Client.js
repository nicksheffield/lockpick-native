import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button, TouchableOpacity } from 'react-native'
import Title from '../components/title'
import graphql from '../libs/graphql'

const getSites = `
	query($client_id:Int!){
		sites(client_id: $client_id) {
			id
			name
			url
		}
	}
`

export default class Client extends React.Component {
	constructor() {
		super()

		this.state = {
			loading: true,
			data: {}
		}
	}

	componentDidMount() {
		graphql.query(getSites, {
			client_id: this.props.navigation.state.params.client.id
		}).then(res => {
			this.setState({
				loading: false,
				data: res.data
			})
		})
	}

	clicked(item) {
		return (event) => {
			this.props.navigation.navigate('Site', {site: item})
		}
	}

	render() {
		let client = this.props.navigation.state.params.client
		let sites = this.state.data.sites

		return (
			this.state.loading ? (
				<View style={styles.loader}>
					<ActivityIndicator />
				</View>
			) : (
				<View style={styles.container}>
					<FlatList
						style={styles.list}
						data={sites}
						keyExtractor={(item, index) => index}
						renderItem={({item}) => (
							<View style={styles.item}>
								<TouchableOpacity onPress={this.clicked(item).bind(this)}>
									<Text>{item.name}</Text>
									<Text style={styles.subtitle}>{item.url}</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
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
