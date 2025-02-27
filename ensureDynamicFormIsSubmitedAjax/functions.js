// Select the form element with ID 'form-dataForm'
var form = $('#form-dataForm');

// Create a new FormData object to handle the form submission data (including files)
var form_data = new FormData();

// Loop through all input, select, and textarea elements in the form
$(form).find('input, select, textarea').each(function() {
  // Store the current element in a variable
  var input = $(this);
  
  // Get the name attribute of the current input
  var name = input.attr('name');
  
  // Only process elements that have a name attribute
  if (name) {
    // Check if the input is a file upload field
    if (input.attr('type') == 'file') {
      // For file inputs, check if a file has been selected
      if (input[0].files.length > 0) {
        // Add the file to the FormData object
        form_data.append(name, input[0].files[0]);
      }
    } else if (input.attr('type') == 'checkbox' || input.attr('type') == 'radio') {
      // For checkboxes and radio buttons, only add if they're checked
      if (input.is(':checked')) {
        // Add the value of the checked element
        form_data.append(name, input.val());
      }
    } else {
      // For all other input types (text, email, select, textarea, etc.)
      // Simply add their values
      form_data.append(name, input.val());
    }
  }
});

// Add a custom task parameter to the form data
form_data.append('task', 'taskName');

// Configure and send the AJAX request
var request = $.ajax({
  // The server endpoint to send the data to
  url: '../someLocation/handler.php',
  
  // Disable caching
  cache: false,
  
  // The form data to send
  data: form_data,
  
  // Prevent jQuery from automatically converting the FormData object
  processData: false,
  
  // Let the browser set the appropriate Content-Type header for form data
  contentType: false,
  
  // Use POST method for the request
  type: 'post',
  
  // Expect JSON response from the server
  dataType: 'json'
});
