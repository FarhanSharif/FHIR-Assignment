window.addEventListener("load", function() {

  // Get patient info when button clicked
  var btnGetInfo = document.getElementById('btn-getInfo');

  btnGetInfo.addEventListener("click", function() {

    // Get info using AJAX
    var xhr = new XMLHttpRequest();

    // Used 'atom-live-server' package to launch server from atom.io
    // then get JSON file data when button clicked
    xhr.open("GET", "patientFixed.json", true);

    // When JSON data retrieved, parse JSON, store info, and update HTML
    xhr.onload = function() {

      // Parse JSON file
      data = JSON.parse(xhr.response);

      // Store required info
      var patient_name = data.name[0].given[0] + " " + data.name[0].family[0];
      var organization_name = data.managingOrganization.display;
      var gender = data.gender;
      var conditions = data.conditions;
      var numConditions = conditions.length;

      // Update HTML with required info
      document.getElementById('patientName').innerHTML = patient_name;
      document.getElementById('organizationName').innerHTML = organization_name;
      document.getElementById('gender').innerHTML = gender;
      document.getElementById('numConditions').innerHTML = numConditions;

      var listConditions = "";

      // For each condition, append <li> element to listConditions
      for (var i = 0; i < numConditions; i++) {
        listConditions = listConditions + "\n<li>" + conditions[i] + "</li>";
      }

      // Update HTML with list of conditions (insert <li> elements under <ul>)
      document.getElementById('conditions').innerHTML = listConditions;

      // Disable button and change appearance
      btnGetInfo.style.pointerEvents = 'none';
      btnGetInfo.style.background = 'white';
      btnGetInfo.innerHTML = 'Got Patient Info';

    };

    xhr.send();

  });

});
