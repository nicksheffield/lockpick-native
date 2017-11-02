import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { bind } from 'decko'
import graphql from '../decorators/HOCs/@graphql'

@graphql(`
	{
		clients {
			id, name
			sites { id }
		}
	}
`)
export default class Home extends React.Component {

	@bind
	clicked(item) {
		return (event) => {
			this.props.navigation.navigate('Client', {client: item})
		}
	}

	render() {
		let clients = this.props.graphql.data.clients

		return (
			<ScrollView>
				<List containerStyle={{marginTop: -1}}>
					{clients.map(client => (
						<ListItem
							key={client.id}
							title={client.name}
							subtitle={client.sites.length + ' Sites'}
							onPress={this.clicked(client)}
						/>
					))}
				</List>
			</ScrollView>
		)
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
		borderBottomColor: '#ddd'
	},
	subtitle: {
		color: '#999'
	}
})
