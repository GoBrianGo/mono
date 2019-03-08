// 简易的事件发送接收器
window._mono_event_emitters = {}

class EventEmitter {
	constructor() {
	}
	on(name, cb) {
		if (!_mono_event_emitters[name]) {
			_mono_event_emitters[name] = []
		}
		
		_mono_event_emitters[name].push(cb)
	}
	emit(name, data) {
		_mono_event_emitters[name].forEach(func => {
			func(data)
		})
	}
}