import fetchApi from './core/fetch'
import xhr from './core/xhr'
import jsonp from './core/jsonp'
import util from './helpers/util'
import EventEmitter from './helpers/EventEmitter'

function handlerParams(args) {
	if (util.isString(args)) {
		return {
			url: args
		}
	}

	return args
}

class mono {
	constructor(options = {}) {
		let _this = this
		this.requestInterceptors = ''
		this.responseInterceptors = ''
		this.interceptors = {
			request: {
				add(interceptor) {
					_this.requestInterceptors = interceptor
				}
			},
			response: {
				add(interceptor) {
					_this.responseInterceptors = interceptor
				}
			}
		}

		this.request = options.type === 'fetch' ? fetchApi : options.type === 'xhr' ? xhr : util.isFetch() ? fetchApi : xhr
	}
	jsonp(args) {
		let params = handlerParams(args)

		params = Object.assign(params, {
			type: 'jsonp',
			data: util.getStrDataFromObj(args.data) || '',
		})

		params.url = params.url + params.data

		if (this.responseInterceptors) {
			return jsonp(params).then((res) => {
				return this.responseInterceptors ? this.responseInterceptors(res) : res
			})
		}

		return jsonp(params)
	}
	get(args) {
		let params = handlerParams(args)

		params = Object.assign(params, {
			type: 'get',
			data: util.getStrDataFromObj(args.data) || '',
		})

		params.url = params.url + params.data
		
		if (this.responseInterceptors) {
			return this.request.get(params).then((res) => {
				return this.responseInterceptors ? this.responseInterceptors(res) : res
			})
		}

		return this.request.get(params)
	}
	post(args) {
		let params = handlerParams(args)

		params = Object.assign(params, {
			type: 'POST',
		})

		if (this.responseInterceptors) {
			return this.request.post(params).then((res) => {
				return this.responseInterceptors ? this.responseInterceptors(res) : res
			})
		}

		return this.request.post(params)
	}
}

export default mono