import { dummyExample } from '../../utils/dummyExample';
import { infoBtnHtml } from '../infoBtn';
const dummySelection = Math.floor(Math.random() * dummyExample.length);

const postJsonForm = async () => {};

export const jsonForms = `<form class="jsonForm">
     
<div class="requestType form-section">
  <label>Request type ${infoBtnHtml(
    'Select HTTP request type for API.',
  )}</label>
  <label for="get">
    <input type="radio" name="requestType" value="get" id="get">
    GET
  </label>

  <label for="post">
    <input type="radio" name="requestType" value="post" id="post" name="requestType">
    POST
  </label>
</div>

<div class="form-section input-field">
  <label for="apiName">Name</label>
  <input type="text" id="apiName" name="apiName" placeholder="${
    dummyExample[dummySelection].name
  }">
</div>  

<div class="form-section input-field">
  <label for="apiRoute">Route</label>
  <input type="text" id="apiRoute" name="apiRoute" placeholder="${
    dummyExample[dummySelection].route
  }">
</div>  

<div class="form-section input-field">
  <label for="description">Description</label>
  <textarea id="description" name="description" rows="4" cols="50" placeholder="${
    dummyExample[dummySelection].description
  }"></textarea>
</div>  

<div class="form-section checkbox-section"> 
  <input type="checkbox" name="schema" id="schema">
  <label for="schema">Schema${infoBtnHtml(
    'Specify the response schema. Provide either example JSON for response generation or build a JSON tree.',
  )}</label>
</div>  

<div class="schema-definition-section">
<div class="schema-definition-options">
    <div class='json-example'>JSON Example</div>
    <div class='json-tree'>JSON Tree</div>
</div>
  <textarea id="jsonTextarea" name="jsonTextarea" rows="10" cols="50" placeholder=${
    dummyExample[dummySelection].schema
  }></textarea>
</div>  

<div class="form-section checkbox-section">
  <input type="checkbox" name="pagination" id="pagination">
  <label for="pagination">Refresh ${infoBtnHtml(
    'Enable content refreshing with each request. Kindly note that this may result in longer loading times for each request, and credits will be deducted per hit.',
  )}</label>
</div>  

<div class="form-section checkbox-section">
  <input type="checkbox" name="offsetLimit" id="offsetLimit">
  <label for="offsetLimit">Limit & Offset ${infoBtnHtml(
    'Enable API pagination with updated offset and limit parameters in response for each request.',
  )}</label>
</div>  

<button type="submit" class="cookBtn">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" id="cookIcon">
<g>
    <g>
    <path d="m495.4,206.3c-7.7-8.2-20.7-8.6-28.9-0.8l-131.4,124h-303.7c-11.3,0-20.4,9.1-20.4,20.4 0,83.3 67.8,151.1 151.2,151.1h50.6c80.4,0 146.3-63.1 150.9-142.4l130.9-123.5c8.2-7.7 8.6-20.6 0.8-28.8zm-282.6,253.9h-50.6c-53.9,0-98.9-38.8-108.5-89.9h267.5c-9.6,51.1-54.5,89.9-108.4,89.9z"/>
    <path d="M97.6,254.9c11.3,0,20.4-9.1,20.4-20.4V114c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4v120.5    C77.2,245.8,86.3,254.9,97.6,254.9z"/>
    <path d="m271.1,254.9c11.3,0 20.4-9.1 20.4-20.4v-120.5c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v120.5c-2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/>
    <path d="m184.3,173.9c11.3,0 20.4-9.1 20.4-20.4v-122c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v122c0,11.2 9.2,20.4 20.4,20.4z"/>
    </g>
</g>
</svg>
Start cooking</button>
</form>`;
