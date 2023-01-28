const express = require("express");
const app = express();

app.use((request, response, next) => {
	console.log("有人请求服务器student了");
	console.log("请求的资源是", request.url);
	console.log("请求来自于", request.get("Host"));
	next();
});

app.get("/car", (request, response) => {
	const student = [
		{ id: "001", name: "奔驰" },
		{ id: "002", name: "宝马" },
		{ id: "003", name: "奥迪" }
	];
	response.send(student);
});

app.listen(5002, (err) => {
	if (!err)
		console.log(
			"服务器启动成功，请求car信息地址为http://localhost:5002/student"
		);
});
