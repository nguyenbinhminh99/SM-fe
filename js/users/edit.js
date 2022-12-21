var userApi = 'http://127.0.0.1:8000/api/user';

var editPopup = document.getElementById('userpopup');
var eclose = document.getElementById('eclose');
eid = document.querySelector('input[name="eid"]');
username = document.querySelector('input[name="eusername"]');
firstname = document.querySelector('input[name="efirstname"]');
lastname = document.querySelector('input[name="elastname"]');
phone_number = document.querySelector('input[name="ephone_number"]');
email = document.querySelector('input[name="e_email"]');
gender = document.querySelector('input[name="egender"]');


String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

function openPopup()
{
    editPopup.showModal();
}
function editUser(id)
{
    openPopup();

    var options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
    }
    fetch(userApi + '/' + id, options)
    .then(function (response){
        return response.json();
    }).then(function (response){
        eid.value = id;
        username.value = response.user.username;
        firstname.value = response.user.firstname;
        lastname.value = response.user.lastname;
        phone_number.value = response.user.phone_number;
        email.value = response.user.email;
        gender.value = response.user.gender;
    })
    
}

function closePopup()
{
    editPopup.close();
}

function updateUser(id, data, callback)
{
    id = eid.value,
    data = {
        username:username.value,
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        phone_number:phone_number.value,
        gender:gender.value
    }
    if(firstname.value == ""
    || lastname.value == ""
    || email.value == ""
    || phone_number.value == "") 
    {
        closePopup()
        swal({
            text: "Required!",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                openPopup();
            }
        });
    }
    if(phone_number.value.length != 10)
    {
        closePopup()
        swal({
            text: "Phone number must be 10 number!",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                openPopup();
            }
        });
    }

    var options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(data),
    }
    fetch(studentApi + '/' +id, options)
    .then(function (response){
        return response.json();
    })
    .then(function (response){
        if(response.status == true)
        {
            closePopup()
            swal("Success!", "Updated", "success");
        }
        if(response.status == false)
        {
            closePopup()
            swal("Failed!", {
                className: "red-bg",
            });
        }
    })
    .catch(function (error){
        console.log(error);
    })
    .then(callback);
}

