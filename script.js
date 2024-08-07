document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.compras-form');
    const input = document.getElementById('compras');
    const alert = document.querySelector('.alert');
    const container = document.querySelector('.compras-container');
    const list = document.querySelector('.compras-lista');
    const clearBtn = document.querySelector('.excluir-btn');

    let editElement;
    let editFlag = false;
    let editID = "";

    form.addEventListener('submit', addItem);
    clearBtn.addEventListener('click', clearItems);

    function addItem(e) {
        e.preventDefault();
        const value = input.value;
        const id = new Date().getTime().toString();
        
        if (value && !editFlag) {
            createListItem(id, value);
            displayAlert("Item adicionado à lista", "success");
            container.classList.add('show-container');
            setBackToDefault();
        } else if (value && editFlag) {
            editElement.innerHTML = value;
            displayAlert("Item editado", "success");
            setBackToDefault();
        } else {
            displayAlert("Por favor, insira um valor", "danger");
        }
    }

    function displayAlert(text, action) {
        alert.textContent = text;
        alert.classList.add(`alert-${action}`);
        alert.classList.add('show');
        setTimeout(function () {
            alert.textContent = "";
            alert.classList.remove(`alert-${action}`);
            alert.classList.remove('show');
        }, 1000);
    }

    function clearItems() {
        const items = document.querySelectorAll('.compras-item');
        if (items.length > 0) {
            items.forEach(function (item) {
                list.removeChild(item);
            });
        }
        container.classList.remove('show-container');
        displayAlert("Lista limpa", "success");
        setBackToDefault();
    }

    function deleteItem(e) {
        const element = e.currentTarget.parentElement.parentElement;
        list.removeChild(element);
        if (list.children.length === 0) {
            container.classList.remove('show-container');
        }
        displayAlert("Item removido", "danger");
        setBackToDefault();
    }

    function editItem(e) {
        const element = e.currentTarget.parentElement.parentElement;
        editElement = element.querySelector('.titulo');
        input.value = editElement.innerHTML;
        editFlag = true;
        editID = element.dataset.id;
        document.querySelector('.adicionar-btn').textContent = "Editar";
    }

    function setBackToDefault() {
        input.value = '';
        editFlag = false;
        editID = '';
        document.querySelector('.adicionar-btn').textContent = "Adicionar";
    }

    function createListItem(id, value) {
        const element = document.createElement('article');
        element.classList.add('compras-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
            <p class="titulo">${value}</p>
            <div class="btn-container">
                <button type="button" class="editar-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="deletar-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        const deleteBtn = element.querySelector('.deletar-btn');
        deleteBtn.addEventListener('click', deleteItem);
        const editBtn = element.querySelector('.editar-btn');
        editBtn.addEventListener('click', editItem);
        list.appendChild(element);
    }
});
