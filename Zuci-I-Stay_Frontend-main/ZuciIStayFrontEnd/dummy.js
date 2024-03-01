const apiUrl = "https://jsonplaceholder.typicode.com/posts";

//trying fetch
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const filteredVariable = data.map(post => post.title);
        const renderVariable = document.getElementById('renderVariable');
        const uiElement = document.createElement('ul');
        filteredVariable.forEach(element => {
            const liElement = document.createElement('li');
            liElement.textContent = element;
            uiElement.appendChild(liElement);
        });
        renderVariable.appendChild(uiElement);
    })
    .catch(error => {
        console.error("Error found", error);
    });
