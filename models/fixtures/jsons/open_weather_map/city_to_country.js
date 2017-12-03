let fs = require('fs')

const compare = (arr1, arr2) => {
   let new_arr = []
   let i = 0   // number of arr1 consumed
   let j = 0   // number of arr2 consumed
   while(true){
      if(i == arr1.length){
         new_arr = new_arr.concat(arr2.slice(j, arr2.length))
         break
      }else if(j == arr2.length){
         new_arr = new_arr.concat(arr1.slice(i, arr1.length))
         break
      }
      if(arr1[i].name < arr2[j].name){
         new_arr.push(arr1[i])
         i += 1
      }else{
         new_arr.push(arr2[j])
         j += 1
      }
   }

   return new_arr
}

const mergeSort = (arr) => {
      let length = arr.length
      if(arr.length == 1){
         return arr
      }else{
         let former = arr.slice(0, (length / 2))
         let letter = arr.slice((length / 2), length)
         former = mergeSort(former)
         letter = mergeSort(letter)

         let merged = compare(former, letter)

         return merged
      }
}

fs.readFile('./public/src/jsons/open_weather_map/cities_list.json', 'utf-8', (err, data) => {
   if(err) throw err
   let parsed_data = JSON.parse(data)
   let count = 0
   let new_data = new Array()
   for(let key in parsed_data){
      let obj = parsed_data[key]
      if(obj.country == 'JP'){
         new_data.push(obj)
         count += 1
      }
   }
   new_data = mergeSort(new_data)
   fs.writeFile('./public/src/jsons/open_weather_map/cities_in_japan.json', JSON.stringify(new_data, null, 3), (err) => {
      if(err) throw err
   })
   console.log('the result: ' + count)
})
