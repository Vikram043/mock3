const express=require("express")
const { Book } = require("../modules/book.model")

const bookRoute=express.Router()


bookRoute.post('/add',async(req,res)=>{
    const payload=req.body
    const {Title,Author,Genre,Description,Price}=req.body

    try {
      const newBook= new Book({...payload})  
       await newBook.save()
       return res.status(200).send({msg:"New Book Added"}) 
    } catch (error) {
        return res.status(400).send({msg:"Error",error}) 
    }
})

bookRoute.get('/',async(req,res)=>{

    try {
      const book_exits= await Book.find() 
      if(book_exits){
        return res.status(200).send({msg:book_exits}) 
      }else{
        return res.status(200).send({msg:"No Books available"})
      }
       
    } catch (error) {
        return res.status(400).send({msg:error.message}) 
    }
})


bookRoute.delete('/delete/:id',async(req,res)=>{
        const {id}=req.params
        if(!id) return res.status(200).send({msg:"Plese selsect book"})
    try {
       await Book.findByIdAndDelete({_id:id})
       return res.status(200).send({msg:"Book Deleted"})
    } catch (error) {
        return res.status(400).send({msg:error.message}) 
    }
})


module.exports={bookRoute}