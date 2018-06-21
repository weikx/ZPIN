const sendURL = 'https://www.easy-mock.com/mock/5b22ddc53d00c06fbd8e1f74/zpin'
const ERR_OK = 200
const request = (url, data = {}, method = 'GET') => new Promise((resolve, reject) => {
  url = sendURL + url
  setTimeout(() => {
    wx.request({
      url,
      data,
      method,
      success: res => resolve(res.data),
      fail: res => reject(res)
    })
  }, 1000) // 延时
})

export {request, ERR_OK}
