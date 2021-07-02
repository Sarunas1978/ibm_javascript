
let fetchDataToServer = function(type, value){
    fetch("http://localhost:8080", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "origin" :'http://localhost:3000',
        'Access-Control-Request-Method': 'POST'
        },
        body: JSON.stringify({
         [type]: value,
        })
    })
    .catch(err => console.log(err));
}
export default fetchDataToServer