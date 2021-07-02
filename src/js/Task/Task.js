export default class Task {
    constructor(value) {
        this.value = value;
        this.pinned = false;
    }

    checked() {
        if (this.pinned) {
            this.pinned = false;
            return;
        }
        this.pinned = true;
    }
}