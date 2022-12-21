var studentApi = 'http://127.0.0.1:8000/api/student';

function deleteStudent(id)
{
    var options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
    }
    fetch(studentApi + '/' + id, options)
    .then(function (response){
        return response.json();
    })
    .then(function(response){
        var studentItem = document.querySelector('.student-item-' + id);
        if(studentItem)
        {
            if(response.status == true){
                swal({
                    title: "Are you sure?",
                    text: "Do you want to delete this student?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                    studentItem.remove();
                      swal("Poof! This student has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("This student is safe!");
                    }
                });
            }
            if(response.status == false)
            {
                swal({
                    text: "Failed!",
                    icon: "warning",
                })
            }

        }
    });
}

