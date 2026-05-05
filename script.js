document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('registrationForm');
const studentDataBody = document.getElementById('studentData');
const tableWrapper = document.getElementById('tableWrapper');
    let students = JSON.parse(localStorage.getItem('students')) || [];
  let editIndex = -1;

 // craete initial render
    renderTable();

form.addEventListener('submit', (e) => {
   e.preventDefault();
     
  const name = document.getElementById('studentName').value.trim();
   const id = document.getElementById('studentID').value.trim();
   const email = document.getElementById('emailID').value.trim();
  const contact = document.getElementById('contactNo').value.trim();

     
   if (!/^[a-zA-Z\s]+$/.test(name)) return alert("Name must contain only characters.");
   if (isNaN(id) || id === "") return alert("Student ID must be a number.");
  if (isNaN(contact) || contact.length < 10) return alert("Contact must be at least 10 digits.");

   const studentObj = { name, id, email, contact };

  if (editIndex === -1) {
            students.push(studentObj);
     } else {
            students[editIndex] = studentObj;
       editIndex = -1;
     document.getElementById('submitBtn').innerText = "Add Student";
        }

    saveAndRender();
  form.reset();
    });

    function renderTable() {
     studentDataBody.innerHTML = '';
    students.forEach((student, index) => {
         const row = `
         <tr>
          <td>${student.name}</td>
            <td>${student.id}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
              <td>         
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
       <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
         </tr>
            `;
     studentDataBody.innerHTML += row;
        });
        
        //  Adding a vertical scrollbar
    if (students.length > 5) {
      tableWrapper.style.maxHeight = "300px";
       tableWrapper.style.overflowY = "scroll";
        } else {
     tableWrapper.style.maxHeight = "none";
        }
    }

    window.editStudent = (index) => {
        const student = students[index];
  document.getElementById('studentName').value = student.name;
  document.getElementById('studentID').value = student.id;
   document.getElementById('emailID').value = student.email;
  document.getElementById('contactNo').value = student.contact;
        
        editIndex = index;
     document.getElementById('submitBtn').innerText = "Update Student";
    };

    window.deleteStudent = (index) => {
     if (confirm("Are you sure you want to delete this record?")) {
         students.splice(index, 1);
       saveAndRender();
        }
    };

  function saveAndRender() {   localStorage.setItem('students', JSON.stringify(students));
       renderTable();
    }
});
