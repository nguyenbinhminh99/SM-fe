var studentApi = 'http://127.0.0.1:8000/api/student';

var patchPopup = document.getElementById('patchPopup');

patchId = document.querySelector('input[name="patchId"]');
patchattr = document.querySelector('input[name="patchInput"]');


function openPatchPopup()
{
    patchPopup.showModal();
}

function closePatchPopup()
{
    patchPopup.close();
}

function updatePatch(id)
{
    openPatchPopup();
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
        patchattr.value = response.student.phone_number;
    })
}

function editPatch(id, data, callback)
{
    id = patchId.value,
    data = {
        phone_number:patchattr.value
    }
    if(patchattr.value == "")
    {
        closePatchPopup()
        swal({
            text: "Required!",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                openPatchPopup();
            }
        });
    }

    var options = {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
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
            closePatchPopup()
            swal("Success!", "Updated", "success");
        }
        if(response.status == false)
        {
            closePatchPopup()
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