import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import ClientList from '../screens/ClientList'
import Contact from '../screens/Contact'
import ViewClient from '../screens/ViewClient'
import ViewSite from '../screens/ViewSite'

export const DetailStack = StackNavigator({
	ClientList: {
		screen: ClientList,
		navigationOptions: {
			title: 'Client list'
		}
	},
	ViewClient: {
		screen: ViewClient,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.client.name
		})
	},
	ViewSite: {
		screen: ViewSite,
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
}, {
	tabBarPosition: 'bottom'
})