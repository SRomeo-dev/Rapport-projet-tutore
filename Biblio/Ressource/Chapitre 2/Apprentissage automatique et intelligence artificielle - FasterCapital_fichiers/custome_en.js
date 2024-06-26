function myFunction() {
	const dropdown = document.getElementById('help');
	const formGroups = document.getElementsByClassName('form-group');
	for (let i = 0; i < formGroups.length; i++) {
		formGroups[i].style.display = 'none';
		const inputs = formGroups[i].querySelectorAll('input');
		for (let j = 0; j < inputs.length; j++) {
			inputs[j].required = false;
			}
			}
			const selectedDiv = document.getElementById(dropdown.value);
			selectedDiv.style.display = 'block';
			const selectedInputs = selectedDiv.querySelectorAll('input');
			for (let i = 0; i < selectedInputs.length; i++) {
				selectedInputs[i].required = true;
				}
				var messageDiv = document.getElementById("message");
				messageDiv.innerText = "";
				messageDiv.style.color = "black"; 
				};

function submitForm(event) {
   event.preventDefault(); 
  
  const dropdown = document.getElementById('help');
  var selectedOption = dropdown.value
  var formData = new FormData();
    formData.append("selectedDiv",selectedOption);
  var elementIds = ["name", "company", "email", "whatsapp", "country", "comment", "raised_money", "looking_money", "annual_income", 
	"cost_development", "tech_available_budget", "tech_need_raise", "materials_available_budget",
	"mega_raised_money", "mega_looking_money", "mega_annual_income", "business_analysis_available_budget", "sales_avalabile_budget", "marketing_avalabile_budget", "sales_services_interested_in", "business_analysis_services_interested_in", "materials_services_interested_in", "marketing_services_interested_in"];

	for (var i = 0; i < elementIds.length; i++) {
		var element = document.getElementById(elementIds[i]);
		var value = element.value;
		formData.append(elementIds[i], value);
	}
  
  
  var xhr = new XMLHttpRequest();
   xhr.open("POST", "https://fastercapital.com/content-assets/t61.php", true);
   xhr.onload = function(){
    if(xhr.status == 200){
      document.getElementById("help").value = "";
      var messageDiv = document.getElementById("message");
      messageDiv.innerText = "Form submitted successfully!";
      messageDiv.style.color = "green";
	  
    }
  }
  xhr.send(formData); 
 
  
};