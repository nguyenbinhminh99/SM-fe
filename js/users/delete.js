var userApi = 'http://127.0.0.1:8000/api/user';

function deleteUser(id)
{
    var options = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
    }
    fetch(userApi + '/' + id, options)
    .then(function (response){
        return response.json();
    })
    .then(function(){
        var userItem = document.querySelector('.user-item-' + id);
        if(userItem)
        {
            swal({
                title: "Are you sure?",
                text: "Do you want to delete this user?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                userItem.remove();
                  swal("Poof! This user has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("This user is safe!");
                }
            });
        }
    });
}