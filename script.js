let form = document.querySelector('.user-form');
let forms = document.querySelectorAll('.page');
let formInputs = document.querySelectorAll('.user-value');
let previous = document.querySelector('.back');
let next = document.querySelector('.next');
let errorShow = document.querySelectorAll('.first-form');

let addEducation = document.querySelector('.add-qulification');
let educationErrors = document.querySelectorAll('.educate'); 
let studyInputs = document.querySelectorAll('.qulified');

let appendQualification = document.querySelector('.append-eduction');

let proofs = document.querySelectorAll('.kyc');
let proofError = document.querySelectorAll('.kyc-detail');

let storedData = JSON.parse(localStorage.getItem('details') || '[]');

let temporary = JSON.parse(localStorage.getItem('userData')) || [{name:'',age: '',dob:'',gender:'',fatherName:'',motherName:'',qualification:[],aadhar:'',panCard:''}];



let userQualification = [];

let currentForm = 0;

function showForm(index) {
    forms.forEach((form, i) => {
        form.style.display = (i === index) ? 'flex' : 'none';
    });
}

function changeButtons() {
    previous.style.visibility = currentForm === 0 ? 'hidden' : 'visible';
    next.textContent = currentForm === forms.length - 1 ? 'Submit' : 'Next';
}

function validateFormInputs() {
    let isValid = true;
    formInputs.forEach((input, i) => {
        if (input.value.trim() === '') {
            errorShow[i].style.display = 'flex';
            isValid = false;
        } else {
            errorShow[i].style.display = 'none';
        }
    });
    return isValid;
}

function validateEducationInputs() {
    let isValid = true;
    studyInputs.forEach((input, i) => {
        if (input.value.trim() === '') {
            educationErrors[i].style.display = 'block';
            isValid = false;
        } else {
            educationErrors[i].style.display = 'none';
        }
    });
    return isValid;
}

function checkProof(){
    let isValid = true;
    proofs.forEach((proof,i)=>{
        if (proof.value === '') {
            proofError[i].style.display = 'block';
            isValid = false;
        } else {
            proofError[i].style.display = 'none';
        }
    });
    return isValid;
}

showForm(currentForm);
changeButtons();


function updateInputValue(){

    if(currentForm === 0){
        temporary[0].name =formInputs[0].value;
        temporary[0].age = formInputs[1].value;
        temporary[0].dob = formInputs[2].value;
        temporary[0].fatherName = formInputs[3].value;
        temporary[0].motherName = formInputs[4].value;
    }

    localStorage.setItem('userData',JSON.stringify(temporary));
   
}
// updateInputValue();


document.addEventListener('DOMContentLoaded',()=>{
    temporary = JSON.parse(localStorage.getItem('userData'));
    formInputs[0].value = temporary[0].name;
    formInputs[1].value = temporary[0].age;
    formInputs[2].value = temporary[0].dob;
    formInputs[3].value =temporary[0].fatherName;
    formInputs[4].value =temporary[0].motherName;
})

next.addEventListener('click', (e) => {
    e.preventDefault();

    let isValid = true;

    if (currentForm === 0) {
        isValid = validateFormInputs();
    } else if (currentForm === 1) {
        let qualifications = document.querySelectorAll('.education-container');
        
        if (!qualifications.length > 0) {
            alert("Please add at least one qualification.");
            isValid = false;
        }
    }else{
        
        if(checkProof()){
            console.log(checkProof());
            form.reset();
            
        }else{
            isValid = false;
        }
    }

    if (isValid && currentForm < forms.length) {
        // console.log(currentForm);
        currentForm++;
        if(currentForm===3){
            currentForm = 0;
            appendQualification.innerHTML = ""
            // console.log(currentForm+'  2');
        }
        
        showForm(currentForm);
        changeButtons();
    }
});

previous.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentForm > 0) {
        currentForm--;
        showForm(currentForm);
        changeButtons();
    }
});

addEducation.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateEducationInputs()) {
        let qualification = studyInputs[0].value.trim();
        let year = studyInputs[1].value.trim();

        const yearPattern = /^\d{4}$/;
        if (!yearPattern.test(year)) {
            educationErrors[1].style.display = 'block';
            return;
        } else {
            educationErrors[1].style.display = 'none';
        }
        userQualification.push({qualification:`${qualification}`,pass:`${year}`});
        console.log(userQualification);
        
        appendQualification.innerHTML = "";
        userQualification.forEach((ele,i)=>{
            
            let educationDetail = document.createElement('div');
            educationDetail.className = 'education-container';
            educationDetail.innerHTML = `
            <label>Qualification:</label>
                <p class="test">${ele.qualification}</p>
                <p>Completed Year: ${ele.pass}</p> 
                <button type="button" onclick="edit()" class='edit'>edit</button>
                <button class='del'>Delete</button>
            `;
            appendQualification.appendChild(educationDetail);

            let dele = educationDetail.querySelector('.del');
            dele.addEventListener('click',(e)=>{
                e.preventDefault();
                console.log(i);
                
            })
        })

        studyInputs.forEach(input => input.value = '');
    }
});


// function edit(){
    
//     let target = window.document.querySelector(".test");
//     let value = target.innerText
//     target.parentElement.innerHTML +=`<input type="text" value=${value}></input>`
    
//     target.remove();
    
// }



// let a = [{name:'loke',age: '',dob:'',gender:'',fatherName:'',motherName:'',qualification:[],aadhar:'',panCard:''}];

// if(!a[0].gender||a[0].gender){
//     a[0].gender = 'good';
// }

// console.log(a);


// let b =[{name:'loke',age:21}];
// b[0].name = 'vicky';

// console.log(b);
