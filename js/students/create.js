function handleCreateForm()
{
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function () {
        firstname = document.querySelector('input[name="firstname"]');
        lastname = document.querySelector('input[name="lastname"]');
        email = document.querySelector('input[name="email"]');
        phone_number = document.querySelector('input[name="phone_number"]');
        var genderz = document.getElementById("gender");
        var option_text = genderz.options[genderz.selectedIndex].text;
        gender = option_text;
        identification = document.querySelector('input[name="identification"]');
        address = document.querySelector('input[name="address"]');

        var data = {
            firstname:firstname.value,
            lastname:lastname.value,
            email:email.value,
            phone_number:phone_number.value,
            gender:gender,
            identification:identification.value,
            address:address.value
        };

        if(firstname.value == ""
        || lastname.value == ""
        || email.value == ""
        || phone_number.value == ""
        || identification.value == ""
        || address.value == "") 
        {
            swal({
                text: "Required!",
                icon: "warning",
            });
        }else if(phone_number.value.length != 10)
        {
            swal({
                text: "Phone number must be 10 number!",
                icon: "warning",
            });
        }


        createStudent(data);
    }
}

var studentApi = 'http://127.0.0.1:8000/api/student';

function createStudent(data, callback)
{
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(data),
    }
    fetch(studentApi, options)
    .then(function (response){
        return response.json();
    })
    .then(function (response){
        if(response.status == true)
        {
            swal("Success!", "Created", "success");
            firstname = document.querySelector('input[name="firstname"]');
            lastname = document.querySelector('input[name="lastname"]');
            email = document.querySelector('input[name="email"]');
            phone_number = document.querySelector('input[name="phone_number"]');
            var genderz = document.getElementById("gender");
            var option_text = genderz.options[genderz.selectedIndex].text;
            gender = option_text;
            identification = document.querySelector('input[name="identification"]');
            address = document.querySelector('input[name="address"]');

            firstname.value = "";
            lastname.value = "";
            email.value = "";
            phone_number.value = "";
            identification.value = "";
            address.value = "";
        }
        if(response.status == false)
        {
            swal("Failed!", {
                className: "red-bg",
            });
        }
    })
    .then(callback);
}

handleCreateForm();    