document.getElementById("contact-form").addEventListener("submit", function(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const message = formData.get("message");


    //sending form data to spring backend 
    fetch("submitContactForm", {
        method: "POST",
        body: new URLSearchParams({name, message}),
        headers: {
            "Content-Type": "application/x-ww-form-urlencoded"
        },
    })
    .then((response)=> {
        if(response.ok){
            alert("Form submitted successfull!");
        }else {
            alert("Form submission Failed.");
        }
    })
    .catch((error) => {
        alert("Error: "+ error);
    });
});