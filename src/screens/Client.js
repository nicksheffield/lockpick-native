import React from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { bind } from 'decko'
import graphql from '../decorators/HOCs/@graphql'


let getSites = `
	query($client_id:Int!){
		sites(client_id: $client_id) {
			id, name, url
			logins { id }
		}
	}
`

@graphql(getSites, (props) => ({ client_id: props.navigation.state.params.client.id} ))
export default class Client extends React.Component {

	select = item => () => this.props.navigation.navigate('Site', {site: item})

	render() {
		let client = this.props.navigation.state.params.client
		let sites = this.props.graphql.data.sites

		return (
			<ScrollView>
				<List containerStyle={{marginTop: 0}}>
					{sites.map(site => (
						<ListItem
							key={site.id}
							title={site.name}
							badge={{
								value: site.logins.length,
								textStyle: {
									color: 'white'
								},
								containerStyle: {
									marginTop: 2
								}
							}}
							onPress={this.select(site)}
						/>
					))}
				</List>
			</ScrollView>
		)
	}
}