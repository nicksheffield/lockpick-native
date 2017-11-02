import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import Home from '../screens/Home'
import Contact from '../screens/Contact'
import Client from '../screens/Client'
import Site from '../screens/Site'

export const DetailStack = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			title: 'Home'
		}
	},
	Client: {
		screen: Client,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.client.name
		})
	},
	Site: {
		screen: Site,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.site.name
		})
	}
})

export const Tabs = TabNavigator({
	Home: {
		screen: DetailStack,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
		}
	},
	Contact: {
		screen: Contact,
		navigationOptions: {
			tabBarLabel: 'Contact',
			tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
		}
	}
})