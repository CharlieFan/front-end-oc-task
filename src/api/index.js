const getTodos = function(date) {
    return new Promise((resolve, reject) => {
        let result = localStorage.getItem(date);
        result = JSON.parse(result);
        if (result) {
            resolve(result);
        } else {
            resolve([]);
        }
    });
};

const setTodos = function(date, data) {
    data = JSON.stringify(data);
    return new Promise((resolve) => {
        localStorage.setItem(date, data);
        resolve(true);
    });
};

export default {
    getTodos,
    setTodos
};