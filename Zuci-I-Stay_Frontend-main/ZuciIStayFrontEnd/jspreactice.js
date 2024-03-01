

// to get values from server

fetch("https://jsonplaceholder.typicode.com/users")
.then((res)=> res.json())
.then((data)=>console.log(data))



// to post values to the server
const data={
    title:"This is title.",
    body:"This is post body",
    userId:2
};

fetch("https://jsonplaceholder.typicode.com/posts",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{"Content-Type":"application/json"},
}).then((res)=>res.json())
.then((data)=>console.log(data))



fetch("https://jsonplaceholder.typicode.com/users")
.then((res)=>res.json())
.then((data)=>console.log(data))


