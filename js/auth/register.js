function handleRegisterForm()
{
    var createBtn = document.querySelector('#register');

    createBtn.onclick = function () {
        rusername = document.querySelector('input[name="rusername"]');
        rpassword = document.querySelector('input[name="rpassword"]');
        rfirstname = document.querySelector('input[name="rfirstname"]');
        rlastname = document.querySelector('input[name="rlastname"]');
        remail = document.querySelector('input[name="remail"]');
        rphone_number = document.querySelector('input[name="rphone_number"]');
        var genderz = document.getElementById("rgender");
        var option_text = genderz.options[genderz.selectedIndex].text;
        rgender = option_text;

        var data = {
            username:rusername.value,
            password:rpassword.value,
            firstname:rfirstname.value,
            lastname:rlastname.value,
            email:remail.value,
            phone_number:rphone_number.value,
            gender:rgender,
        };


        if(
            rusername.value == ""
            || rpassword.value == ""
            || rfirstname.value == ""
            || rlastname.value == ""
            || remail.value == ""
            || rphone_number.value == "") 
            {
                alert("Required");;
            }

        createUser(data);
    }
}

var registerApi = 'http://127.0.0.1:8000/api/register';

function createUser(data, callback)
{
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data),
    }
    fetch(registerApi, options)
    .then(function (response){
        return response.json();
    })
    .then(callback);
}

handleRegisterForm();    