const { users, transaction, products, profile } = require("../../models");

exports.addTransaction = async (req, res) =>{
    try {

        const data = req.body
        const newTransaction = await transaction.create({
            ...data,
            idBuyer: req.user.id
        })

        res.status(201).send({
            status:"succes",
            data:{
                transactions:newTransaction,
            }
        })
    } catch (error) {
        res.status(401).send({
            status:"failed",
            message:"server error"
        })
        
    }
}