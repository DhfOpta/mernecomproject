require('dotenv').config()
const express = require('express')
const app = express();
var cors = require('cors')
const fs = require('fs')
const path = require('path')

// app.set('view engine', 'jade');

const PORT = process.env.PORT|| 5000 ;
const routr = require('./Router/auth-routr');
const routrContct = require('./Router/ContectForm/ContcytRout')
const conctDb = require('./MongoDB/MOngoos');
// const errMidelware = require('./err_middelwrae');
//this is a middleware:)

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET,POST,PATCH ,DELETE",

  credentials: true
}
app.use(cors(corsOptions))
// app.use(express.static(path.join(__dirname,'./client/dist')))
// console.log(__dirname,'.,/client/dist' ,'kjhgf');
app.use(express.json());
// app.use('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'./client/dist/index.html'))
// })


app.use('/', routr)
app.use('/contect', routrContct)
// app.engine('jade', require('jade').__express);
// const html_data=__dirname('D:/reactfirst/mern/client/indx.html')
// console.log(path.format('D:/reactfirst/mern/client/indx.html'));
// console.log('path')
// console.log(__dirname + '\\inndx.html');
// fs.readFile(__dirname + '/inndx.html', 'utf8', function (err, text) {
//   //   res.send(text); 
//   if (err) {
//     console.log("err", err);
//   } else {
//     return text
//   }
// });
// app.post('/htest', function (req, res) {
//   const { value } = req.body
//   fs.readFile(__dirname + '/inndx.html', 'utf8', function (err, text) {
//     // res.send(text); 
//     // if(err) {
//     //   console.log("err", err);
//     // } else {
//     //   return res.send(text);
//     // }
//     res.send(`<div class="card" style="width: 18rem;">
//     <div class="card-body">
//       <h5 class="card-title">Card title${value}</h5>
//       <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
//         content.</p>
//       <a href="#" class="card-link">Card link</a>
//       <a href="#" class="card-link">Another link</a>
//     </div>
//   </div>`)
//   });
// })
// app.get('/about', (req, res) => {
//     res.status(200).send('About')
// });
// app.use(errMidelware)
conctDb().then(() => {
  app.listen(PORT, () => console.log('Server PORT:' + PORT))

})











