const listContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)
console.log('Starting List:', lists);


listContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
})

newListForm.addEventListener('submit', e => {
  e.preventDefault();

  const listName = newListInput.value;
  if (listName == null || listName === " ") return;
  const list = creatList(listName);
  console.log('post list:', list);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
})

function creatList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId)

}
//render our list

function render() {
  clearElement(listContainer);

  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;

    if (list.id === selectedListId) {
      listElement.classList.add('active-list')
    }
    listContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild)
  }
  // does the list container have a child? then remove it. 
}

render();