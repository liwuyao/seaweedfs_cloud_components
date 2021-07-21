module.exports = {
    devServer: {
        proxy:{
            '/cluster': {
                target: 'https://cloud.seaweedfs.com/',
                changeOrigin: true,
            },
        }
    }
}