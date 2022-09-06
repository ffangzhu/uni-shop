<template>
	<view class="my-settle">
		<view class="settle-checked">
			<radio :checked="isFullCheck" color='#c00000' @click="checkAll"></radio>
			全选
		</view>
		<view class='settle-total'>
			合计：
			<text class="settle-amount">¥{{amount}}</text>
		</view>
		<view class="settle" @click="settleHandler">结算（{{checkdGoods}}）</view>
			
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import _ from 'lodash'
	export default {
		name:"my-settle",
		data() {
			return {
				// 倒计时的秒数
				seconds: 3,
				timer: null
			};
		},
		computed:{
			...mapGetters("cart",["checkdGoods","cartTotal","amount"]),
			...mapGetters('user',['addressStr']),
			...mapState('user',['address','token']),
			...mapState('cart',['cartList']),
			isFullCheck(){
				return this.checkdGoods === this.cartTotal
			}
		},
		methods:{
			...mapMutations("cart",['updateGoodsState']),
			...mapMutations('user',['updateRedirectInfo']),
			checkAll(){
				this.updateGoodsState(!this.isFullCheck)
			},
			settleHandler(){
				if(!this.checkdGoods){
					return uni.$showMsg('请选择要结算的商品')
				}
				if(_.isEmpty(this.address)){
					return uni.$showMsg('请选择收货地址')
				}
				if(!this.token){
					return this.delayNavigate()
				}
				this.payOrder()
			},
			delayNavigate(){
				this.seconds = 3
				 this.showTips(this.seconds)
				  this.timer = setInterval(()=>{
					 this.seconds --;
					 if(this.seconds <= 0){
						 clearInterval(this.timer)
						 // 跳转
						 this.navigateToLogin()
						 return
					 }
					 this.showTips(this.seconds)
				 },1000)
			},
			showTips(n){
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
					mask:true,
					duration: 1500
				})
			},
			navigateToLogin(){
				const that = this
				uni.switchTab({
					url:'/pages/my/my',
					success() {
						that.updateRedirectInfo({
							openType: 'switchTab',
							from: '/pages/cart/cart',
						})
					}
				})
				
			},
			async payOrder(){
				const payInfo = {
					order_price: 0.01,
					consignee_addr:this.addressStr,
					goods:this.cartList.filter(x=>!!x.goods_state).map(x=>({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price,
					}))
				}
				// 发起请求创建订单
				const { data } = await uni.$http.post('/api/public/v1/my/orders/create',payInfo)
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				// 得到服务器响应的“订单编号”
				const orderNumber = data.message.order_number
				// 预支付；获取支付信息
				const { data:prePay } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number: orderNumber})
				if(prePay?.meta?.status !== 200){
					return uni.$showMsg()
				}
				const prePayInfo = prePay.message.pay
				// 发起微信支付
				// TODO:完成微信支付功能
				const [err, succ] = await uni.requestPayment(prePayInfo)
				console.log(err,succ,'00909')
				 if (err) return uni.$showMsg('订单未支付！')
				 // 查询支付结果
				const { data:payResult } = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number: orderNumber})
				if(payResult?.meta?.status !== 200){
					return uni.$showMsg('订单未支付！')
				}
				uni.showToast({
					title: '订单支付成功',
					icon:'success'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-settle{
		height: 50px;
		border-top: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-left: 5px;
		.settle-checked{
			
		}
		.settle-total{
			.settle-amount{
				color: #c00000;
				font-weight: bold;
			}
		}
		.settle{
			height: 50px;
			min-width: 100px;
			text-align: center;
			line-height: 50px;
			background-color: #c00000;
			color: #fff;
			padding: 0 5px;
			
		}
	}

</style>