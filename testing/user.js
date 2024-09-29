/*
    This file creates a object with methods that can be used 
    for debbuging in web client. In order to see the packages 
    generated and the lifecicle of the request, the functions 
    need to be executed in the console of a web browser.
*/

link_localhost = "http://localhost:3001/";
link_production = ""

const test = {

    
    login: () => {
        fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: 'valeria@example.com',
                password: 'password123',
            })
        })
        .then(response => response.json())
        .then(data => console.log('User logged in:', data))
        .catch(error => console.error('Error:', error));
    }, 

    register : () =>{
        fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_firstname: "Valeria",
                user_lastname: "Perez",
                user_email: "valeria@example.com",
                password: "password123",
                user_username: "valeria_p",
                user_type: "usuario",
            })
        })
        .then(response => response.json())
        .then(data => console.log('User logged in:', data))
        .catch(error => console.error('Error:', error))
    
    }
}


