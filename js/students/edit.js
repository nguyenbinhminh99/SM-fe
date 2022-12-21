var studentApi = 'http://127.0.0.1:8000/api/student';

var editPopup = document.getElementById('popup');
var eclose = document.getElementById('eclose');
eid = document.querySelector('input[name="eid"]');
firstname = document.querySelector('input[name="efirstname"]');
lastname = document.querySelector('input[name="elastname"]');
phone_number = document.querySelector('input[name="ephone_number"]');
email = document.querySelector('input[name="e_email"]');
identification = document.querySelector('input[name="eidentification"]');
address = document.querySelector('input[name="eaddress"]');
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
function editStudent(id)
{
    openPopup();
    console.log(firstname);
    var options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
    }
    fetch(studentApi + '/' + id, options)
    .then(function (response){
        return response.json();
    }).then(function (response){
        eid.value = id;
        firstname.value = response.student.firstname;
        lastname.value = response.student.lastname;
        phone_number.value = response.student.phone_number;
        email.value = response.student.email;
        identification.value = response.student.identification;
        address.value = response.student.address;
        gender.value = response.student.gender;
    })
    
}

function closePopup()
{
    editPopup.close();
}

function updateStudent(id, data, callback)
{
    id = eid.value,
    data = {
        firstname:firstname.value.escape(),
        lastname:lastname.value.escape(),
        email:email.value.escape(),
        phone_number:phone_number.value.escape(),
        identification:identification.value.escape(),
        address:address.value.escape(),
        gender:gender.value.escape()
    }
    if(firstname.value == ""
    || lastname.value == ""
    || email.value == ""
    || phone_number.value == ""
    || identification.value == ""
    || address.value == "") 
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

