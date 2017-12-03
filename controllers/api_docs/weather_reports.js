import { OpenWeatherMapURL } from '../../config/api_urls.js'
import { getAPIData } from '../../helpers/promise.js'
import fs from 'fs'

const iDSearch = (arr, key_name) => {
   let i
   while(arr.length > 0){
      i = Math.floor(arr.length / 2)
      if(arr[i].name == key_name){
         return arr[i]
      }else{
         if(arr[i].name > key_name){
            let l = i - 1
            arr = arr.slice(0, l)
         }else if(arr[i].name < key_name){
            let r = i + 1
            arr = arr.slice(r, arr.length)
         }
      }
   }
   return null
}

const getWeatherReport = (area_name) => {
   return new Promise((resolve, reject) => {
      fs.readFile('./models/fixtures/jsons/open_weather_map/cities_in_japan.json', 'utf-8', (err, data) => {
         let parsed_data = JSON.parse(data)
         let searched_data = iDSearch(parsed_data, area_name)

         if(searched_data == null){
            resolve("There's no result you're searching for.")
         }
         const xhr_url = OpenWeatherMapURL + '&id=' + searched_data.id
         getAPIData(xhr_url).then((value) => {
            resolve(JSON.parse(value))
         }).catch((msg) => {
            console.log(msg)
            reject(msg)
         })
      })
   }).then((value) => {
      return value
   }).catch((err) => {
      return err
   })
}



module.exports = { getWeatherReport }
