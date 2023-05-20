import PostMessage from "./models.js";


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
        const { username, email, password, address, age, phone } = req.body;
        console.log(req.body);
        const registerData = {
            username: username,
            email: email,
            password: password,
            address: address,
            age: age,
            phone: phone
        }

        const check = await PostMessage.findOne({ email: email })
        if (check) {
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
        const { userName, password } = req.body
        console.log(req.body);
        const check = await PostMessage.findOne({ username: userName })
        console.log(check);
        if (check) {
            res.json("exist");
        }
        else {
            res.json("not exist");
        }
    }
    catch (e) {
        console.log(e);
        res.json("error and not exist")
    }
}