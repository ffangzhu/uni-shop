<template>
	<view class="my-search" @click="searchClickhandler">
		<view class="search-content">
			<uni-icons type="search" size="26"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchClickhandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search{
		background: #c00000;
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.search-content{
			background: #fff;
			border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 36px;
			text{
				margin-left: 5px;
			}
		}
	}

</style>