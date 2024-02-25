const jsonForm = document.querySelector('.jsonForm');

function serializeForm(form) {
  const formData = {};
  triggerNotification('Requesting Data...');

  for (const element of form.elements) {
    if (element.name && !element.disabled) {
      if (element.type === 'radio') {
        if (element.checked) {
          formData[element.name] = element.value;
        }
      } else if (element.type === 'checkbox') {
        formData[element.name] = element.checked;
      } else {
        formData[element.name] = element.value;
      }
    }
  }

  return formData;
}

const jsonGetFormSubmit = async (e) => {
  e.preventDefault();

  const formData = serializeForm(jsonForm);
  console.log(formData, 'formData');

  try {
    console.log(jsonData, 'jsonData');
    const response = await getData('health');
    console.log(response.data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

jsonForm.addEventListener('submit', jsonGetFormSubmit);
