document.addEventListener('DOMContentLoaded', () => {
    const fetchAPI = "http://localhost:3000/dogs"
    document.addEventListener("click", handleEvents)
    fetch(fetchAPI,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }   
    })
    .then(res => res.json())
    .then(dogs => dogs.forEach(renderDogs))
    function renderDogs(dog){
        console.log(dog)
        let tableBody = document.getElementById("table-body")
        tableBody.innerHTML +=`
        <tr data-id=${dog.id}>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id="edit-btn" data-id=${dog.id}>Edit</button></td>
      </tr>
        `
    }
    function handleEvents(e){
              e.preventDefault()
              if(e.target.id === "edit-btn"){
                editDog(e.target.dataset.id)
              } else if(e.target.parentElement.id === 'dog-form'){
                editedDog(e)
              }
            }
    function editDog(id) {
        let dogForm = document.getElementById("dog-form")
        fetch(`${fetchAPI}/${id}`)
        .then(res=> res.json())
        .then(dog =>{
             dogForm.name.value = dog.name
             dogForm.breed.value = dog.breed
             dogForm.sex.value = dog.sex
             dogForm.dataset.id = dog.id
             dogForm.addEventListener("submit", editedDog)
 
        })
    }
    function editedDog(e){
        let dog ={
            name: e.target.parentElement.name.value,
            breed: e.target.parentElement.breed.value,
            sex: e.target.parentElement.sex.value
        }
        fetch(`${fetchAPI}/${e.target.parentElement.dataset.id}`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(dog)
        })
        .then(res => res.json())
        .then(dog =>{
            const dogFound = document.querySelector(`tr[data-id="${dog.id}"]`)
            dogFound.children[0].innerText = dog.name
            dogFound.children[1].innerText = dog.breed
            dogFound.children[2].innerText = dog.sex
        })
    }
})

