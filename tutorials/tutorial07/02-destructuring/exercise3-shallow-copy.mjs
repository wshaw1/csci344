const original = {
    name: "Eve",
    age: 20,
    courses: ['CSCI 182', 'CSCI 344']
};

const copy = { ...original, name: "Eve Modified", courses: ['CSCI 182', 'CSCI 344', 'CSCI 370'] };
console.log(original);
console.log(copy);
