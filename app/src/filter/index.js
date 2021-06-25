export default {
  install: (app) => {
    app.config.globalProperties.$filter = {
      gbToSize: (bytes) => {
        if (bytes === 0) return '0 GB'
        var k = 1000,
          sizes = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toFixed() + ' ' + sizes[i]
      }
    }
  }
}