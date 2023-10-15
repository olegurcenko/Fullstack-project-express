import post from '../models/post.js'
import PostModel from '../models/post.js'

export const getLastTags = async(req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Cannto get tags'
        })
    }
}

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

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await PostModel.findOneAndDelete(
            { _id: postId },
        );

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Cannot find post to delete',
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Cannot get post to delete :(',
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

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne({
            _id: postId,
        },
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'cant update post'
        });
    }
}