let listOfemployees = [];

const ObjectEmployees = {
    id: '',
    Name: '',
    Apellido: '',
    edad: 0,
}

let editing = false;

const form = document.querySelector('#forms');
const nameInput = document.querySelector('#name')
const lastnameInput = document.querySelector('#lastname')
const ageInput = document.querySelector('#age')

ageInput.addEventListener('input', function () {
    // Obtener el valor actual del campo de entrada
    const inputValue = ageInput.value;

    // Verificar si el valor ingresado no es un número
    if (isNaN(inputValue)) {
        // Si no es un número, borrar el último carácter ingresado
        ageInput.value = inputValue.slice(0, -1);
    }
});

form.addEventListener('submit', ValidateForm);

function ValidateForm(e) {
    e.preventDefault();

    if (nameInput.value === '' || lastnameInput.value ===''|| ageInput.value === null || isNaN(ageInput.value)){
        alert('All fields are required ');
        return;
        
    }

    if(editing){
        //editingEmployees();

        editing = false;
    }  else{
        ObjectEmployees.id = Date.now();
        ObjectEmployees.name = nameInput.value;
        ObjectEmployees.lastname = lastnameInput.value;
        ObjectEmployees.age = ageInput.value;

        AddEmployees();
    }

}

function AddEmployees (){
    listOfemployees.push({...ObjectEmployees});

    ShowEmployees();
}

function ShowEmployees(){
    const divemployees = document.querySelector('.divemployees');

    listOfemployees.forEach(employees => {
        const {id, name, lastname, age} = employees;

        const paragraph = document.createElement('p');
        paragraph.textContent = `${id} - ${name} - ${lastname} - ${age} - `;

        paragraph.dataset.id = id;

        const editingbtn = document.createElement ('button');
        //editingbtn.onclick = () => loademployee(employee);
        editingbtn.textContent = 'edit' ;
        editingbtn.classList.add('btn','btn-edit');
        paragraph.append(editingbtn);

        const deletebtn = document.createElement ('button');
        //deletebtn.onclick = () => deleteemployee(id);
        deletebtn.textContent = 'delete' ;
        deletebtn.classList.add('btn','btn-delete');
        paragraph.append(deletebtn);

        const hr = document.createElement('hr');

        divemployees.appendChild(paragraph);
        divemployees.appendChild(hr);

    });
}