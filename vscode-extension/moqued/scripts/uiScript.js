const availabePanel = ['json', 'xml', 'graphql', 'html'];
let activePanel = 'json';

// panel border bottom shifting logic
document
  .querySelector(`.${activePanel}-panel-btn`)
  .classList.add('active-panel');

availabePanel.forEach((panel) => {
  document
    .querySelector(`.${panel}-panel-btn`)
    .addEventListener('click', () => {
      document
        .querySelector(`.${activePanel}-panel-btn`)
        .classList.remove('active-panel');
      activePanel = panel;
      document
        .querySelector(`.${activePanel}-panel-btn`)
        .classList.add('active-panel');
    });
});

// schema options logic
const enableSchemaBtn = document.querySelector('#schema');
const schemaPanel = document.querySelector('.schema-definition-section');

schemaPanel.style.display = 'none';

enableSchemaBtn.addEventListener('change', () => {
  if (enableSchemaBtn.checked) {
    schemaPanel.style.display = 'block';
  } else {
    schemaPanel.style.display = 'none';
  }
});

const availableOptions = ['example', 'tree'];

let activeOption = 'example';

document
  .querySelector(`.json-${activeOption}`)
  .classList.add('active-schema-option');

availableOptions.forEach((option) => {
  document.querySelector(`.json-${option}`).addEventListener('click', () => {
    console.log(option);
    document
      .querySelector(`.active-schema-option`)
      .classList.remove('active-schema-option');
    activeOption = option;
    document
      .querySelector(`.json-${activeOption}`)
      .classList.add('active-schema-option');
  });
});

//
//
//
//
//
//
//
// toast notification logic-----------
const triggerNotification = (notification) => {
  const toast = document.querySelector('.toast');
  toast.style.display = 'flex';
  toast.innerHTML = `${notification}<div class='close-toast'>
    ╳
    </div>`;

  toast.classList.add('animateToast');
  setTimeout(() => {
    toast.classList.remove('animateToast');
  }, 3000);
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);

  const closeToastBtn = document.querySelector('.close-toast');
  closeToastBtn.addEventListener('click', () => {
    toast.classList.remove('animateToast');
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  });
};
const closeToast = () => {
  const toast = document.querySelector('.toast');
  setTimeout(() => {
    toast.classList.remove('animateToast');
  }, 3000);
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
};
