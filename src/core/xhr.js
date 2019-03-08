const getXhr = () => {
	let xhr = ''

	if (window.XMLHttpRequest) {　 // Mozilla, Safari...
	  xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
	  　try {
	    　xhr = new ActiveXObject('Msxml2.XMLHTTP');
	 　 } catch (e) {
	  　  try {
	    　  xhr = new ActiveXObject('Microsoft.XMLHTTP');
	   　 } catch (e) {}
	 　 }
	}

	return xhr
}
export default {
	get(args) {
		return this.ajax(args)
	},
	post(args) {
		return this.ajax(args)
	},
	ajax(args) {
		return new Promise((resolve, reject) => {
			let xmlHttp = getXhr()

			xmlHttp.open(args.type, args.url)

			if (args.type == 'post') {
				xmlHttp.setRequestHeader("Content-Type", args.headers.contentType || 'application/json')
			}

			for (let key in args.headers) {
				xmlHttp.setRequestHeader(key, args.headers[key])
			}

			xmlHttp.send(args.data)
			xmlHttp.onreadystatechange = () => {
				if (xmlHttp.readyState === 4) {
					if (xmlHttp.status === 200) {
						let res = xmlHttp.responseText

						if (args.headers.responseType === 'json') {
							res = JSON.parse(xmlHttp.responseText)
						}

						resolve(res)
					} else {
						reject(xmlHttp)
					}
				}
			}
		})
	}
}