/**
 * @loadGraphQL is a decorator that wraps a React component in a "Higher Order Component" or HOC
 * see: https://reactjs.org/docs/higher-order-components.html
 * 
 * This HOC is responsible for loading data from a graphql api, displaying a loading indicator
 * and then finally rendering your original React component when the data is ready.
 * 
 * The api for using it is as follows. See libs/gqlFetch for what "query" and "variables" should be.
 * 
 * @loadGraphQL(query, variables)
 * class MyComponent extends React.Component {
 * 		...blahblahblah
 * }
 * 
 * We do not need to use decorators to apply this HOC to a component, but the syntax is easy to write.
 * see: https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 */
import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import gqlFetch from '../../libs/gqlFetch'

export default function loadGraphQL(query, variables) {
	return (Component) => {
		return class GraphQLLoader extends React.Component {
			state = {
				loading: true,
				data: {}
			}

			componentWillMount() {
				if (typeof variables === 'function') {
					vars = variables(this.props)
				} else {
					vars = variables
				}

				gqlFetch.query(query, vars).then(res => {
					this.setState({
						loading: false,
						data: res.data
					})
				})
			}

			render() {
				return (
					this.state.loading ? (
						<View style={styles.loader}>
							<ActivityIndicator size="large" />
						</View>
					) : (
						<Component {...this.props} graphql={{data: this.state.data}} />
					)
				)
			}
		}
	}
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})