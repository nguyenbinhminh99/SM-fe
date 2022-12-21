
var studentsApi = 'http://127.0.0.1:8000/api/students';

var x = document.getElementById("DataTables_Table_0_info");

var y = document.getElementById("DataTables_Table_0_length");

var p = document.getElementById("DataTables_Table_0_previous");

var n = document.getElementById("DataTables_Table_0_next");


function start()
{
    x.style.display = "none";
    y.style.display = "none";
    p.style.display = "none";
    n.style.display = "none";
    getStudents(renderStudents);
}

search = document.querySelector('input[name="search"]');

start();

function getStudents(callback, page_number)
{
    var options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Connection': 'keep-alive',
        },
    }
    fetch(studentsApi + '?page=' + page_number + '&search=', options)
    .then(function (response) {
        return response.json();
    })
    .then(callback);
}

function renderStudents(students)
{
    var listStudents = document.querySelector('#students');

    var htmls = students.students.data.map(function (student){

        return `
        <tr class="student-item-${student.id}">
            <td onclick="updatePatch(${student.id})">${student.firstname} `+ `${student.lastname}</td>
            <td onclick="updatePatch(${student.id})">${student.school.name}</td>
            <td onclick="updatePatch(${student.id})">${student.phone_number}</td>
            <td onclick="updatePatch(${student.id})">${student.email}</td>
            <td onclick="updatePatch(${student.id})">${student.gender}</td>
            <td onclick="updatePatch(${student.id})">${student.identification}</td>
            <td onclick="updatePatch(${student.id})">${student.address}</td>
            <td class="text-right">
            <div class="actions">
                <a href="#" class="btn btn-sm bg-success-light mr-2">
                <i class="fas fa-pen" onclick="editStudent(${student.id})"></i>
                </a>
                <a href="#" class="btn btn-sm bg-danger-light">
                <i class="fas fa-trash" onclick="deleteStudent(${student.id})"></i>
                </a>
            </div>
            </td>
        </tr>
        `
    })

    listStudents.innerHTML = htmls.join('');



    let str = '';
    for(let i = 1; i < students.students.last_page; i++)
    {
        str = str + '<td class="dataTables_paginate paging_simple_numbers" onclick="getStudents(renderStudents, '+ i +')">'+ '<button class="btn">' + i + '</button>' + '</td>';
    }

    pagin = document.getElementById('myList');
    pagin.innerHTML = str;
}