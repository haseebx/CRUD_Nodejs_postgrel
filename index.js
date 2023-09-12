const express  = require("express")
const app = express()
const dotenv=require("dotenv")
dotenv.config()
const PORT = 5000
const dbUser = (require("./user"))
app.use(express.json())
app.get("/", (req,res)=>{
    res.send("Server started")
})

app.post("/add",dbUser.createUser)
app.get("/get",dbUser.getAllUser)
app.get("/getById/:id",dbUser.getUserbyid)
app.put("/updateById/:id",dbUser.updateUserbyid)
app.delete("/deleteById/:id",dbUser.deleteUserbyid)

app.listen(PORT, ()=>{console.log(`Server is runing on ${PORT}`);})