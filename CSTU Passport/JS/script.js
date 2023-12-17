/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with JS
*/

const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate GroupID
function validateGroupID() {
  const GroupIDInput = document.getElementById("groupID");
  const size = GroupIDInput.value.trim().split(" ");
  const errorElement = document.getElementById("groupIDError");

  if (size.length !== 2) {

    errorElement.textContent = "Please enter your GroupID such as G 03.";
    return false;

  }else if(size[0] !== 'G'){

    errorElement.textContent = "Please enter the first letter as G.";
    return false;

  }else if(size[1] > 62){

    errorElement.textContent = "Please enter your Group number.";
    return false;
    
  }else {
    errorElement.textContent = "";
    // Clear the error message when valid
  }
  return true;
}

// Function to validate 
function validateSex() {
  const sexInput = document.getElementById("sex").value;
  const errorElement = document.getElementById("sexError");

  if (sexInput !== "F" && sexInput !== "M" && sexInput !== "-") {
    errorElement.textContent = "Please enter again.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
  validateSex();
  validateGroupID()
}
//declare a and z
var a = 0;
var z = 1;

function displaydata(){

  const fullname = document.getElementById("fullname");
  const studentid = document.getElementById("studentID");
  const work = document.getElementById("workTitle");
  const email = document.getElementById("email");
  const worktype = document.getElementById("activityType").value;
  const startdatetime = document.getElementById("startDate");
  const enddatetime = document.getElementById("endDate");
  const ayear = document.getElementById("academicYear").value;
  const semes = document.getElementById("semester").value;
  const locate = document.getElementById("location").value;
  const description = document.getElementById("description").value;
  const sex = document.getElementById("sex");
  const groupID = document.getElementById("groupID");
  
  
  validcheck();
  
  a = !validateName() + 
  !validateStudentID() + 
  !validateEmail() + 
  !validateWork() + 
  !validateWorkType() + 
  !validateGroupID() + 
  !validateSemester() + 
  !validateAyear() + 
  !validateLocation() + 
  !validateDate() +
  !validateSex();
  
  const errorElement = document.getElementById("allError");
    if (a  > 0 ) {
      errorElement.textContent = "ไม่สามารถบันทึกได้ เนื่องจากมีจุดผิดพลาด "+a+" จุด";
      alert("ไม่สามารถบันทึกได้เนื่องจากมีจุดผิดพลาด โปรดแก้ไขก่อนที่จะกด Submit อีกครั้ง");

    }
    else{
  
      if (z==1){
        document.getElementById("ActNext").insertAdjacentHTML("beforeend","<h1 id='font-noto1'>My Previous Activity</h1>");
        
      }
  
      
    //display picture
  
    var b = document.getElementById("picturedata").textContent;
  
            document.getElementById("ActNext").insertAdjacentHTML("afterend",
   '<table><div><tr id="style2"><td colspan="3"><h2 id="font-noto1">Activity '+z+' : '+work.value+'</h2></tr><tr id="style2"><td id="font-noto2"><h3>ภาพกิจกรรม</h3><img src="'+b+'" width="400vh" height="300vh" id="style3" /></td><td width="600vh" id="font-kanit1"><h2>ชื่อคนที่ทำกิจกรรม : '+fullname.value+'</h2><h3>เพศ : '+sex.value+'</h3><h3>รหัสนักศึกษา : '+studentid.value+'</h3><h3>อีเมลล์ : '+email.value+'</h3><h3>อยู่ปีการศึกษา : '+semes+'/'+ayear+'</h3><h3>เบอร์โทรศัพท์ : '+phone.value+'</h3><br><h3>ชนิดกิจกรรม : '+worktype+'</h3><h3>วันเริ่ม-จบกิจกรรม : '+startdatetime.value+' - '+enddatetime.value+'</h3><h3>สถานที่ทำกิจกรรม : '+locate+'</h3><h3>รายละเอียดกิจกรรมเพิ่มเติม : '+description+'</h3></td></tr></div></table>');
  
  
  
  
    
    errorElement.textContent = "";
    
     alert("บันทึกข้อมูลได้สำเร็จ");
     z++;

  }
  
  }

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail() || !validateSex() || !validateGroupID()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    group: formData.get("groupID").split(" ")[0],
    num: formData.get("groupID").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    sex: formData.get("sex"),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      //called function
      displaydata();

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("sex").addEventListener("input", validateSex);
document.getElementById("groupID").addEventListener("input", validateGroupID);
