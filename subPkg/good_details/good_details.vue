<template>
	<view>
		<swiper 
			class="swiper" 
			circular 
			indicator-dots
			autoplay
		>
			<swiper-item 
				v-for="(item, i) in goodDeatils.pics"
				:key="i" 
				class="swiper-item"
				@click="preview(i)"
			>
				<image :src="item.pics_big"  class="swiper-item-img"></image>
			</swiper-item>
		</swiper>
		<view class="goods-item">
			<view class="goods-price">¥{{goodDeatils.goods_price}}</view>
			<view class="goods-content">
				<view class="goods-name">
					{{goodDeatils.goods_name}}
				</view>
				<view class="goods-sc">
					<uni-icons color='gray' type="star" size="24"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods-yf">运费：免运费</view>
		</view>
		<view class="goods-intro">
			<rich-text :nodes="goodDeatils.goods_introduce"></rich-text>
		</view>
		<view class="goods-carts">
			<uni-goods-nav 
				:options="options" 
				:fill="true" 
				:button-group="buttonGroup" 
				@click="onCartClick"
				@buttonClick="buttonCartClick" 
			/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodDeatils: {},
				options: [ {
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}
			],
				
			};
		},
		onLoad(options){
			this.goods_id = options.goods_id
			this.getDeatils(options.goods_id)
		},
		methods:{
			async getDeatils(goods_id){
				const {data} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display: bolck;"')
				this.goodDeatils = data.message
				
			},
			preview(i){
				uni.previewImage({
					current: i,
					urls: this.goodDeatils.pics.map(x=>x.pics_big)
				})
			},
			onCartClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
				
			},
			buttonCartClick(){
				
			}
		}
	}
</script>

<style lang="scss">
	.swiper{
		height: 650rpx;
		.swiper-item{
			.swiper-item-img{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	.goods-item{
		padding: 10px;
		padding-right:0 ;
		.goods-price{
			font-size: 18px;
			color: #C00000;
		}
		.goods-content{
			display: flex;
			.goods-name{
				font-size: 13px;
				margin-right: 5px;
			}
			.goods-sc{
				font-size: 14px;
				width: 60px;
				color: gray;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				border-left: 1px solid #efefef;
			}
		}
		.goods-yf{
			font-size: 12px;
			color: gray;
			margin-top: 5px;
		}
	}
	.goods-intro{
		padding-bottom:50px ;
	}
.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
	}
	

</style>
