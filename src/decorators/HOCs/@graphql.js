import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import gqlFetch from '../../libs/graphql'

export default function graphql(query, variables) {
	return (Component) => {
		return class GraphQL extends React.Component {
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