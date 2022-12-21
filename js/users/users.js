
var usersApi = 'http://127.0.0.1:8000/api/users';

var x = document.getElementById("DataTables_Table_0_info");


function start()
{
    x.style.display = "none";
    getUsers(renderUsers);
}

start();

function getUsers(callback)
{
    var options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
    }
    fetch(usersApi, options)
    .then(function (response) {
        return response.json();
    })
    .then(callback);
}

function renderUsers(users)
{
    var listUsers = document.querySelector('#users');

    var htmls = users.users.data.map(function (user){
        return `
        <tr class="user-item-${user.id}">
            <td>${user.username}</td>
            <td>${user.firstname} `+` ${user.lastname}</td>
            <td>${user.email}</td>
            <td>${user.phone_number}</td>
            <td>${user.gender}</td>
            <td>${user.status}</td>
            <td class="text-right">
            <div class="actions">
                <a href="#" class="btn btn-sm bg-success-light mr-2">
                <i class="fas fa-pen" onclick="editUser(${user.id})"></i>
                </a>
                <a href="#" class="btn btn-sm bg-danger-light">
                <i class="fas fa-trash" onclick="deleteUser(${user.id})"></i>
                </a>
            </div>
            </td>
        </tr>
        `
    })
    listUsers.innerHTML = htmls.join('');
}