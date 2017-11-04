import React from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import loadGraphQL from '../decorators/HOCs/@loadGraphQL'

let query = `
	query {
		clients {
			id, name
			sites { id }
		}
	}
`

@loadGraphQL(query)
export default class ClientList extends React.Component {

	select = item => () => this.props.navigation.navigate('ViewClient', {client: item})

	render() {
		let clients = this.props.graphql.data.clients

		return (
			<ScrollView>
				<List containerStyle={{marginTop: 0}}>
					{clients.map(client => (
						<ListItem
							key={client.id}
							title={client.name}
							badge={{
								value: client.sites.length,
								textStyle: {
									color: 'white'
								},
								containerStyle: {
									marginTop: 2
								}
							}}
							onPress={this.select(client)}
						/>
					))}
				</List>
			</ScrollView>
		)
	}
}