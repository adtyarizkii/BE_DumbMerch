const { user, transaction, product} = require("../../models");

exports.addTransaction = async (req, res) =>{
    try {

        const data = req.body
        const newTransaction = await transaction.create({
            ...data,
            idBuyer: req.user.id,
            price: req.product.price
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

exports.getTransaction = async (req, res) =>{
    try {
        const data = await transaction.findAll({
            include: [
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: ["qty","idUser","createdAt","updatedAt"]
                    }
                },
                {
                    model: user,
                    as: "buyer",
                    attributes: {
                        exclude: ["password","createdAt","updatedAt"]
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: ["password","createdAt","updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["idProduct","idBuyer","idSeller","createdAt","updatedAt"]
            }
        })

        res.status(200).send({
            status: "success",
            data:{
                transaction:data
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        })
    }
}