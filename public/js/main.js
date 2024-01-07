
(function(){
    async function sendForm(email, username, comment){
        const res = await fetch("/user-feedback", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body:JSON.stringify({email, username, comment})
        });
        return res.json();
    }

    function toggleError(show, message){
        const errorElement = document.getElementById("errorMessage");
        const direction = show ? "remove" : "add";
        errorElement.textContent = message;
        errorElement.classList[direction]("d-none");
    }
    
    const constraints = {
        username: {
            presence: true,
            length: {
                minimum: 2,
                maximum:12,
                message: "must be at least 2 characters"
              }
        },
        email: {
            presence: true,
            email: true
        },
        comment: {
            presence: true,
            length: {
                minimum: 30,
                maximum: 500
            }
        }
    }

    function formGroupError(childElement, isError = true, message = ""){
        document.querySelectorAll(".form-group").forEach(formGroup => {
            if(formGroup.contains(childElement)){
                const action = isError ? "add" : "remove";
                formGroup.classList[action]("has-error");
                formGroup.querySelector(".error-message").textContent = message;            
            }
        })
    }

    function toggleConfirmation(isShow, message = ""){
        const text = `Your feedback was recieved, your feedback id is:${message}`;
            document.getElementById(isShow ? "feedbackForm" : "confirmationContainer").classList.add("d-none");
            document.getElementById(isShow ? "confirmationContainer" : "feedbackForm").classList.remove("d-none");
            document.getElementById("confirmationMessage").textContent = text;
        
    }

    function disableSubmit(isDisabled){
        document.getElementById("submitButton").disabled = isDisabled;
    }
    
    document.addEventListener("DOMContentLoaded", function(event) { 
    
        const form = document.getElementById("feedbackForm");

        form.querySelectorAll(".validatable").forEach(element => {
            element.addEventListener("change", (event)=>{
                const validation = validate(form, constraints);
                const fieldName = event.target.id;
                const errors = validation && fieldName && validation[fieldName];
                disableSubmit(!!validation);
                formGroupError(event.target, !!errors, errors || '');
            })
        })
    
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const email = event.target.email.value;
            const username = event.target.username.value;
            const comment = event.target.comment.value;
    
            const result = await sendForm(email, username, comment);
    
            if(result.error){   
                toggleError(true, result.error || '');
                return;
            }
            toggleError(false, '');
            toggleConfirmation(true, result.feedbackID);
        });
    });
})();



