export default {
  install: (app) => {
    app.config.globalProperties.$filter = {
      sizeToText: (bytes) => {
        if (bytes === 0 || bytes === undefined) return '0 Byte'
        var k = 1024,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toFixed() + ' ' + sizes[i]
      }
    }
  }
}