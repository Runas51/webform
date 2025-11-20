const http = require("http");
const fs = require("fs");
  
http.createServer(async (request, response) => {
        
    if(request.url == "/reg"){
           
          let body = "";
          for await (const chunk of request) {
            body += chunk;
          }
	let userEmail = "";
        let userName = "";
        let userPassword = "";
	response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	function isEmail(email) {
    	var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    	if (email !== '' && email.match(emailFormat)) { return true; }
    	return false;
	}
        const params = body.split("&");
        for(param of params){
            const [paramName, paramValue] = param.split("=");
	if(paramName === "logUserEMail") userEmail = paramValue;
            if(paramName === "logUserName") userName = paramValue;
            if(paramName === "logUserPassword") userPassword = paramValue;
        }
	if(isEmail(decodeURIComponent(userEmail))){
  const data = `${new Date().toISOString()} | ${decodeURIComponent(userName)} | ${decodeURIComponent(userEmail)} | ${decodeURIComponent(userPassword)}\n`;
  fs.appendFileSync('users.txt', data);
        response.end(`Добро пожаловать, ${decodeURIComponent(userName)}! Вы зарегистрированы!`);
    }
	else{response.end("Неправильный E-mail");}}
    else{
        fs.readFile("index.html", (_, data) => response.end(data));
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));
