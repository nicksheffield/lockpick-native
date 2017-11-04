import React from 'react'
import { ScrollView, Platform } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import loadGraphQL from '../decorators/HOCs/@loadGraphQL'

let query = `
	query($site_id:Int!) {
		logins(site_id: $site_id) {
			id
			username
			password
			notes
		}
	}
`

@loadGraphQL(query, (props) => ({ site_id: props.navigation.state.params.site.id }))
export default class ViewSite extends React.Component {
	render() {
		let site = this.props.navigation.state.params.site
		let logins = this.props.graphql.data.logins

		return (
			<ScrollView>
				{logins.map(login => (
					<List key={login.id}>
						<ListItem
							title={login.username}
							leftIcon={{
								name: 'user',
								type: 'simple-line-icon',
								color: '#888'
							}}
							hideChevron
						/>
						<ListItem
							title={login.password}
							leftIcon={{
								name: 'key',
								type: 'simple-line-icon',
								color: '#888'
							}}
							hideChevron
							titleStyle={{
								fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
								fontWeight: 'bold'
							}}
						/>
						{login.notes ? (
							<ListItem
								title={login.notes}
								leftIcon={{
									name: 'list',
									type: 'simple-line-icon',
									color: '#888'
								}}
								hideChevron
							/>
						) : null}
					</List>
				))}
			</ScrollView>
		)
	}
}
