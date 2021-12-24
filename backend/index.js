const connecttomongo = require('./db');
const express = require('express');
const cors = require('cors')

connecttomongo();


const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use("/api/notes",require("./routes/notes"));


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
