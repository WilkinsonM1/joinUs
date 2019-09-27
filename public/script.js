console.log('hello from the back end')

const info = document.getElementById('info')

fetch('http://localhost:3002/data')
.then (response => response.json())
.then (data=> {
    info.textContent = data.data
})

let button = document.getElementById('sendMe')
let input = document.getElementById('inp')

button.addEventListener('click', ()=>{
    fetch('http://localhost:3002/register', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: input.value
        })
    })
    window.location.reload()
})

input.addEventListener("keyup", () => {
    if (event.keyCode == 13) {
      button.click();
    }
  });

