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
                                  </div>
                                  <div class="field-result">
                                    <div class="field-pinned-tasks">
                                      <h2 class="sub-title">pinned tasks</h2>
                                      <ul></ul>
                                    </div>
                                    <div class="field-all-tasks">
                                      <h2 class="sub-title">all tasks</h2>
                                      <ul></ul>
                                    </div>
                                  </div>
                                </div>`   

    
    document.body.appendChild(this.taskField);
  }
}