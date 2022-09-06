<template>
	<view class="my-userinfo">
		<view class="userinfo-top">
			<image :src="userInfo.avatarUrl" class="avatar"></image>
			<text>{{userInfo.nickName}}</text>
		</view>
		<view class="my-pannel">
			<view class="panel">
				<view class="pannel-content">
					<view class="pannel-item" v-for="item in pannelOne" :key='item.id'>
						<view>
							{{item.count}}
						</view>
						<view>
							{{item.title}}
						</view>
						
					</view>
					
				</view>
				</view>
			<view class="panel">
				<view class="pannel-title">
					我的订单
				</view>
				<view class="pannel-content">
					<view class="pannel-item">
						<uni-icons type="wallet" size="30" color='#c00000'></uni-icons>
						<view>
							待付款
						</view>
					</view>
					<view class="pannel-item">
						<uni-icons type="shop" size="30" color='#c00000'></uni-icons>
						<view>
							待收货
						</view>
					</view>
					<view class="pannel-item">
						<uni-icons type="refresh" size="30" color='#c00000'></uni-icons>
						<view>
							退款/退货
						</view>
					</view>
					<view class="pannel-item">
						<uni-icons type="bars" size="30" color='#c00000'></uni-icons>
						<view>
							全部订单
						</view>
					</view>
					
				</view>
				</view>
			<view class="panel">
				<view class="pannel-content-list">
					<view class="pannel-list">
						<view>收货地址</view>
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
					<view class="pannel-list">
						<view>联系客服</view>
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
					<view class="pannel-list" @click="logout">
						<view>退出登录</view>
						<uni-icons type="arrowright" size="20"></uni-icons>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		computed:{
			...mapState("user",["userInfo"])
		},
		
		data() {
			return {
				pannelOne:[
					{id:1,title: '收藏的店铺',count: 8},
					{id:2,title: '收藏的商品',count: 14},
					{id:3,title: '关注的商品',count: 18},
					{id:4,title: '足迹',count: 84},
				]
			};
		},
		methods:{
			...mapMutations('user',['updateUserInfo','updateToken','updateAddress']),
			logout(){
				const that = this
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: function (res) {
						if (res.confirm) {
							that.updateUserInfo({})
							that.updateToken('')
							that.updateAddress({})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo{
		height: 100%;
		background: #f4f4f4;
		.userinfo-top{
			width: 100%;
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.avatar{
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				border: 2px solid #fff
			}
			text{
				font-size: 16px;
				font-weight: bold;
				color: #fff;
				margin-top:10px
			}
		}
		
		.my-pannel{
			padding: 0 10px;
			position: relative;
			top: -10px;
			.panel{
				width: 100%;
				background-color: #fff;
				border-radius: 3px;
				margin-bottom: 8px;
				.pannel-title{
					padding-left: 10px;
					font-size: 14px;
					line-height: 80rpx;
					border-bottom: 1px solid #f4f4f4;
				}
				.pannel-content-list{
					.pannel-list{
						padding: 15px 10px;
						border-bottom: 1px solid #f4f4f4;
						display: flex;
						justify-content: space-between;
					}
				}
				.pannel-content{
					display: flex;
					justify-content: space-around;
					
					.pannel-item{
						padding: 10px 0;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;
					}
				}
			}
		}
	}

</style>