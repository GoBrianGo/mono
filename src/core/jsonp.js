let jsonpCount = 0

const jsonp = (params) => {
    jsonpCount = jsonpCount + 1

    return new Promise((resolve, reject) => {
        const { url, data, timeout, jsonpcallback = 'callback' } = params
        const script = document.createElement('script')
        const jsonpCallbackName = `jsonpCallback${jsonpCount}`
        let jsonpTimeout = ''

        script.src = url.indexOf('?') > -1 ? `${url}&${jsonpcallback}=${jsonpCallbackName}` : `${url}?${jsonpcallback}=${jsonpCallbackName}`
        document.body.appendChild(script)

        window[jsonpCallbackName] = (res) => {
            document.body.removeChild(script)
            clearTimeout(jsonpTimeout)
            resolve(res)
        }

        jsonpTimeout = setTimeout(() => {
            reject('timeout')
        }, timeout || 30000)
    })
}

export default jsonp