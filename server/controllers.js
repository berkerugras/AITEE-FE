import PostMessage from "./models.js";
import jwt from "jsonwebtoken"
import bycrypt from "bcrypt";
import OrderCollection from "./orderModel.js";

const maxTime = 3 * 24 * 60 * 60; //token expirationı test etmek için bunu 10 yap

const saltRounds = 10


const hashPassword = async (password) => {

    try {
        const salt = await bycrypt.genSalt(saltRounds);
        const hash = await bycrypt.hash(password, salt);
        console.log('Hash: ', hash);
        return hash;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, "61d333a8-6325-4506-96e7-a180035cc26f", {
        expiresIn: maxTime,
    });
};

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {

        res.status(404).json({ message: error.message })

    }
}

export const createUser = async (req, res) => {
    try {
        const { userName, email, password, address, age, phone } = req.body;
        const passwordHash = await hashPassword(password);
        console.log("HASHIMIZ BUDUR", passwordHash);
        const registerData = {
            userName: userName,
            email: email,
            password: passwordHash,
            address: address,
            age: age,
            phone: phone
        }
        console.log([registerData]);
        const user = await PostMessage.findOne({ email: email })

        if (user) {
            console.log(123);
            res.status(200).json("exist");
        }
        else {
            console.log(passwordHash);
            try {
                await PostMessage.insertMany([registerData])
                const new_user = await PostMessage.findOne({ email: email })
                console.log(new_user);
                const token = createToken(new_user._id.valueOf());
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxTime: maxTime * 1000,
                });

                const responseData = {
                    exist: "not exist",
                    token: token,
                    email: email,
                    userName: userName,
                    address: address,
                    phone: phone,
                    age: age

                };

                res.status(200).json(responseData);
            }
            catch {
                await PostMessage.deleteMany(registerData)
                const new_user = await PostMessage.findOne({ email: email })
                console.log(new_user);
                res.status(500).json("not exist")

            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("not exist")


    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await PostMessage.findOne({ email: email })
        const isValidPassword = await bycrypt.compare(password, user.password);

        if (isValidPassword) {
            const token = createToken(user._id.valueOf());
            console.log(token);
            const options = {
                maxTime: new Date(Date.now() + maxTime) * 1000,
                httpOnly: true
            };
            const responseData = {
                exist: "exist",
                token: token,
                user: user._id.valueOf(),
                email: user.email,
                userName: user.userName,
                address: user.address,
                phone: user.phone,
                age: user.age

            };
            res.status(200).cookie("jwt", token, options).json(responseData);

            // res.status(200).json(responseData);
        }
        else {
            res.json("not exist");
        }
    }
    catch (e) {
        res.json("not exist")
    }
}


export const refreshToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await PostMessage.findOne({ email: email })

        const token = createToken(user._id.valueOf());
        const options = {
            maxTime: new Date(Date.now() + maxTime) * 1000,
            httpOnly: true
        };
        const responseData = {
            token: token
        };
        res.status(200).cookie("jwt", token, options).json(responseData);

    } catch (e) {
        console.log("couldn't refresh it");
        res.status(500).json("not exist")
    }
}

export const orderProduct = async (req, res) => {
    try {
        const { userName, email, address, phone, price, age, product, size } = req.body;
        console.log(product);
        const registerData = {
            userName: userName,
            email: email,
            address: address,
            phone: phone,
            price: price,
            age: age,
            product: product,
            size: size
        }
        try {
            await OrderCollection.insertMany([registerData])

            const user = await OrderCollection.findOne({ userName: userName })
            console.log(user);
            console.log(user.product);

        } catch (error) {
            console.log(error);
        }


        res.status(200).json("Ordered successfully");

    } catch (e) {
        console.log("couldn't order it");
        res.status(500).json("Cannot order")
    }
}

/*export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const check = await PostMessage.findOne({ email: email })
        console.log(check._id.valueOf());
        console.log(res);

        if (check) {
            res.json("exist");
            const token = createToken(check._id.valueOf());
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxTime: maxTime * 1000,
            });
            res.session.token = { "token": token };
            res.session.email = { "email": check.email };
            res.session.userName = { "userName": check.userName };
            console.log(res.session.token);

        }

        else {
            res.json("not exist");
        }
    }
    catch (e) {
        console.log(e);
        res.json("error and not exist")
    }
}*/