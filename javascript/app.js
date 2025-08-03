const headerH3 = document.querySelector(".header-h3");
const bodyH3 = document.querySelector(".body-h3");
const authH3 = document.querySelector(".auth-h3");


const headerDiv = document.querySelector(".header-div");
const bodyDiv = document.querySelector(".body-div");
const authDiv = document.querySelector(".auth-div");

headerH3.classList.add("active-h3");
bodyDiv.style.display = "none";
authDiv.style.display = "none";

const noAuthDiv = document.querySelector(".no-auth-data-div");
const bearerAuthDiv = document.querySelector(".bearer-auth-div");
const basicAuthDiv = document.querySelector(".basic-auth-div");

bearerAuthDiv.style.display = "none";
basicAuthDiv.style.display = "none";

const bodyFormDataDiv = document.querySelector(".body-data-div-2");
const bodyRawDataDiv = document.querySelector(".body-raw-data-div");

bodyFormDataDiv.style.display = "none";
bodyRawDataDiv.style.display = "none";

const headerForm = document.querySelector(".header-form");
const bodyFormData = document.querySelector(".body-data-div-2")
const addFormBtn1 = document.querySelector(".button");
const addFormBtn2 = document.querySelector(".button2");

let addFormInDiv = (button, div, className) => {
    button.addEventListener("click", () => {
        const newForm = document.createElement("form");
        newForm.classList.add("header-form");
        newForm.classList.add(className);
    
        const keyInput = document.createElement("input");
        keyInput.setAttribute('type', 'text');
        keyInput.setAttribute('placeholder', 'key');
    
        const valueInput = document.createElement('input');
        valueInput.setAttribute('type', 'text');
        valueInput.setAttribute('placeholder', 'value');
    
        const deleteImg = document.createElement('img');
        deleteImg.setAttribute('src', 'bin.png');
        deleteImg.setAttribute('height', '20');
    
        
        newForm.appendChild(keyInput);
        newForm.appendChild(valueInput);
        newForm.appendChild(deleteImg);
        
        deleteImg.addEventListener("click", () => {
            newForm.remove();
        });
        
        div.appendChild(newForm);
    });    
}

addFormInDiv(addFormBtn1, headerDiv, "header-form-1");
addFormInDiv(addFormBtn2, bodyFormData, "header-form-2");


headerH3.addEventListener("click", () => {
    headerH3.classList.add("active-h3");
    bodyH3.classList.remove("active-h3");
    authH3.classList.remove("active-h3");

    headerDiv.style.display = "block";
    bodyDiv.style.display = "none";
    authDiv.style.display = "none";

})

bodyH3.addEventListener("click", () => {
    headerH3.classList.remove("active-h3");
    bodyH3.classList.add("active-h3");
    authH3.classList.remove("active-h3");

    bodyDiv.style.display = "block";
    authDiv.style.display = "none";
    headerDiv.style.display = "none"
})

authH3.addEventListener("click", () => {
    headerH3.classList.remove("active-h3");
    bodyH3.classList.remove("active-h3");
    authH3.classList.add("active-h3");
    
    authDiv.style.display = "flex"
    bodyDiv.style.display = "none";
    headerDiv.style.display = "none";
})

const authSelect = document.querySelector(".selecting-auth");

authSelect.addEventListener("change", () => {
    let authSelectValue = authSelect.value;
    if(authSelectValue == "no-auth"){
        noAuthDiv.style.display = "flex";
        bearerAuthDiv.style.display = "none";
        basicAuthDiv.style.display = "none";
    }
    else if(authSelectValue == "bearer"){
        noAuthDiv.style.display = "none";
        bearerAuthDiv.style.display = "flex";
        basicAuthDiv.style.display = "none";
    }
    else if(authSelectValue == "basic-auth"){
        noAuthDiv.style.display = "none";
        bearerAuthDiv.style.display = "none";
        basicAuthDiv.style.display = "flex";
    }
});

let headerBodyDataType = document.querySelectorAll("input[name='body-type']");

headerBodyDataType.forEach((radioBtn) => {
    radioBtn.addEventListener("click", () => {
        let bodyDataType = radioBtn.value;

        if(bodyDataType == "none"){
            bodyFormDataDiv.style.display = "none";
            bodyRawDataDiv.style.display = "none";
        }
        else if(bodyDataType == "form-data"){
            bodyFormDataDiv.style.display = "block";
            bodyRawDataDiv.style.display = "none";
        }
        else if(bodyDataType == "raw"){
            bodyFormDataDiv.style.display = "none";
            bodyRawDataDiv.style.display = "flex";
        }
    })
})

const responseHeaderH2 = document.querySelector(".response-header");
const responseBodyH2 = document.querySelector(".response-body");

const responseBodyDiv = document.querySelector(".response-editor-div");
const responseHeaderDiv = document.querySelector(".response-header-table-div");

responseBodyH2.classList.add("active-response");
responseHeaderDiv.style.display = "none";

responseHeaderH2.addEventListener("click", () => {
    responseHeaderH2.classList.add("active-response");
    responseBodyH2.classList.remove("active-response");

    responseBodyDiv.style.display = "none";
    responseHeaderDiv.style.display = "block";
});

responseBodyH2.addEventListener("click", () => {
    responseBodyH2.classList.add("active-response");
    responseHeaderH2.classList.remove("active-response");

    responseBodyDiv.style.display = "block";
    responseHeaderDiv.style.display = "none";
});

