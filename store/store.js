import Vue from 'vue'
import Vuex from 'vuex'
import m_cart from './modules/cart.js'
import m_user from '@/store/modules/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		cart: m_cart,
		user: m_user,
	}
})
export default store