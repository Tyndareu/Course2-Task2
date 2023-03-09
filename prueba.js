checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      let  enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                              .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                              .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
      return makeFilterArray(members);
      });
    });