<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio v-if='radioShow' :checked="good.goods_state" color='#c00000' @click="checkItem"></radio>
			<image :src="good.goods_small_logo || defaultPic" class="goods-item-img"></image>
		</view>
		<view class="goods-item-right">
				<view class="goods-item-title">{{good.goods_name}}</view>
				<view class="goods-item-num-price">
					<view class="goods-item-price">¥{{good.goods_price}}</view>
					<uni-number-box v-if="numShow" :min="1" :value="good.goods_count" @change="bindChange"></uni-number-box>
				</view>
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
			},
			radioShow: {
				type: Boolean,
				default: false,
			},
			numShow:{
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		methods:{
			checkItem(good){
				this.$emit('checkItem',{goods_id: this.good.goods_id,goods_state: !this.good.goods_state})
			},
			bindChange(value){
				this.$emit('numChange',{goods_id: this.good.goods_id,goods_count: value})
			},
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;
		.goods-item-left{
			display: flex;
			align-items: center;
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
			.goods-item-num-price{
				display: flex;
				justify-content: space-between;
				.goods-item-price{
					font-size: 16px;
					color: #c00000;
					font-weight: bold;
				}
				
			}
			
		}
	}

</style>