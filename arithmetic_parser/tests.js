var Interpreter = require('./arithmetic').Interpreter

var interpreter = new Interpreter();

var assert = function(got, expected) {
    if (got === expected) {
        process.stdout.write(".");
    } else {
        throw got + " does not equal " + expected;
    }
};

assert(interpreter.go("(1 + 2) * 3"), 9);
console.log()
