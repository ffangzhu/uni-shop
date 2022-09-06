<template>
	<view class="my-login">
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<button type="primary" class="login-btn" @click="getUserInfo">一键登录</button>
		<text class="text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import _ from 'lodash'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['redirectInfo'])
		},
		methods:{
			...mapMutations("user",['updateUserInfo','updateToken','updateRedirectInfo']),
			
			getUserInfo(e){
				const that = this
				uni.getUserProfile({
					desc:'登录',
					success: function (infoRes) {
						that.updateUserInfo(infoRes.userInfo)
						that.getCode(infoRes)
					},
					fail(err) {
						uni.$showMsg('您取消了登录！')
					}
				})
				
			},
			 getCode(info){
				 const that = this
				uni.login({
				  onlyAuthorize: true,
				  success: function (loginRes) {
					const query = {
						code: loginRes.code,
						encryptedData: info.encryptedData, //包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法。
						rawData:info.rawData, // 不包括敏感信息的原始数据字符串，用于计算签名。
						iv:info.iv,// 加密算法的初始向量，详细见加密数据解密算法。
						signature:info.signature // 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。
					};
					that.getToken(query)
					
				  },
				  fail(err){
					  uni.$showMsg('登录失败！')
					  console.log(err)
					  
				  }
				});
			},
			async getToken(query){
				console.log(query,'query')
				const {data} = await uni.$http.post('/api/public/v1/users/wxlogin', query)	
				// TODO: 完成token
				this.updateToken('60_FOtm4aQGpUopzO6XtSkgxoZQXm7zWo1W6hcz_GyPosDLOoPA-f9NLbE76JFDJdrJcJj4WZp_G_7pBo9hIdnqkjdbWmm_kfRjbjd4ukPoLHAYTGD1vwGu1qi7e0bzRcL3_v3d7bKeZSTi-HIxQPQhACAAZA')
						// this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
						uni.$showMsg('登录成功！')
						this.navigateBack()
				// if(data?.meta?.status !== 200){
				// 	return uni.$showMsg('登录失败！')
				// }
			},
			navigateBack(){
				console.log(this.redirectInfo,'this.redirectInfo')
				const that = this
				if(!_.isEmpty(this.redirectInfo) && this.redirectInfo.openType === 'switchTab'){
					console.log(2212)
					uni.switchTab({
						url: that.redirectInfo.from,
						complete() {
							that.updateRedirectInfo({})
						}
					})
				}
				
			}
			
		},
		
	}
</script>

<style lang="scss">
.my-login{
	display: flex;
	height: 750rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #efefef;
	position: relative;
	overflow: hidden;
	.login-btn{
		width: 90%;
		background-color: #c00000;
		border-radius: 25px;
	}
	.text{
		font-size: 14px;
		color: gray;
		margin-top: 15px
	}
	&::after{
		display: block;
		content:' ';
		background: rgb(245,245,245);
		width: 100%;
		height: 40px;
		border-radius: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translate(0,50%);
		
	}
}

</style> 