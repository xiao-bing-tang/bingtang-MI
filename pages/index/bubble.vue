<template>
	<view :class="[direction ? 'bubble-right' : 'bubble']">
		{{value}}
	</view>
</template>

<script setup>
defineProps({
	value:String,
	direction:Boolean
})
</script>

<style lang="scss" scoped>
.bubble{
	background-color: white;
	padding: 10rpx 15rpx;
	border-radius: 15rpx;
	position: relative;
	&::before{
		content: '';
		display: block;
		width: 0;
		height: 0;
		border: 20rpx solid;
		border-bottom-color: white;
		border-top-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		border-radius: 10rpx;
		// background-color: black;
		position: absolute;
		left: -20rpx;
		bottom: 0;
	}
}
.bubble-right{
	background-color: white;
	padding: 10rpx 15rpx;
	border-radius: 15rpx;
	position: relative;
	&::before{
		content: '';
		display: block;
		width: 0;
		height: 0;
		border: 20rpx solid;
		border-bottom-color: white;
		border-top-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		border-radius: 10rpx;
		// background-color: black;
		position: absolute;
		right: -20rpx;
		bottom: 0;
	}
}
</style>