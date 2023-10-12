import post from '../models/post.js'
import PostModel from '../models/post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec() //? dobavlyaem infu o usere poto mu chto svyazany tablici

        res.json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Cannto get posts'
        })
}}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Cannot find post',
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Cannot get post :(',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Creation denied'
        });
    }
}