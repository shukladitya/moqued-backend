const API_BASE_URL = 'http://localhost:3000/';
const getData = async (routeName) => {
  try {
    // Use axios to make a GET request
    const response = await axios.get(`${API_BASE_URL}${routeName}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Server responded with status ${error.response.status}`);
      console.error(error.response.data);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
      console.error('Error setting up the request:', error.message);
    }

    throw error;
  }
};

const postData = async (routeName, payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${routeName}`, payload);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Server responded with status ${error.response.status}`);
      console.error(error.response.data);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
      console.error('Error setting up the request:', error.message);
    }

    throw error;
  }
};

// // Example usage
// (async () => {
//   try {
//     const payload = {
//       key1: 'value1',
//       key2: 'value2',
//     };

//     const result = await postData('exampleRoute', payload);
//     console.log(result);
//   } catch (error) {
//     console.error('An error occurred:', error.message);
//   }
// })();
