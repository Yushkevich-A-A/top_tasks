/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import Task from '../Task/Task';

export default class TaskList {
  constructor(appField) {
    this.appField = appField;
    this.arrTask = [];
    this.input = document.querySelector('.input-text');
    this.error = document.querySelector('.error');
    this.pinnedTasksList = document.querySelector('.pinned-tasks-list');
    this.allTasksList = document.querySelector('.all-tasks-list');

    this.initDrawLists();
    this.addListener();
  }

  initDrawLists() {
    this.drawContentPinnedTask();
    this.drawContentAllTask();
  }

  drawContentPinnedTask() {
    this.arrPinnedTask = this.arrTask.filter((item) => item.pinned === true);
    this.drawList(this.pinnedTasksList, this.arrPinnedTask, 'checked-field checked');
  }

  drawContentAllTask() {
    this.arrAllTask = this.arrTask.filter((item) => item.pinned === false);

    if (this.input.value.trim() !== '') {
      this.arrAllTask = this.arrAllTask.filter((item) => {
        const valueLower = item.value;
        const inputValue = this.input.value;
        return valueLower.toLowerCase().includes(inputValue.toLowerCase());
      });
    }

    this.drawList(this.allTasksList, this.arrAllTask, 'checked-field');
  }

  drawList(mainArray, arrayData, className) {
    mainArray.innerHTML = '';
    for (const i of arrayData) {
      const li = document.createElement('li');
      li.classList.add('tasks-item');
      li.dataset.index = this.arrTask.findIndex((item) => item === i);
      li.innerHTML = `<p></p>
            <div class="${className}"></div>`;
      li.children[0].textContent = i.value;
      mainArray.appendChild(li);
    }
    this.checkEmptyBlock(mainArray);
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
    this.input.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.checkInputText(this.input.value);
        this.drawContentAllTask();
      }
    });

    this.input.addEventListener('focus', (event) => {
      this.input.classList.remove('input-error');
      this.error.classList.remove('active');
    });

    this.input.addEventListener('input', (event) => {
      this.drawContentAllTask();
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.checked-field')) {
        const li = event.target.closest('.tasks-item');
        this.arrTask[li.dataset.index].checked();
        this.initDrawLists();
      }
    });
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
