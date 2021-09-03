//导入express
const express = require("express");
//创建一个app变量储存express应用
const app = express();
//添加morgan中间件
const morgan = require("morgan");
morgan.token("data", function getData(request) {
  return JSON.stringify(request.body);
});
//中间处理器
app.use(express.json());
//:行为 :路径 :状态码 :HTTP消息长度 - :响应时间  :数据
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
//数据
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//实现页面
app.get("/info", (require, response) => {
  response.send(
    `<p>Phonebook han info for ${persons.length} people</p>` + new Date()
  );
});
//获取资源
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
//获取单个电话簿条目
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((n) => n.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
//取persons中最大的id + 1
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};
//写入数据
app.post("/api/persons", (request, response) => {
  const body = request.body;
  //如果写入的数据缺少name或number属性的值，服务器将状态码400 bad request响应请求
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }

  if (persons.find((e) => e.name === body.name)) {
    return response.status(400).json({
      error: "已存在",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});
//删除单个电话簿条目
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((n) => n.id !== id);
  response.status(204).end();
});
//将http服务器分配给变量，并监听发送到端口3001的HTTP请求
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
