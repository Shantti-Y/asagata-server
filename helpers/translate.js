const fs = require('fs')
const { getAPIData } = require('./promise.js')
const dotenv = require('dotenv')
dotenv.config()

const area_names = {
   "北海道": "Hokkaido",
   "青森県": "Aomori-ken",
   "岩手県": "Iwate-ken",
   "宮城県": "Miyagi-ken",
   "秋田県": "Akita-ken",
   "山形県": "Yamagata-ken",
   "福島県": "Fukushima-ken",
   "茨城県": "Ibaraki-ken",
   "栃木県": "Tochigi-ken",
   "群馬県": "Gunma-ken",
   "埼玉県": "Saitama-ken",
   "千葉県": "Chiba-ken",
   "東京都": "Tokyo",
   "神奈川県": "Kanagawa-ken",
   "新潟県": "Niigata-ken",
   "富山県": "Toyama-ken",
   "石川県": "Ishikawa-ken",
   "福井県": "Fukui-ken",
   "山梨県": "Yamanashi-ken",
   "長野県": "Nagano-ken",
   "岐阜県": "Gifu-ken",
   "静岡県": "Shizuoka-ken",
   "愛知県": "Aichi-ken",
   "三重県": "Mie-ken",
   "滋賀県": "Shiga-ken",
   "京都府": "Kyoto",
   "大阪府": "Osaka",
   "兵庫県": "Hyogo-ken",
   "奈良県": "Nara-ken",
   "和歌山県": "Wakayama-ken",
   "鳥取県": "Tottori-ken",
   "島根県": "Shimane-ken",
   "岡山県": "Okayama-ken",
   "広島県": "Hiroshima-ken",
   "山口県": "Yamaguchi-ken",
   "徳島県": "Tokushima-ken",
   "香川県": "Kagawa-ken",
   "愛媛県": "Ehime-ken",
   "高知県": "Kochi-ken",
   "福岡県": "Fukuoka-ken",
   "佐賀県": "Saga-ken",
   "長崎県": "Nagasaki-ken",
   "熊本県": "Kumamoto-ken",
   "大分県": "Oita-ken",
   "宮崎県": "Miyazaki-ken",
   "鹿児島県": "Kagoshima-ken",
   "沖縄県": "Okinawa-ken"
}
// TODO 非同期処理をループさせるには？
fs.readFile('../models/fixtures/jsons/open_weather_map/cities_in_japan.json', 'utf-8', (err, data) => {
   let parsed_data = JSON.parse(data)
   let count = 0
for(let i = 0; i < parsed_data.length; i++){
   console.log(parsed_data[i].name)
   let url = 'https://translation.googleapis.com/language/translate/v2?key=' +  process.env.GOOGLE_TRANSLATE_API_KEY
   + '&source=en&target=ja&format=text&q=' + parsed_data[i].name
   getAPIData(url).then((value) => {
      let parsed_value = JSON.parse(value)
      parsed_data[i].name = parsed_value.data.translations[0].translatedText
      console.log(parsed_data[i].name)
      if(count == parsed_data.length){
         fs.writeFile('../models/fixtures/jsons/open_weather_map/cities_in_japan.json', JSON.stringify(new_data, null, 3), (err) => {
            if(err) throw err
         })
      }
      count += 1
   }).catch((err) => {
      console.log(new Error(err))
   })
}



})

module.exports = { area_names }
