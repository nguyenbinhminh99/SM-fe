var token = localStorage.getItem("token");
if (!token || token == "undefined" || token == "null"){
    // window.location.replace("/Pre%20School%20Template/smanagement/login.html?username=admin&password=admin%40123#");
    window.location.href = "/Pre%20School%20Template/smanagement/login.html?username=admin&password=admin%40123#"
}