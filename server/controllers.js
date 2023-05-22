import PostMessage from "./models.js";
import jwt from "jsonwebtoken"
const maxTime = 3 * 24 * 60 * 60;

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
        console.log(req.body);
        const { userName, email, password, address, age, phone } = req.body;
        console.log(req.body);
        const registerData = {
            userName: userName,
            email: email,
            password: password,
            address: address,
            age: age,
            phone: phone
        }
        console.log(registerData);
        const user = await PostMessage.findOne({ email: email })

        if (user) {
            const token = createToken(user._id.valueOf());
            console.log(token);
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxTime: maxTime * 1000,
            });
            req.session = {
                token: token,
                email: user.email,
                userName: user.userName
            };
            res.session = {
                token: token,
                email: user.email,
                userName: user.userName
            };
            res.json("exist")
        }
        else {
            await PostMessage.insertMany([registerData])
            res.json("not exist")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("not exist")


    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await PostMessage.findOne({ email: email, password: password })
        console.log(user._id.valueOf());
        if (user) {
            const token = createToken(user._id.valueOf());
            console.log(token);
            res.cookie("jwt", token, {
                httpOnly: false,
                maxTime: maxTime * 1000,
            });
            const responseData = {
                exist: "exist",
                token: token,
                user: user._id.valueOf(),
                email: user.email,
                userName: user.userName
            };

            res.status(200).json(responseData);
        }
        else {
            res.json("not exist");
        }
    }
    catch (e) {
        console.log(e);
        res.json("not exist")
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