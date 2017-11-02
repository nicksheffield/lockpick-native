import { apiEndpoint } from '../config/config'

const fetchOpts = {  
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
}

const queryGQL = (url, query, variables) => {
	return fetch(url, {...fetchOpts, body: JSON.stringify({ query, variables })})
		.then(res => res.json())
}

const mutateGQL = (url, query, variables) => {

}

export default graphql = {
	query: (query, variables) => {
		return queryGQL(apiEndpoint, query, variables)
	},
	mutate: (query, variables) => {
		return mutateGQL(apiEndpoint, query, variables)
	}
}