export default {
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

		let params = []

		Object.keys(obj).forEach((key) => {
			params.push(`${key}=${obj[key]}`)
		});

		return `?${params.join('&')}`
	},
}