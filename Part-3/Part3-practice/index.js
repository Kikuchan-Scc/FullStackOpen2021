const express = require("express");
const app = express();

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {      
  res.send("<h1>Hello World!</h1>");
});
//(请求，回应)
app.get("/api/notes", (req, res) => {   
  res.json(notes);
});
//取notes中最大的id + 1
const generateId = () => {    
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {    //数据写入
  const body = req.body
//如果接收到的数据缺少content 属性的值，服务器将使用状态码400 bad request响应请求
  if(!body.content) {     
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  notes = notes.concat(note)

  res.json(note)
})
//获取单个数据
app.get('/api/notes/:id',(req,res) => {     
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if(note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})
//删除
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});