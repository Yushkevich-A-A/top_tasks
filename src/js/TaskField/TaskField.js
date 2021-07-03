export default class TaskField {
  constructor() {
    this.drawTaskField();
  }

  drawTaskField() {
    this.taskField = document.createElement('div');
    this.taskField.classList.add('task-field');
    this.taskField.innerHTML = `<h1 class="main-title">
                                  TOP Tasks
                                </h1>
                                <div class="content">
                                  <div class="field-input">
                                    <input class="input-text" type="text">
                                    <div class="error">
                                      <span class="error-text">
                                        * поле ввода не должно быть пустым    
                                      </span>
                                    </div>
                                  </div>
                                  <div class="field-result">
                                    <div class="field-tasks pinned">
                                      <h2 class="sub-title">Pinned</h2>
                                      <div class="content-list">
                                        <ul class="pinned-tasks-list">
                                        </ul>
                                        <div class="empty-block">
                                          <p>No pinned tasks</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="field-tasks all">
                                      <h2 class="sub-title">All Tasks</h2>
                                      <div class="content-list">
                                        <ul class="all-tasks-list">
                                        </ul>
                                        <div class="empty-block">
                                          <p>No tasks found</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>`;

    document.body.appendChild(this.taskField);
  }
}
