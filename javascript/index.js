var bookMarkNameInput=document.getElementById('bookMarkNameInput')
var bookMarkUrlInput = document.getElementById('bookMarkUrlInput')
var searchInput = document.getElementById('searchInput')
var addBtn = document.getElementById('addBtn')
var updateBtn = document.getElementById('updateBtn')
var bookMarkerList = []
if (localStorage.getItem('bookMarkers')) {
    bookMarkerList = JSON.parse(localStorage.getItem('bookMarkers'))
    display(bookMarkerList)
}

function createBookMarker() {
    if (validation('bookMarkNameInput') && validation('bookMarkUrlInput')) {
        var flag=false
        for (var i = 0; i < bookMarkerList.length; i++) {
            if (bookMarkerList[i].bookMarkName.toLowerCase() === bookMarkNameInput.value.toLowerCase()) {
                flag = true
                break;
             }
            
        }
        if (flag) {
            alert('The bookmark is already exist')
        }
        else {
            var bookMarker = {
                bookMarkName: bookMarkNameInput.value,
                bookMarkUrl:bookMarkUrlInput.value
            }
           
            bookMarkerList.push(bookMarker)
            localStorage.setItem('bookMarkers',JSON.stringify(bookMarkerList))
            console.log(bookMarkerList);
            display(bookMarkerList)
    
        }
    }
    else {
        const template = document.getElementById('my-template');
        Swal.fire({
          html: template.innerHTML,
          customClass: {
            popup: 'my-popup', 
          },
          showConfirmButton: false,
          showCloseButton: true,
        });    }
  
    clearInputs()
  
}
function display(arr) {
    var cartona = ``
    for (var i = 0; i < arr.length; i++) {
        cartona+=` <tr>
              <td>${i+1}</td>
              <td>${arr[i].bookMarkName}		
              </td>
              <td><button class="btn btn-success text-white"  onclick='window.open("${arr[i].bookMarkUrl}","_blank");'><i class="fas fa-eye me-2" ></i>Visit</button></td>
              <td><button class="btn btn-danger" onclick='deleteBookMark(${i})' ><i class="fas fa-trash me-2"></i>Delete</button></td>
              <td><button class="btn btn-warning " onclick='update(${i})'><i class="fas fa-pen me-2" ></i>Update</button></td>

              </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartona
}
function deleteBookMark(index) {
    bookMarkerList.splice(index, 1)
    localStorage.setItem('bookMarkers',JSON.stringify(bookMarkerList))
    display(bookMarkerList)
    
}
var myIndex
function update(index) {
    myIndex=index
    bookMarkNameInput.value=bookMarkerList[index].bookMarkName
    bookMarkUrlInput.value = bookMarkerList[index].bookMarkUrl
    updateBtn.classList.replace('d-none','d-block')
    addBtn.classList.replace('d-block','d-none')
}
function UpdateBookMarker() {
    if (validation('bookMarkNameInput') && validation('bookMarkUrlInput')) {
        var flag = false
        for (var i = 0; i < bookMarkerList.length; i++) {
            if (bookMarkerList[i].bookMarkName.toLowerCase() === bookMarkNameInput.value.toLowerCase()) {
                flag = true
                break;
            }
            
        }
        if (flag) {
            alert('The bookmark is already exist')
            addBtn.classList.replace('d-none','d-block')
            updateBtn.classList.replace('d-block','d-none')
        }
        else {
            bookMarkerList[myIndex].bookMarkName = bookMarkNameInput.value
            bookMarkerList[myIndex].bookMarkUrl = bookMarkUrlInput.value
            addBtn.classList.replace('d-none', 'd-block')
            updateBtn.classList.replace('d-block', 'd-none')
            localStorage.setItem('bookMarkers', JSON.stringify(bookMarkerList))
            display(bookMarkerList)
        }
    }
    else {
        const template = document.getElementById('my-template');
        Swal.fire({
          html: template.innerHTML,
          customClass: {
            popup: 'my-popup', 
          },
          showConfirmButton: false,
          showCloseButton: true,
        });
    }
    clearInputs()
    
}
function search() {
    var searchResult = []
    for (let i = 0; i < bookMarkerList.length; i++) {
        if (bookMarkerList[i].bookMarkName.toLowerCase().includes(searchInput.value.toLowerCase())) {
            searchResult.push(bookMarkerList[i])
        }
        
    }
    display(searchResult)
    
    
}
function clearInputs() {
    bookMarkNameInput.value = null
    bookMarkUrlInput.value = null
    bookMarkNameInput.classList.remove('is-valid')
    bookMarkNameInput.classList.remove('is-invalid')
    bookMarkUrlInput.classList.remove('is-valid')
    bookMarkUrlInput.classList.remove('is-invalid')
}
function validation(id) {
    var regexs = {
        bookMarkNameInput: /^[a-zA-Z](\w\s?){2,}$/ig,
        bookMarkUrlInput:/^(http(s)?:\/\/)(www\.)?\w{3,100}\.(com|org|net)$/ig
    }
    var input=document.getElementById(id)
    var testString = input.value
    if (regexs[id].test(testString)) {
         input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        return true

    }
    else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        return false
    }
}