<template>
	<view>
		<my-search @click='searchHandler'></my-search>
		<view class="cate" >
			<scroll-view class="scroll-left" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item, index) in categories" :key='index'>
					<view 
						:class="['scroll-left-item', active === index ? 'active' : '']"
						@click="activeChange(index)"
					>
					{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view class="scroll-right" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view v-for="(itemLevel2, indexLevel2) in cateLevel2" :key="indexLevel2" class="item-level2">
					<view style="text-align: center; margin:10rpx 0;">/{{itemLevel2.cat_name}}/</view>
					<view  class="item-level3-block">
						<view 
							class="item-level3" 
							v-for="(itemLevel3, indexLevel3) in itemLevel2.children" 
							:key='indexLevel3'
							@click="clickLevel3Hander(itemLevel3)"
						>
							<image :src="itemLevel3.cat_icon" class="item-level3-img"></image>
							<text>{{itemLevel3.cat_name}}</text>
						</view>
						
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				wh: 0, // 手机可用高度
				active: 0,
				categories:[],
				scrollTop: 0,
				
			};
		},
		computed:{
			cateLevel2(){
				if(this.categories.length) return this.categories[this.active].children
				return []
				
			}
		},
		onLoad(){
			const systemInfo =uni.getSystemInfoSync()
			this.wh = systemInfo.windowHeight - 50
			this.getCategories()
			
		},
		methods: {
			searchHandler(){
				uni.navigateTo({
					url: '/subPkg/search/search'
				})
			},
			async getCategories(){
				const {data} = await uni.$http.get('/api/public/v1/categories')
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				this.categories = data.message
			},
			activeChange(i){
				this.active = i
				this.scrollTop = this.scrollTop === 0 ? 1:0
			},
				
			clickLevel3Hander(item3){
				uni.navigateTo({
					url:'/subPkg/good_lists/good_lists?cid=' +item3.cat_id ,
				})
			},
			
			
			
		}
	}
</script>

<style lang="scss">
	.cate{
		display: flex;
		
		.scroll-left{
			height: 100%;
			width: 100px;
			.scroll-left-item{
				height: 60px;
				line-height: 60px;
				background: #f7f7f7;
				box-sizing: border-box;
				padding-left: 6px;
				&.active{
					background: #fff;
					position: relative;
					&::before{
						content: "";
						display: block;
						width: 4px;
						height: 30px;
						position: absolute;
						top: 25%;
						left: 0;
						background: #c00000;
					}
				}
			}
		}
		.scroll-right{
			height: 100%;
			background: #fff;
			flex: 1;
			.item-level2{
				.item-level3-block{
					display: flex;
					flex-wrap:wrap;
					
					.item-level3{
						width: 33.33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin-bottom: 10rpx;
						.item-level3-img{
							width: 60px;
							height: 60px;
						}
						text{
							text-align: center;
							font-size: 12px;
						}
						
					}
				}
				
			}
			
		}
		
	}

</style>
