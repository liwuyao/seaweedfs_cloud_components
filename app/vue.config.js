module.exports = {
    devServer: {
        proxy:{
            '/api': {
                target: 'https://cloud.seaweedfs.com/',
                changeOrigin: true,
                pathRewrite: {
                '^/api': ''
                }
            },
        }
    }
}