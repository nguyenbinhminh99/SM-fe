function handleCreateForm()
{
    var createBtn = document.querySelector('#ucreate');


    createBtn.onclick = function () {

        username = document.querySelector('input[name="cusername"]');
        password = document.querySelector('input[name="cpassword"]');
        firstname = document.querySelector('input[name="cfirstname"]');
        lastname = document.querySelector('input[name="clastname"]');
        email = document.querySelector('input[name="cemail"]');
        phone_number = document.querySelector('input[name="cphone_number"]');
        var genderz = document.getElementById("cgender");
        var option_text = genderz.options[genderz.selectedIndex].text;
        gender = option_text;

        if(username.value == ""
        || password.value == ""
        || firstname.value == ""
        || lastname.value == ""
        || email.value == ""
        || phone_number.value == ""
        || gender == ""
        ) 
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
        }else if(password.value.length <8)
        {
            swal({
                text: "The password must be at least 8 characters!",
                icon: "warning",
            });
        }
        var data = {
            username:username.value,
            password:password.value,
            firstname:firstname.value,
            lastname:lastname.value,
            email:email.value,
            phone_number:phone_number.value,
            gender:gender,
        };

        createUser(data);
    }
}

var userApi = 'http://127.0.0.1:8000/api/user';

function createUser(data, callback)
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
    fetch(userApi, options)
    .then(function (response){
        return response.json();
    })
    .then(function (response){
        if(response.status == true)
        {
            swal("Success!", "Created", "success");
            username = document.querySelector('input[name="cusername"]');
            password = document.querySelector('input[name="cpassword"]');
            firstname = document.querySelector('input[name="cfirstname"]');
            lastname = document.querySelector('input[name="clastname"]');
            email = document.querySelector('input[name="cemail"]');
            phone_number = document.querySelector('input[name="cphone_number"]');
            var genderz = document.getElementById("cgender");
            var option_text = genderz.options[genderz.selectedIndex].text;
            gender = option_text;

            username.value = "";
            password.value = "";
            firstname.value = "";
            lastname.value = "";
            email.value = "";
            phone_number.value = "";
            gender = "";
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