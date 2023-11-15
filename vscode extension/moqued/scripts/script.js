console.log(axios, 'axios');

const jsonForm = document.querySelector('.jsonForm');

console.log(jsonForm, 'jsonForm');

const jsonGetFormSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(jsonForm);

  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  try {
    console.log(jsonData, 'jsonData');
    const response = await axios.post('http://localhost:3000/json', jsonData, {
      mode: 'no-cors',
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

jsonForm.addEventListener('submit', jsonGetFormSubmit);
