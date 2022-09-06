

import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import { $http } from '@escook/request-miniprogram'

uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function(option){
	uni.showLoading({
		title:'数据加载中'
	})
	if(option.url.indexOf('/my/') > -1){
		option.header.Authorization = store.state.user.token
	}
	console.log(option,'option')
}
$http.afterRequest = function(option){
	uni.hideLoading()
}
uni.$showMsg = function(title='数据加载失败', duration=1500){
	return uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
