<template>
	<view class="content">
		<template v-for="(item,i) in list" :key="i" >
			<template v-if="item.type==1">
				<view class="item-your" @longpress="clickRight">
					<image src="../../static/logo.png" style="margin-right: 20rpx;"></image>
					<bubble :value="item.value"/>
				</view>
			</template>
			<template v-else>
				<view class="item-my">
					<bubble :value="item.value" direction/>
					<image src="../../static/logo.png" style="margin-left: 20rpx;"></image>
				</view>
			</template>
		</template>
	</view>
	<view class="footer">
		<input type="text" v-model="title">
		<button @click="sends">发送</button>
	</view>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import {socket} from '@/utils/ws.js'
import bubble from "./bubble.vue"
const title = ref('')
const list = ref([
	{value:'jjj后刚发过法国',type:1},
	{value:'经济更加方便',type:1},
	{value:'官方和后刚发过法国',type:2},
	{value:'经济更加方便',type:1},
	{value:'经济更加方便',type:1},
])
function onSocket(){
	socket.on('broadcast',(msg,type) => {
		//后台返回的信息筛选出别人发送的消息
		if(type === 1){
			list.value.push({
				value:msg,
				type:type
			})
		}
	})
}
function clickRight(){
	console.log('分解机');
}
function sends(){
	list.value.push({
		value:title.value,
		type:2
	})
	//发送信息
	socket.emit('send',title,2)
	title.value = ''
}
onMounted:{
	onSocket()
	window.addEventListener('keyup',e => {
		if(e.keyCode === 13 && title.value != ''){
			sends()
		}
	})
}
onUnmounted(() => {
	window.removeEventListener('keyup')
})
</script>

<style lang="scss">
page{
	box-sizing: content-box;
	background-color: tomato;
}
.content {
	padding: 20rpx;
	.item-your,
	.item-my{
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}
	.item-my{
		float: right;
		margin-bottom: 40rpx;
		justify-content: flex-end;
	}
}

.footer{
	position: fixed;
	background-color: tomato;
	bottom: 0;
	padding: 10rpx 20rpx;
	height: 100rpx;
	width: 100%;
	display: flex;
	align-items: center;
	border-top: 2rpx solid white;
}
</style>
<style>
input{
	width: 70%;
	height: 60rpx;
	background-color: white;
	border-radius: 8rpx;
	padding-left: 10rpx;
}
button{
	/* height: 60rpx; */
	font-size: 20rpx;
	width: 20%;
	
}
image{
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
}
</style>
