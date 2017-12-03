const { XMLHttpRequest } = require('xmlhttprequest')

const getAPIData = (URL) => {
   return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      request.open('GET', URL, true)
      request.onload = () => {
         if(request.status === 200){
            resolve(request.responseText)
         }else{
            reject(new Error(request.statusText))
         }
      }

      request.onerror = () => {
         reject(new Error(request.statusText))
      }

      request.send()
   })
}

module.exports = { getAPIData }
