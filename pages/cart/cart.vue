<template>
	<view>
	<view class="cart-empty" v-if='!cartList.length'>
		<image src="../../static/image/cart-empty.png" mode=""></image>
		<text>购物车竟然是空的！</text>
	</view>
	<view v-else>
		<my-adress></my-adress>
		<view class="cart-title">
			<uni-icons type="shop" size="24"></uni-icons>
			<text>购物车</text>
		</view>
		<view class="swipe-warp">
			<uni-swipe-action>
					<block v-for="(good, i) in cartList" :key='i' >
						<uni-swipe-action-item
							:right-options="options" 
							@click="swipeHandler(good)">
							<my-good-item
								:num-show="true" 
								:good='good' 
								radioShow='true' 
								@checkItem='checkItemHandler' 
								@numChange='changeCount'
							></my-good-item>
						</uni-swipe-action-item>
					</block>
				</uni-swipe-action>
		</view>
		<my-settle></my-settle>
	</view>
</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		mixins: [badgeMix],
		computed:{
			...mapState("cart",['cartList']),
			...mapGetters("cart",['cartTotal'])
		},
		watch:{
			cartTotal(){
				this.setBadge()
			}
		},
		data() {
			return {
				options:[{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			}
		},
		methods: {
			...mapMutations("cart",['updateCartList', 'deleteCartList']),
			checkItemHandler(goods){
				this.updateCartList({goods, type: 'goods_state'})
			},
			changeCount(goods){
				this.updateCartList({goods, type:'goods_count'})
			},
			swipeHandler(goods){
				this.deleteCartList(goods.goods_id)
			},
		}
	}
</script>

<style lang="scss">
	.cart-empty{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 80vh;
		image{
			width: 400rpx;
			height: 360rpx;
		}
		text{
			color: gray;
			font-size: 14px;
		}
	}
	.cart-title{
		padding:5px 10px;
		border-bottom: 1px solid #efefef;
		text{
			font-size: 18px;
			margin-left: 5px;
		}
	}
	.swipe-warp{
		padding-bottom: 50px;
	}
</style>
