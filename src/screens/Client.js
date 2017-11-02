import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { bind } from 'decko'
import graphql from '../decorators/HOCs/@graphql'


@graphql(`
	query($client_id:Int!){
		sites(client_id: $client_id) {
			id, name, url
		}
	}
`, (props) => {
	console.log('props', props)

	return {
		client_id: props.navigation.state.params.client.id
	}
})
export default class Client extends React.Component {

	@bind
	clicked(item) {
		return (event) => {
			this.props.navigation.navigate('Site', {site: item})
		}
	}

	render() {
		let client = this.props.navigation.state.params.client
		let sites = this.props.graphql.data.sites

		return (
			<ScrollView>
				<List containerStyle={{marginTop: -1}}>
					{sites.map(site => (
						<ListItem
							key={site.id}
							title={site.name}
							onPress={this.clicked(site)}
						/>
					))}
				</List>
			</ScrollView>
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
		borderBottomColor: '#ddd'
	},
	subtitle: {
		color: '#999'
	}
});
