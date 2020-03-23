  
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";

      toyForm.addEventListener('submit', (event) => {
        event.preventDefault()
        name = toyForm.getElementsByClassName('input-text').name.value
        image = toyForm.getElementsByClassName('input-text').image.value
        postToy(name,image)
        renderToys()
        toyForm.style.display = "none";
      })

    } else {
      toyForm.style.display = "none";
    }
  });

  function renderToys() {
    toyCollection.innerHTML = ''
    fetch('http://localhost:3000/toys')
    .then((response) => {
      return response.json();
    })
    .then((toys) => {
      toys.forEach(toy => {
        createToy(toy)
      });
  });
  }

  function createToy(toy) {
    toyDiv = document.createElement('div')
    toyDiv.setAttribute('class', 'card')
    toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id='${toy.id}'class="like-btn">Like <3</button>
    `
    toyCollection.append(toyDiv)
  }

  function postToy(name, image) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    })
  }

  toyCollection.addEventListener('click', (e) => {
    likes = parseInt(e.target.previousElementSibling.innerText)
    likes ++
    likeUpdated = `${likes} Likes`
    e.target.previousElementSibling.innerText = likeUpdated
    console.log(e.target.id)
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: 'PATCH',
      headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body: JSON.stringify({
        'likes': likes
    })
      
  })
})

  
  renderToys()

});