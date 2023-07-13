const express =require("express")
const { EmployeeModel } = require("../model/employModel")
const dashboardRouter=express.Router()
dashboardRouter.use(express.json())

dashboardRouter.get("/",async(req,res)=>{
try{
    const allEmployes=await EmployeeModel.find({
        author_ID:req.body.author_ID,
        author:req.body.author
    })
    res.status(200).send(allEmployes)
}
catch(err){
res.status(400).send({err:err})
}
})

dashboardRouter.post("/add",async(req,res)=>{
  let   {FirstName,LastName,Email,Department,Salary}=req.body

try{
const employ=new EmployeeModel({FirstName,LastName,Email,Department,Salary})
await employ.save()
res.status(200).send("employee added successfully")
}catch(err){
res.status(400).send({err:err})
}
})


dashboardRouter.patch("/update/:employeeId",async(req,res)=>{
    const {employeeId}=req.params
    const employ=await EmployeeModel .find({_id:employeeId})
    try{
        if(req.body.author_ID!=employ.author_ID){
            res.status(200).send({msg:"you are not authorized for this"})
        
        }
        else{
            await EmployeeModel.findByIdAndUpdate({_id:employeeId},req.body)
             res.status(200).send({msg:"emply updated"})
        }
    }catch(err){
        res.status(400).send({err:err})
    }
})


dashboardRouter.delete("/delete/:employeeId",async(req,res)=>{
    const {employeeId}=res.params
    const employ=await EmployeeModel .find({_id:employeeId})
    try{
        if(req.body.author_ID!=employ.author_ID){
            res.status(200).send({msg:"you are not authorized for this"})
        
        }
        else{
            await EmployeeModel.findByIdAndDelete({_id:employeeId},req.body)
             res.status(200).send({msg:"emply updated"})
        }
    }catch(err){
        res.status(400).send({err:err})
    }
})

module.exports={dashboardRouter}