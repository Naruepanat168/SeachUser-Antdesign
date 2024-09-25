const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')
const fs = require('fs');

const path = require('path');


// const routes = require('./Routes/user')
const app = express();
connectDB()

app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit: '10mb'}))


// อ่าน directory routes เพื่อ require routes ทุกไฟล์
fs.readdirSync('./routes').forEach(file => {
  if (file.endsWith('.js')) {
      const routePath = path.join(__dirname, 'routes', file);
      const route = require(routePath);
      app.use('/api', route);
  }
})

app.listen(8080,()=> console.log(('Sever Run on port 8080')))