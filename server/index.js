const express = require('express')
const app = express()

const PORT = process.env.PORT || 5500


app.listen(PORT, (err)=>{
    console.log(`server up on port ${PORT}`)
})