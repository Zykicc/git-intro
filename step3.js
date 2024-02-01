const fs = require("fs");
const process = require("process");
const axios = require("axios");

async function outPut(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", (err) => {
      if (err) {
        console.error(`Couldnt write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(file, out) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${file}:, ${err}`);
      process.kill(1);
    } else {
      outPut(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    console.log(res.data), out;
  } catch {
    console.error(`ERROR FETCHING ${url}: ${err}`);
  }
}

let path = process.argv[2];
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, out);
} else {
  cat(path), out;
}
