console.log("injected");

JSON.parse = function () {
  console.log("hi");
};

console.log(JSON.parse);

JSON.parse();
