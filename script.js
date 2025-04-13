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

let progressLine = document.querySelector('.under-line')
let progressLine1 = document.querySelector('.under-line1')

let storedData = JSON.parse(localStorage.getItem('details') || '[]');
let temporary = JSON.parse(localStorage.getItem('userData')) || {
  name: '',
  age: '',
  dob: '',
  fatherName: '',
  motherName: '',
  qualifications: [],
  aadhar: '',
  panCard: ''
};

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

function checkProof() {
    let isValid = true;
    proofs.forEach((proof, i) => {
        if (proof.value.trim() === '') {
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

function updateInputValue() {
    if (currentForm === 0) {
        temporary.name = formInputs[0].value;
        temporary.age = formInputs[1].value;
        temporary.dob = formInputs[2].value;
        temporary.fatherName = formInputs[3].value;
        temporary.motherName = formInputs[4].value;
    }
    else if (currentForm === 1) {
        temporary.qualifications = userQualification;
    } else {
        temporary.aadhar = proofs[0].value;
        temporary.panCard = proofs[1].value;
    }

    localStorage.setItem('userData', JSON.stringify(temporary));
}

document.addEventListener('DOMContentLoaded', () => {
    if (temporary) {
        formInputs[0].value = temporary.name || '';
        formInputs[1].value = temporary.age || '';
        formInputs[2].value = temporary.dob || '';
        formInputs[3].value = temporary.fatherName || '';
        formInputs[4].value = temporary.motherName || '';
        
        if (temporary.qualifications && temporary.qualifications.length > 0) {
            userQualification = temporary.qualifications;
            renderQualifications();
        }
        
        proofs[0].value = temporary.aadhar || '';
        proofs[1].value = temporary.panCard || '';
    }
});

function renderQualifications() {
    appendQualification.innerHTML = "";
    userQualification.forEach((ele, i) => {
        let educationDetail = document.createElement('div');
        educationDetail.className = 'education-container';
        educationDetail.innerHTML = `
            <label>Qualification:</label>
            <p class="test">${ele.qualification}</p>
            <p>Completed Year: ${ele.pass}</p> 
            <button class='del'>Delete</button>
        `;
        appendQualification.appendChild(educationDetail);

        educationDetail.querySelector('.del').addEventListener('click', (e) => {
            e.preventDefault();
            userQualification.splice(i, 1);
            temporary.qualifications = userQualification;
            localStorage.setItem('userData', JSON.stringify(temporary));
            renderQualifications();
        });
    });
}

next.addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = true;

    if (currentForm === 0) {
        isValid = validateFormInputs();
        progressLine.classList.add('active');
        
    } else if (currentForm === 1) {
        if (userQualification.length === 0) {
            alert("Please add at least one qualification.");
            isValid = false;
        }
        progressLine1.classList.add('active');
    } else {
        isValid = checkProof();
    }

    if (isValid) {
        updateInputValue();
        
        if (currentForm === forms.length - 1) {
            
            storedData.push({
                name: temporary.name,
                age: temporary.age,
                dob: temporary.dob,
                gender: temporary.gender,
                fatherName: temporary.fatherName,
                motherName: temporary.motherName,
                qualifications: userQualification,
                aadhar: temporary.aadhar,
                panCard: temporary.panCard
            });

            localStorage.setItem('details', JSON.stringify(storedData));
            localStorage.removeItem('userData');
            
            form.reset();
            userQualification = [];
            appendQualification.innerHTML = "";
            currentForm = 0;
            temporary = {
                name: '',
                age: '',
                dob: '',
                gender: '',
                fatherName: '',
                motherName: '',
                qualifications: [],
                aadhar: '',
                panCard: ''
            };
        } else {
            currentForm++;
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
    currentForm==1?progressLine1.classList.remove('active'):
    currentForm==0?progressLine.classList.remove('active'):
    progressLine.classList.add('active');
    
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
        
        userQualification.push({
            qualification: qualification,
            pass: year
        });
        
        renderQualifications();
        studyInputs.forEach(input => input.value = '');
        updateInputValue();
    }
});