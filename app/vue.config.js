module.exports = {
    devServer: {
        proxy:{
            '/cluster': {
                target: 'https://cloud.seaweedfs.com/cluster',
                changeOrigin: true,
                pathRewrite: {
                '^/cluster': ''
                }
            },
        }
    }
}