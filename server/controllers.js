import PostMessage from "./models.js";


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {

        res.status(404).json({message: error.message})
        
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    const newUser = PostMessage(user);
    try {
        await newUser.save();
        
    } catch (error) {
        
    }
    res.send('create');
}

export const loginUser = (req, res) => {
    res.send('login');
}