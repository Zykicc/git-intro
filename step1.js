const fs = require("fs");
const process = require("process");

function cat(file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${file}:, ${err}`);
      process.kill(1);
    }
    console.log("SUCCESS...", data);
  });
}

cat(process.argv[2]);
