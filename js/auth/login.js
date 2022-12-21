function handleLoginForm()
{
    var loginBtn = document.querySelector('#login');

    loginBtn.onclick = function () {
        username = document.querySelector('input[name="username"]');
        password = document.querySelector('input[name="password"]');

        var data = {
            username:username.value,
            password:password.value,
        };

        if(username.value == ""
        || password.value == "")
        {
            alert("Please enter a username and password");
        }

        createSession(data);
    }
}

var loginApi = 'http://127.0.0.1:8000/api/login';

function createSession(data)
{
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(data),
    }
    fetch(loginApi, options)
    .then(function (response){
        return response.json();
    })
    .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem("isLoggedIn", true);
        if(data.access_token){
            window.location.replace("/Pre%20School%20Template/smanagement/index.html");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

handleLoginForm();