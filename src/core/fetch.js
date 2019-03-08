import util from '../helpers/util'

function getFetchHeaders(headers) {
	return new Headers(headers)
}

export default {
	get(args) {
		const { url, data } = args

		return fetch(url + data).then(response => {
			let contentType = response.headers.get('content-type')

		    if (response.ok) {
		        return contentType.indexOf('application/json') > -1 ? response.json() : response.text()
		    } 

		    throw new Error({
				status: response.status,
				statusText: response.statusText,
		    })
	  	})
	},
	post(args) {
		const { url, type, body, headers, cache, credentials, mode, redirect, referrer } = args

		return fetch(url, { 
				method: type, 
				body, 
				headers: getFetchHeaders(headers), 
				cache, credentials, 
				mode, 
				redirect, 
				referrer,
			}).then(response => {
				if (response.ok) {
					return response.json()
				}

				throw new Error({
					status: response.status,
					statusText: response.statusText,
			    })
		})
	},
}