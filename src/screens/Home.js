import React from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import graphql from '../decorators/HOCs/@graphql'

let getClients = `
	{
		clients {
			id, name
			sites { id }
		}
	}
`

@graphql(getClients)
export default class Home extends React.Component {

	select = item => () => this.props.navigation.navigate('Client', {client: item})

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