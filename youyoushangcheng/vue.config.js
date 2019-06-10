module.exports = {
	publicPath:'./',
	productionSourceMap:false,
	devServer: {
        proxy: {
            '/test': {
                target: 'http://uu.scyouyou.com/admin.php',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/test': ''
                }
            }
        }
    }
 // 	configureWebpack:config=>{
	// 	Object.assign(config,{
	// 		externals:{
	// 			'vue':'Vue',
	// 			'element-ui':'ELEMENT',
	// 			'vue-router': 'VueRouter',
	// 			'vuex': 'Vuex',
	// 		}
	// 	})
	// }
}