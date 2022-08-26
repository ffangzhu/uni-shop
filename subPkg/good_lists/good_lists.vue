<template>
	<view>
	<view v-for="(item, i) in goodslist" :key='i' @click="gotoDetail(item)">
		<my-good-item :good='item'></my-good-item>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryParmas:{
					pagesize: 10,
					pagenum: 1,
					cid: '',
					query: '',
				},
				total: 0,
				goodslist:[],
				
			};
		},
		onLoad(parmas){
			console.log(parmas)
			this.queryParmas.cid = parmas.cid || ''
			this.queryParmas.query = parmas.query || ''
			this.getGoodsList()
			
		},
		onReachBottom(){
			if(this.queryParmas.pagesize * this.queryParmas.pagenum >=this.total) return uni.$showMsg('数据加载完毕')
			this.queryParmas.pagenum++
			this.getGoodsList()
			
		},
		onPullDownRefresh(){
			this.goodslist = []
			this.queryParmas.pagenum = 1
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb){
				const {data} = await uni.$http.get('/api/public/v1/goods/search',this.queryParmas)
				cb && cb()
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				this.goodslist = [...this.goodslist,...data.message.goods]
				this.total = data.message.total
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subPkg/good_details/good_details?goods_id=' + item.goods_id
				})
			}
			
		}
	}
</script>

<style lang="scss">

</style>
