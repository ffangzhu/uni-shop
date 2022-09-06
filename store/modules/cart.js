export default{
	namespaced: true,
	
	state:()=>({
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cartList: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),
	mutations:{
		addToCart(state, goods){
			const findResult = state.cartList.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count ++
			}else{
				state.cartList.push(goods)
			}
			this.commit('cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart', JSON.stringify(state.cartList))
		},
		updateCartList(state,{goods,type}){
			const findResult = state.cartList.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult[type] = goods[type]
			}
			this.commit('cart/saveToStorage')
		},
		updateGoodsState(state, value){
			state.cartList = state.cartList.map(x=>({
				...x,
				goods_state:value
			}))
			this.commit('cart/saveToStorage')
		},
		deleteCartList(state, goodId){
			state.cartList = state.cartList.filter(x=>x.goods_id !== goodId)
			this.commit('cart/saveToStorage')
		}
	},
	
	actions:{
		
	},
	
	getters:{
		cartTotal(state){
			return state.cartList.reduce((a,b)=>{return a + b.goods_count},0)
		},
		checkdGoods(state){
			return state.cartList.filter(x=>!!x.goods_state).reduce((a,b)=>{return a + b.goods_count},0)
		},
		amount(state){
			return state.cartList.filter(x=>!!x.goods_state)
								.reduce((a,b)=>{return a + b.goods_count * b.goods_price},0)
								.toFixed(2)
		}
	}
}