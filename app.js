let listOfemployees = [];

const ObjectEmployees = {
    id: '',
    name: '',
    lastname: '',
    age: 0,
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
        editingEmployees();

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

    form.reset();

    CleanObject();
}

function CleanObject(){
    ObjectEmployees.id = '';
    ObjectEmployees.name = '';
    ObjectEmployees.lastname = '';
    ObjectEmployees.age = '';
    
    
}

function ShowEmployees(){



    CleanHtml();



    const divemployees = document.querySelector('.divemployees');

    listOfemployees.forEach(employee => {
        const {id, name, lastname, age} = employee;

        const paragraph = document.createElement('p');
        paragraph.textContent = `${id} - ${name} - ${lastname} - ${age} - `;

        paragraph.dataset.id = id;



        const editingbtn = document.createElement ('button');
        editingbtn.onclick = () => loademployee(employee);
        editingbtn.textContent = 'edit' ;
        editingbtn.classList.add('btn','btn-edit');
        paragraph.append(editingbtn);

        const deletebtn = document.createElement ('button');
        deletebtn.onclick = () => deleteemployee(id);
        deletebtn.textContent = 'delete' ;
        deletebtn.classList.add('btn','btn-delete');
        paragraph.append(deletebtn);

        const hr = document.createElement('hr');

        divemployees.appendChild(paragraph);
        divemployees.appendChild(hr);

    })
}



function loademployee(employee){
    const {id, name, lastname, age} = employee;

    nameInput.value = name;
    lastnameInput.value = lastname;
    ageInput.value = age;
    
    ObjectEmployees.id = id; 

    form.querySelector('button[type="submit"]').textContent = 'update'; 

    editing = true;
}

function editingEmployees(){

    ObjectEmployees.name =  nameInput.value;
    ObjectEmployees.lastname = lastnameInput.value;
    ObjectEmployees.age = ageInput.value;


    listOfemployees.map(employee => {

        if(employee.id === ObjectEmployees.id){

            employee.id = ObjectEmployees.id;
            employee.name = ObjectEmployees.name;
            employee.lastname = ObjectEmployees.lastname;
            employee.age = ObjectEmployees.age;

        }
    });

    CleanHtml();
    ShowEmployees();

    form.reset();

    form.querySelector('button[type="submit"]').textContent = 'Add';


    editing = false;


}

function deleteemployee(id){
    listOfemployees = listOfemployees.filter(employee => employee.id !== id);

    CleanHtml();
    ShowEmployees();

}

function CleanHtml(){
    const divemployees = document.querySelector('.divemployees');
    while(divemployees.firstChild){
        divemployees.removeChild(divemployees.firstChild);
    }
}