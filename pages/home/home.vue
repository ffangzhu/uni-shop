<template>
	<view>
		<view class="search-view">
			<my-search @click='searchHandler'></my-search>
		</view>
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="1000"
			:circular="true"
		 >
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator 
					class="swiper-item" 
					:open_type='item.open_type' 
					:url="`/subPkg/good_details/good_details?goods_id=${item.goods_id}`"
				>
					<image :src="item.image_src" >
					</image>
				</navigator> 
			</swiper-item>
		</swiper>
		<view class="cate-list">
			<view 
				v-for='(item, index) in cateList' 
				:key='index' 
				class="cate-item" 
				@click="cateClickHandle(item)"
			>
				<image :src="item.image_src" >
				</image>
			</view>
		</view>
		<view>
			<view v-for="(item, floorIndex) in floorList" :key='floorIndex'>
				<view >
					<image :src="item.floor_title.image_src" class="floor-title">
					</image>
				</view>
				<view class="floor-content">
					<navigator 
						class="floor-content-left" 
						:url="item.product_list[0].url"
					>
						<image 
							:src="item.product_list[0].image_src" 
							:style="{width: item.product_list[0].image_width + 'rpx'}"
							 mode="widthFix"
						 >
						</image>
					</navigator>
					<view class="floor-content-right">
						<navigator 
							v-for="(floorItem, i) in item.product_list" 
							:key='i'
							v-if="i !==0"
							:url="floorItem.url"
						>
							<image 
								:src="floorItem.image_src"
								 mode="widthFix" 
								 :style="{width: floorItem.image_width + 'rpx'}" >
							</image>
						</navigator>
						
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [],
				cateList: [],
				floorList: [],
			};
		},
		onLoad(){
			this.getSwiperList()
			this.getCateList()
			this.getFloordata()
			
		},
		methods:{
			searchHandler(){
				uni.navigateTo({
					url: '/subPkg/search/search'
				})
			},
			async getSwiperList (){
				const {data} = await uni.$http.get(`/api/public/v1/home/swiperdata`)
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				this.swiperList = data.message
				
			},
			async getCateList(){
				const {data} = await uni.$http.get(`/api/public/v1/home/catitems`)
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				this.cateList = data.message
			},
			async getFloordata(){
				const {data} = await uni.$http.get(`/api/public/v1/home/floordata`)
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				data.message.forEach(item=>{
					item.product_list.forEach(productItem=>{
						const query = productItem.navigator_url.split('?')[1]
						productItem.url = "/subPkg/good_lists/good_lists?" +query
					})
				})
				this.floorList = data.message
			},
			cateClickHandle(item){
				if(item.name === '分类'){
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.search-view{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper{
		height: 333rpx;
		.swiper-item{
			height: 100%;
			image{
				height: 100%;
				width: 100%;
			}
			
		}
		
	}
	.cate-list{
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;
		.cate-item{
			width: 138rpx;
			height: 146rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	.floor-title{
		display: flex;
		width: 100%;
		height: 60rpx;
	}
	.floor-content{
		display: flex;
		padding: 10rpx;
		.floor-content-right{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}

</style>
