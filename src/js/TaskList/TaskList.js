import Task from '../Task/Task';

export default class TaskList {
    constructor(appField) {
        this.appField = appField;
        this.arrTask = [];
        this.input = document.querySelector('.input-text');
        this.error = document.querySelector('.error');
        this.pinnedTasksList = document.querySelector('.pinned-tasks-list');
        this.allTasksList = document.querySelector('.all-tasks-list');

        this.drawLists();
        this.addListener();
    }

    drawLists() {
        this.drawContentPinnedTask();
        this.drawContentAllTask();
    }

    drawContentPinnedTask() {
        this.pinnedTasksList.innerHTML = '';
        this.arrPinnedTask = this.arrTask.filter(item => item.pinned === true);
        for(let i of this.arrPinnedTask) {
            const li = document.createElement('li');
            li.classList.add('tasks-item');
            li.dataset.index = this.arrTask.findIndex(item => item === i);
            li.innerHTML = `<p></p>
            <div class="checked-field checked"></div>`;
            li.children[0].textContent = i.value;
            this.pinnedTasksList.appendChild(li);
        }
        this.checkEmptyBlock(this.pinnedTasksList);
    }

    drawContentAllTask(visualArray = this.arrTask) {
        this.allTasksList.innerHTML = '';
        this.arrAllTask = visualArray.filter(item => item.pinned === false);
        if (this.input.value.trim() !== '') {
            this.arrAllTask = this.arrAllTask.filter(item => {
                const valueLower = item.value;
                const inputValue = this.input.value;
                return valueLower.toLowerCase().includes(inputValue.toLowerCase());
            });
        }

        for(let i of this.arrAllTask) {
            const li = document.createElement('li');
            li.classList.add('tasks-item');
            li.dataset.index = this.arrTask.findIndex(item => item === i);
            li.innerHTML = `<p></p>
            <div class="checked-field"></div>`;
            li.children[0].textContent = i.value;
            this.allTasksList.appendChild(li);
        }
        this.checkEmptyBlock(this.allTasksList);
    }

    checkEmptyBlock(checklist) {
        const emptyBlock = checklist.closest('.content-list').querySelector('.empty-block');
        if (checklist.children.length === 0) {
            emptyBlock.classList.add('active');
        } else {
            emptyBlock.classList.remove('active');
        }
    }

    addListener() {
        this.input.addEventListener('keyup', event => {
            if(event.key === 'Enter') {
                this.checkInputText(this.input.value);
                this.drawContentAllTask();
            }
        })

        this.input.addEventListener('focus', event => {
            this.input.classList.remove('input-error');
            this.error.classList.remove('active');
        }) 

        this.input.addEventListener('input', event => {
            this.drawContentAllTask();
        }) 

        document.addEventListener('click', event => {
            if (event.target.closest('.checked-field')) {
                const li = event.target.closest('.tasks-item');
                this.arrTask[li.dataset.index].checked();
                this.drawLists();
            }
        }) 
    }

    checkInputText(value) {
        if (value.trim() === '') {
            this.error.classList.add('active');
            this.input.classList.add('input-error');
        } else {
            this.arrTask.push(new Task(value));
            this.drawContentAllTask();
        }
        this.resetInputValue();
    }

    resetInputValue() {
        this.input.blur();
        this.input.value = '';
    }
}