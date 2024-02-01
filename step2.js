const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${file}:, ${err}`);
      process.kill(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch {
    console.error(`ERROR FETCHING ${url}: ${err}`);
  }
}

let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
