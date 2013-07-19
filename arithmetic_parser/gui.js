;(function(exports) {

  exports.calculateFormula = function() {
    var pattern = document.getElementById("formula").value;
    document.getElementById("original").innerHTML = pattern;
    // var pattern = "(1+2)^3-6+2";
    var i = new Interpreter(pattern);
    var sum = i.go();
    // console.log("the answer to " + pattern + " is " + sum);
    document.getElementById("sum").innerHTML = sum;
  };


}(this));
