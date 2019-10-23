
//     var parent = [];
//     parent.push({
//       id: 1,
//       name: '1',
//       parent_id: 1
//     });
//     parent.push({
//       id: 11,
//       name: '1_1',
//       parent_id: 1
//     });
//     parent.push({
//       id: 12,
//       name: '1_2',
//       parent_id: 1
//     });
//     parent.push({
//       id: 111,
//       name: '1_1_1',
//       parent_id: 11
//     });
//     parent.push({
//       id: 1111,
//       name: '1_1_1_1',
//       parent_id: 111
//     });
//     parent.push({
//       id: 121,
//       name: '1_2_1',
//       parent_id: 12
//     });
//     parent.push({
//       id: 1112,
//       name: '1_1_1_2',
//       parent_id: 111
//     });
//     parent.push({
//       id: 11121,
//       name: '1_1_1_2_1',
//       parent_id: 1112
//     });
//     parent.push({
//       id: 122,
//       name: '1_2_2',
//       parent_id: 12
//     });
//     parent.push({
//       id: 1221,
//       name: '1_2_2_1',
//       parent_id: 122
//     });
// aaa(parent,1);

//   function aaa(text, sum) {
//       for (let i = 0; i < text.length; i++) {
//         if (text[i].parent_id == sum) {
//           console.log(text[i])
//           var v1 = text[i].id
//         } else {
//           if (v1 == text[i].parent_id) {
//             console.log(text[i])
//             // console.log(v1)
//             var v2 = text[i].id
//             // console.log(v2)
//             aaa(text, v2);
//           }
//         }
//       }
//     }

let arrli = [1, 10, 35, 61, 89, 36, 55]
var a = but(arrli)
console.log(a)
function but(arr) {
  var len = arr.length;
  var fals = len
  while (fals > 0) {
    fals = 0;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len; j++) {
        if (arr[j] > arr[j + 1]) { //如果数组的第一位大于第二位 那么将第二位记录下来，将第二位赋值成第一位，将第一位赋值成第二位
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
          fals = i
          console.log(arr)
        }
      }
    }
    len = fals
  }
  return arr;
}
var abc=test(arrli)
console.log(abc)
function test(arr) {
  var index = Math.floor(arr.length / 2)
  var pvt = arr.splice(index, 1)[0];
  var a = [];
  var b = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pvt) {
      a.push(arr[i])
    }else{
      b.push(arr[i])
    }
  }
  return a.concat(pvt).concat(b)
}
