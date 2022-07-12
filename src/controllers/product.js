const {product, user} = require("../../models");

exports.getProduct = async (req, res) => {
try {
    let data = await product.findAll({attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    
    data = JSON.parse(JSON.stringify(data))
    data = data.map((item)=>{
        return{
            ...item,
            image: process.env.PATH_FILE + item.image
        }
    }
    )
    res.status(200).send({
        status: "success",
        data: {
            product:data
        }
      });
} catch (error) {
    res.status(400).send({
        status: "eror",
        massage: "server eror"
      });
}
}

exports.addProduct = async (req, res) =>{
try {

    let addProduct = await product.create({
        ...req.body,
    image: req.file.filename,
    idUser: req.user.id
})

let productData = await product.findOne({
  where: {
    id: addProduct.id,
  },
  include: [
    {
      model: user,
      as: "user",
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    },
  ],
  attributes: {
    exclude: ["createdAt", "updatedAt", "idUser"],
  },
});

productData =JSON.parse(JSON.stringify(productData))
productData={
        ...productData,
        image: process.env.PATH_FILE + productData.image
    }

    res.status(201).send({
        status: "success",
        data: {
        product:
        productData
        }
      });

    } catch (error) {
      console.log(error);
          res.status(401).send({
            status: "eror",
            massage: "server eror"
          });        
    }
}

exports.detailProduct = async (req, res) =>{
try {
    const { id } = req.params;
    const data = await product.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
        },
    });

    res.status(201).send({
    status: "success",
    data: {
        product:data      
    }
});
} catch (error) {  
    res.status(401).send({
    status: "eror",
    massage: "server eror"
});         

}
}

exports.updateProduct = async (req, res) => {
    try {

      const { id } = req.params;

      const data = {
        name: req?.body?.name,
        desc: req?.body.desc,
        price: req?.body?.price,
        image: req?.file?.filename,
        qty: req?.body?.qty,
        idUser: req?.user?.id
      };

      await product.update(data, {
        where: {
          id,
        },
      });


      console.log(data);
      res.send({
        status: 'success',
        product: {
          id,
          name: data.name,
          desc: data.desc,
          price: data.price,
          image: data.image,
          qty: data.qty
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }


  };


  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
     const deleteProduct = await product.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        data: {
        id:deleteProduct
    } 
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };
  