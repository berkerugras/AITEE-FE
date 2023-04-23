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

export const createUser = (req, res) => {
    res.send('create');
}

export const loginUser = (req, res) => {
    res.send('login');
}