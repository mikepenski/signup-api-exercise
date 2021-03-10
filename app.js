const API_POST_URL = 'http://localhost:3000/api/post.php'; // declare your endpoint
const modal = new bootstrap.Modal(document.querySelector('.modal'));
const form = document.querySelector('.signup-form form');

/**
 * Form submit
 */
form.addEventListener('submit', e => {
  e.preventDefault(); // prevent reload current page on submit

  // get form values
  const data = {
    username: document.querySelector('[name=username]').value,
    email: document.querySelector('[name=email]').value,
    password: document.querySelector('[name=password]').value,
    confirm_password: document.querySelector('[name=confirm_password]').value,
    privacy: document.querySelector('[name=privacy]').checked,
  }

let renderError = (missingFields, errorPassword) => {

  
  let html = "";

  if(errorPassword){
    html += `<p>${errorPassword}</p>`;
  }

  const errorContainer = document.getElementById("errorMessage");   
  if(errorContainer == null){
      let errorMessage = document.createElement("div");
      errorMessage.id = "errorMessage";
      errorMessage.className = 'alert alert-danger';
      form.appendChild(errorMessage);
  }

 

  html += `<p>Please fill in the following fields</p>`;
  
  html += "<ul>";

  missingFields.forEach(missingField => {

    html += `<li>${missingField}</li>`;
    
  });
  
  html += "</ul>";


  console.log(html)
  errorMessage.innerHTML = html;

}

  // send values to api
  fetch(API_POST_URL, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {

    // console.log(res);

    // console.log(res.missing_fields);

    if(res.success == false){
      console.log(res)
      renderError(res.missing_fields, res.error_password);
      return
    } 

    if(res.success == true){
      modal.show();
    } 



    // check if response is ok

  });
});
