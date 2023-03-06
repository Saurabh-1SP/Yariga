import { json } from 'express';
import User from '../mongodb/models/user.js'

const getAllUsers= async (req,res) => {
    const {_end, _order, _start, _sort, title_like ='',} = req.query;

    const query = {};

    if(title_like) {
        query.title = { $regex: title_like, $options: 'i'};
    }
    try {
        const count = await User.countDocuments({query});

         const properties = await User
                .find(query)
                .limit(_end)
                .skip(_start)
                .sort({ [_sort]: _order })
    
            res.header('x-total-count', count);
            res.header('Access-control-Expose-Headers','x-total-count');
    
            res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createUser= async (req,res) => {

    try {

        const { name, email, avatar} =  req.body;
        
        const userExists = await User.findOne({email});
        
        
        if(userExists) return res.status(200).json(userExists);
    
        const newUser = await User.create({
            name,
            email,
            avatar,
        })
    
        res.status(200).json(newUser);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }

}

const getUserInfoById= async (req,res) => {

    const {id}= req.params

    // console.log(userId)
    try {

        const userExists = await User.findOne({_id: id}).populate('allProperties');
        
        // const userData = await JSON.stringify(userExists)
        res.status(200).json(userExists)
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export { 
    getAllUsers,
    createUser,
    getUserInfoById
}