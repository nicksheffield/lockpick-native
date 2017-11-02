import { apiEndpoint } from '../config/config'

const fetchOpts = {  
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
}

export default graphql = {
	query: (query, variables) => {
		return fetch(apiEndpoint, {...fetchOpts, body: JSON.stringify({ query, variables })})
			.then(res => res.json())
	},
	mutate: (query, variables) => {

	}
}