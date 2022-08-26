<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image :src="good.goods_small_logo || defaultPic" class="goods-item-img"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-item-title">{{good.goods_name}}</view>
			<view class="goods-item-price">¥{{good.goods_price}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-good-item",
		props:{
			good:{
				type: Object,
				default: ()=>{}
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				
			};
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;
		.goods-item-left{
			margin-right: 5px;
			.goods-item-img{
				width: 100px;
				height: 100px;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-item-title{
				font-size: 14px;
			}
			.goods-item-price{
				font-size: 16px;
				color: #c00000;
				font-weight: bold;
			}
		}
	}

</style>