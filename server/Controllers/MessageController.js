import MessageModel from "../Models/MessageModel.js";

export const addMessage = async (req, res) => {
    const {chatId , senderId,  text } = req.body
    const newMessage = new MessageModel({
        chatId, senderId, text
    })
    try {
        const result = await newMessage.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
};


export const getMessages = async (req , res) =>{
    const chatId = req.params.chatId;

    try {
        const result = await MessageModel.find({chatId})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
        
    }
    
}