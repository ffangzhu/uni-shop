export default{
	namespaced: true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token:JSON.parse(uni.getStorageSync('token') || '""'),
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: {},
	}),
	mutations:{
		updateAddress(state, pramas){
			console.log(pramas,'pramas')
			state.address = pramas
			this.commit('user/saveToStorage')
		},
		updateUserInfo(state,info){
			state.userInfo = info
			this.commit('user/saveUserInfoToStorage')
		},
		updateToken(state,token){
			state.token = token
			this.commit('user/saveTokenToStorage')
		},
		updateRedirectInfo(state,info){
			state.redirectInfo = info
		},
		saveToStorage(state){
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token', JSON.stringify(state.token))
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
	},
	
	actions:{
		
	},
	
	getters:{
		addressStr(state){
			return state.address.provinceName +state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}