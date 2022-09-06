import { mapGetters } from 'vuex'

export default{
	computed: {
		...mapGetters('cart', ['cartTotal'])
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index: 2,
				text: this.cartTotal + ''
			})
			
		}
	}
}