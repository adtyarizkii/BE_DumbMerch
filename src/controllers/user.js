const Joi = require("joi")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {user, profile} = require("../../models");

// AUTH Register
exports.register = async (req, res) => {
  try {
    
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(4).required()
    })
  
    const {error} = schema.validate(req.body)
  
    if(error){
      return res.status(400).send({
        error: {
          message: error.details[0].message
        }
      })
    }

    const userExist = await user.findOne({
      where: { 
        email: req.body.email
      }
    })

    if(userExist){
      return res.status(400).send({
        status: "Failed",
        message: "Email has already been registered!"
      })
    }
// hashPassword
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10)

const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        status: "custommer",
    })

// Create Token
const token =jwt.sign({id: newUser.id}, process.env.TOKEN_KEY)
  
    res.status(201).send({
      status: "success",
      data: {
        user:{
        name: newUser.name,
        email: newUser.email,
        token
      }
      }
    })

  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error"
    })
  }

};

// Login Auth
exports.login = async (req, res) => {
  try {

    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(4).required()
    })
  
    const {error} = schema.validate(req.body)
    
    if(error){
      return res.status(400).send({
        error: {
          message: error.details[0].message
        }
      })
    }


    const userExist = await user.findOne({
      where: { 
        email: req.body.email
      }
    })

    if(!userExist){
      return res.status(400).send({
        status: "Failed",
        message: "Email not registered!"
      })
    }

// compare or validate password
const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if(!isValid){
      return res.status(400).send({
        status: "Failed",
        message: "Password not match!"
      })
    }

// Create Token
const token =jwt.sign({id: userExist.id}, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user:{
        name: userExist.name,
        email: userExist.email,
        status: userExist.status,
        token
      }
      }
    })

  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error"
    })
  }

};


// view data user
exports.getUsers = async (req, res) => {
  try {
    const dataUser = await user.findAll()

    res.send({
      status: "success",
      data: {
        dataUser
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// view detail User
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findOne({
      where: {
        id,
      },
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

//Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: `Update user id: ${id} finished`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
