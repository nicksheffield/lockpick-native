/**
 * This file exports an object with query and mutate methods.
 * Mutate doesn't do anything just yet.
 * 
 * The query method works by taking a graphql query as a string, and also an optional hash/function for query variables
 * gqlFetch.query(query, variables)
 * 
 * An example:
 * 
 * gqlFetch.query(yourGraphQLQuery).then(data => {
 *     console.log(data)
 * })
 * 
 * The variables argument can be either a simple hash of query vars, like so:
 * 
 * { client_id: 1 }
 * 
 * or it can be a function that returns a simple hash of query vars:
 * 
 * (props) => ({ client_id: props.navigation.params.client.id })
 */
import { apiEndpoint } from '../config/config'

export default gqlFetch = {
	query: (query, variables) => {
		let promise = fetch(apiEndpoint, {  
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query, variables })
		})

		return promise.then(res => res.json())
	},
	mutate: (query, variables) => {

	}
}