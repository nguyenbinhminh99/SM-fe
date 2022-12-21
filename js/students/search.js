// var searchApi = 'https://smanagement1.herokuapp.com/api/search';

// function handleSearch(data, callback)
// {
//     var searchBtn = document.querySelector('#search');

//     searchBtn.onclick = function() {
//         search = document.querySelector('input[name="search"]');

//         var data = {
//             firstname: search.value
//         }

//     }
//     console.log(data);
//     var options = {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'X-Requested-With': 'XMLHttpRequest',
//             'Authorization': 'Bearer' + localStorage.getItem('token'),
//             'Connection': 'keep-alive',
//         },
//         body: JSON.stringify(data),
//     }
//     fetch(searchApi, options)
//     .then(function (response){
//         return response.json();
//     })
//     .then(callback);
// }