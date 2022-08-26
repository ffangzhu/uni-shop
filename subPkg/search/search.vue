<template>
	<view>
	<view class="uni-search">
		<uni-search-bar 
			:focus="true"
			@input="inputHandler"
			cancelButton='none'
			:radius='50'
		>
		</uni-search-bar>
	</view>
	<view class="suggest-list" v-if='goodLists.length'>
		<view class="suggest-item" v-for="(item, i) in goodLists">
			<view class="good-item">{{item.goods_name}}</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
	<view class="search-history" v-else>
		<view class="search-history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="26" @click="cleanHistoryHandler"></uni-icons>
		</view>
		<view class="search-history-tag">
			<uni-tag 
				:text="tagItem" 
				:key='i'
				@click="clickTagHandler(tagItem)"
				v-for="(tagItem, i) in history">
			</uni-tag>
			
		</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord: '',
				timer: null,
				goodLists: [],
				historyList: [],
				
			};
		},
		computed:{
			history(){
				return [...this.historyList].reverse()
			}
			
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
			
		},
		methods:{
			inputHandler(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.keyWord = e
					this.searchGoods()
				},500)
			},
			async searchGoods(){
				if(!this.keyWord){
					this.goodLists = [];
					return
				}
				this.historyPush()
				const {data} = await uni.$http.get('/api/public/v1/goods/qsearch', {query:this.keyWord})
				if(data?.meta?.status !== 200){
					return uni.$showMsg()
				}
				this.goodLists = data.message.goods
			},
			historyPush(){
				// 解决唯一问题
				const set = new Set(this.historyList)
				set.delete(this.keyWord)
				set.add(this.keyWord)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			cleanHistoryHandler(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			},
			clickTagHandler(item){
				uni.navigateTo({
					url:'/subPkg/good_lists/good_lists?query=' + item
				})
			}
			
			
		}
	}
</script>

<style lang="scss">
	.uni-search{
		position: sticky;
		top:0;
		z-index: 999;
	}
	.suggest-list{
		padding: 0 5px;
		.suggest-item{
			display: flex;
			justify-content: space-between;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			.good-item{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.search-history{
		.search-history-title{
			display: flex;
			justify-content: space-between;
			padding: 10px 5px;
			border-bottom: 1px solid #efefef;
			
			
		}
		.search-history-tag{
			margin: 5px;
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin: 5px 0 0 5px
			}
		}
	}

</style>
