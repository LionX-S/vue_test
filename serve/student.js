const express = require("express");
const app = express();

app.use((request, response, next) => {
	console.log("有人请求服务器student了");
	console.log("请求的资源是", request.url);
	console.log("请求来自于", request.get("Host"));
	next();
});

app.get("/student", (request, response) => {
	const student = [
		{ id: "001", name: "tom", age: 18 },
		{ id: "002", name: "jack", age: 18 },
		{ id: "003", name: "jerry", age: 18 }
	];
	response.send(student);
});

app.listen(5001, (err) => {
	if (!err)
		console.log(
			"服务器启动成功，请求学生信息地址为http://localhost:5001/student"
		);
});
