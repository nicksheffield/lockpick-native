import React from 'react'
import { StyleSheet, ScrollView, Platform } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import graphql from '../decorators/HOCs/@graphql'

@graphql(`
	query($site_id:Int!) {
		logins(site_id: $site_id) {
			id
			username
			password
		}
	}
`, (props) => ({
	site_id: props.navigation.state.params.site.id
}))
export default class Site extends React.Component {
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
					</List>
				))}
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
})
