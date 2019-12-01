const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////
//Files

//Blocking, synchronous way
/* const textIn = fs.readFileSync(`${__dirname}/txt/input.txt`, "utf-8");
console.log(textIn);

const textOut = `This is what we know the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync(`${__dirname}/txt/output.txt`, textOut);
console.log("File written!"); */

//Non-blocking, asynchronous way
/* fs.readFile(`${__dirname}/txt/start.txt`, "utf-8", (err, data1) => {
  fs.readFile(`${__dirname}/txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`${__dirname}/txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(
        `${__dirname}/txt/final.txt`,
        `${data2}\n${data3}`,
        "utf-8",
        err => {
          console.log("Your file has been written");
        }
      );
    });
  });
});
console.log("Will read file"); */

///////////////////////////////
//Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world"
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});