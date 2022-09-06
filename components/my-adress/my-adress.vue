<template>
	<view>
		<view class="adress-btn" v-if='isInitAddress'>
			<button 
				type="primary" 
				size="mini"
				@click="chooseAdress" 
			>
				请选择收货地址+
			</button>
		</view>
		<view class="adress-info" v-else  @click="chooseAdress">
			<view class="adress-info-top">
				<view class="adress-info-left">
					收货人:{{address.userName}}
				</view>
				<view class="adress-info-right">
					电话：{{address.telNumber}}
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="adress-info-bottom">
				收货地址：{{addressStr}}
			</view>
		</view>
		<image src="../../static/image/adress.png" class="adress-img"></image>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	import _ from 'lodash'
	export default {
		name:"my-adress",
		computed:{
			...mapState('user',['address']),
			...mapGetters('user',['addressStr']),
			isInitAddress(){
				return _.isEmpty(this.address)
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('user',['updateAddress']),
			async chooseAdress(){
				const [err, succ] = await uni.chooseAddress().catch(err=>err)
				if(err === null && succ.errMsg === "chooseAddress:ok"){
					this.updateAddress(succ)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.adress-btn{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
	}
	.adress-info{
		padding: 10px 5px;
		.adress-info-top{
			display: flex;
			justify-content: space-between;
		}
		.adress-info-bottom{
			margin-top: 8px;
		}
	}
	.adress-img{
		display: block;
		width: 100%;
		height: 5px;
	}

</style>