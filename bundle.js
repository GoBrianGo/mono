(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.mono = factory());
}(this, function () { 'use strict';

	var util = {
		isFetch() {
			return typeof fetch === 'function' ? true : false
		},
		isString(data) {
			return Object.prototype.toString.call(data) === '[object String]'
		},
		// 把对象转换成地址栏参数字符串
		getStrDataFromObj(obj) {
			if (this.isString(obj) || !obj) {
				return obj
			}

			let params = [];

			Object.keys(obj).forEach((key) => {
				params.push(`${key}=${obj[key]}`);
			});

			return params.join('&')
		},
	};

	var fetchApi = {
		get(args) {
			const {url, data} = args;
			return fetch(url + data).then(response => {
				let contentType = response.headers.get('content-type');

			    if (response.ok) {
			        return contentType.indexOf('application/json') > -1 ? response.json() : response.text()
			    } else {
			    	console.log(response);
				    return Promise.reject({
						status: response.status,
						statusText: response.statusText,
				    })
			    }
		  	})
		},
		post(args) {
			const {url, data} = args;
			return fetch(url + data)
		},
	};

	var xhr = {
		get() {

		},
		post() {

		},
	};

	// 简易的事件发送接收器
	window._mono_event_emitters = {};

	function handlerParams(args) {
		if (util.isString(args)) {
			return {
				url: args
			}
		}

		return args
	}

	class mono {
		constructor() {
			let _this = this;
			this.requestInterceptors = '';
			this.responseInterceptors = '';
			this.interceptors = {
				request: {
					add(interceptor) {
						_this.requestInterceptors = interceptor;
					}
				},
				response: {
					add(interceptor) {
						_this.responseInterceptors = interceptor;
					}
				}
			};
			this.request = util.isFetch() ? fetchApi : xhr;
		}
		get(args) {
			let params = handlerParams(args);

			params = Object.assign(params, {
				type: 'get',
				data: util.getStrDataFromObj(args.data) || '',
			});

			if (this.responseInterceptors) {
				return this.request.get(params).then((res) => {
					return this.responseInterceptors ? this.responseInterceptors(res) : res
				})
			}

			return this.request.get(params)
		}
		post() {
			return this.request.post(args)
		}
	}

	// const sleep = async function(time) {

	return mono;

}));
