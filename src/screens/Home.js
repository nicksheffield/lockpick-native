import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Button, TouchableOpacity } from 'react-native'
import graphql from '../libs/graphql'

const getClients = `
	{
		clients {
			id
			name
			sites {
				id
			}
		}
	}
`

export default class Home extends React.Component {
	constructor() {
		super()

		this.state = {
			loading: true,
			data: {}
		}
	}

	componentDidMount() {
		graphql.query(getClients).then(res => {
			this.setState({
				loading: false,
				data: res.data
			})
		})
	}

	clicked(item) {
		return (event) => {
			this.props.navigation.navigate('Client', {client: item})
		}
	}

	render() {
		let clients = this.state.data.clients

		return (
			this.state.loading ? (
				<View style={styles.loader}>
					<ActivityIndicator />
				</View>
			) : (
				<View style={styles.container}>
					<FlatList
						style={styles.list}
						data={clients}
						keyExtractor={(item, index) => index}
						renderItem={({item}) => (
							<View style={styles.item}>
								<TouchableOpacity onPress={this.clicked(item).bind(this)}>
									<Text>{item.name}</Text>
									<Text style={styles.subtitle}>{item.sites.length} Sites</Text>
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
		justifyContent: 'center'
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
