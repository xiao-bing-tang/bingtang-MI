import {io} from 'socket.io-client'
export const socket = io('127.0.0.1:3000',{transports: ["websocket", "polling"],})
export const ws = function(){
	socket.on('hello',arg => {
	    console.log('arg',arg);
	})
	socket.on('connect_error',err => {
		console.log('err',err);
		socket.io.opts.transports = ['polling','websocket']
	})
}