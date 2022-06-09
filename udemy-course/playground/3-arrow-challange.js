const tasks = {
    taskts: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasktsToDo() {
        return this.taskts.filter((task) => !task.completed)
    }
}

console.log(tasks.getTasktsToDo())