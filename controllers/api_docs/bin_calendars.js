import { BinCalendarSrc } from '../../config/api_urls.js'
import fs from 'fs'

const weekday_nums = { '日': 0, '月': 1, '火': 2, '水': 3, '木': 4, '金': 5, '土': 6 }
const month_dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const linearSearch = (arr, key_name) => {
   let name = new RegExp(key_name)
   for(let i = 0; i < arr.length; i++){
      if(name.test(arr[i].name) == true){
         return arr[i]
      }
   }
}

const createCalendar = (weekdays, init_date) => {
   let bin_days = new Array(7)
   for(let i = 0; i < bin_days.length; i++){
      bin_days[i] = new Array()
   }

   for(let i = 0; i < weekdays.length; i++){
      let weekday = weekdays[i]
      let pos = weekday_nums[weekday.date]
      bin_days[pos].push({ freq: weekday.freq, bin: weekday.bin })
   }

   let calendar = new Object()
   let year = init_date.getFullYear()
   let month = init_date.getMonth()
   let days = new Array()
   /*
      JSON structure could be like this.
      {
         year: 2017,
         month: 10,
         days: [
            bins: [
               {
                  type: "焼却ゴミ類",
                  color: "blue"
               }
            ],
            bins: []
         ]
      }
   */

   const formatDate = (date, day) => {
      let target_date = new Date(date.setDate(day))
      let y = target_date.getFullYear()
      let m = target_date.getMonth()
      let d = target_date.getDate()
      return Date.parse(new Date(y, m, d))
   }

   let date = init_date
   let first_day = new Date(date.setDate(1)).getDay()
   let max_days = month_dates[month]

   // Looped by days in one month
   for(let i = 0; i < max_days; i++){
      let bins = new Array()
      // Looped by an array that stores bin data in each weekdays
      if(month == 0 && i < 3){
         days.push(bins)
         continue
      }

      for(let j = 0; j < bin_days.length; j++){
         let current_day = (i + first_day) % 7
         if(current_day == j && bin_days[j].length > 0){
            // Looped by linear list (like moving veritcally)
            for(let k = 0; k < bin_days[j].length; k++){
               let bin_data = bin_days[j][k]
               let week
               if(month == 0){
                   week = Math.floor((i - 2) / 7) + 1
               }else{
                   week = Math.floor(i / 7) + 1
               }
               if(week == bin_data.freq || bin_data.freq == 0){
                  bins.push(bin_data.bin)
               }
            }
            break
         }
      }
      days.push(bins)
   }

   calendar = { year: year, month: month + 1, days: days }
   return calendar
}

const getBinCalendars = (area, year, month) => {
   return new Promise((resolve, reject) => {
      fs.readFile('./models/fixtures/jsons/bin_calendars/滋賀県/草津市/草津市.json', 'utf-8', (err, data) => {
         let parsed_data = JSON.parse(data)
         let area = linearSearch(parsed_data.areas, '西渋川')
         if(month > 12){
            year += 1
            month = 1
         }else if(month < 1){
            year -= 1
            month = 12
         }
         let calendar = createCalendar(area.weekdays, new Date(year, month - 1))

         resolve({ name: area.name, calendar: calendar, bins: parsed_data.bins })
      })
   }).then((value) => {
      return value
   }).catch((err) => {
      return err
   })
}

module.exports = { getBinCalendars }
