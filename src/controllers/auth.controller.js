async function loginController (req, res) {
    const {username,email, password} = req.body;
   

    const user = await userModel.findOne({
        $or:[
            {
                username : username
            },{
                email: email
            },
        ]
    })       
    if(!user) {
        return res.status(401).json({
            message: "User not found"
        })
    }
     const hash = crypto.createHash('sha256').update(password).digest('hex');
    
    const isPasswordValid = hash === user.password;

    if(!ispasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '1d'})

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profieImage: user.profieImage   
        }
    })
}


async function registerController(req, res) {
    const {email,username, password, bio, profieImage} = req.body;
    
    // const isUserExistByEmail = await userModel.findOne({email})
    
    // if(isUserExistByEmail){
    //     return res.status(409).json({
    //         message: "User with this email already exists"
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({username})
    // if(isUserExistByUsername){
    //     return res.status(409).json({
    //         message: "User with this username already exists"
    //     })
    // }


    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "User with this email or username already exists" + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profieImage
    })

    // user ka data hona cahiye
    // data unique hona cahiye
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '1d'})

    res.cookie("token", token)
    res.status(201).json({
        message: "USer Regsitered Successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profieImage: user.profieImage   
        }
    })
}


module.exports = {
    loginController,
    registerController
}