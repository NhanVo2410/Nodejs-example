const ObjectId = require('mongodb').ObjectID;
const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');

// Simple version, without validation or sanitation
exports.test = (req, res) => {
  res.send('Greetings from the Test controller!');
};

exports.product_create = (req, res, next) => {
  const product = new ProductModel({
    name: req.body.name,
    price: req.body.price,
  });
  product.save((err) => {
    if (err) {
      return next(err);
    }
    return res.json(product);
  });
};

exports.get_product = (_, res) => {
  try {
    const result = ProductModel.find();
    // const result = await User.findById(userID.id).populate('ticket');
    if (result) {
      return res.status(200).send({
        message: 'sucess',
        data: result,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: e.message,
    });
  }
  return {};
};
exports.findAll = (req, res) => {
  ProductModel.find()
    .then((notes) => {
      res.send(notes);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.',
      });
    });
};

exports.getProductComment = async (req, res) => {
  const { id } = req.query;
  try {
    const foundProductComment = await ProductModel.findById(ObjectId(id))
      .populate([
        {
          path: 'comments', // bien tham chieu
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'tblHelpDesk_User',
            select: ['local.email', 'info.FullName'],
          },
          select: ['body'],
        },
      ]).exec();
    res.json(foundProductComment);
    console.log('Operation success');
  } catch (error) {
    console.log(`Operation failed.Error: ${error}`);
  }
};

exports.getProductAggregate = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  ProductModel.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'product',
        as: 'productcomment',
      },
    },
    // {
    //   $unwind: {
    //     path: '$productcomment',
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $lookup: {
        from: 'tblhelpdesk_users',
        localField: 'productcomment.user',
        foreignField: '_id',
        as: 'commentuser',
      },
    },
    {
      $group: {
        _id: '$_id',
        comment: {
          $push: {
            body: '$productcomment.body',
            body1: '$productcomment.body',
            user: '$commentuser.local.email',
          },
        },
      },
    },
  ], (err, docs) => {
    console.log(docs);
    res.json(docs);
  });
};

exports.getProductCommentAggregate = async (req, res) => {
  const { id } = req.query;
  ProductModel.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'product',
        as: 'productcomment',
      },
    },
    { $unwind: '$productcomment' },
    {
      $lookup: {
        from: 'tblhelpdesk_users',
        localField: 'productcomment.user',
        foreignField: '_id',
        as: 'commentuser',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: { $arrayElemAt: ['$commentuser.local.email', 0] },
        user: { $arrayElemAt: ['$commentuser.info.FullName', 0] },
        comment: '$productcomment.body',
      },
    },
  ], (err, docs) => {
    console.log(docs);
    res.json(docs);
  });
};

exports.AddProductComments = async (req, res, next) => {
  const { userid } = req.query;
  const { productid } = req.query;
  const bodycomment = req.body.body;
  const comment = new Comment({
    user: userid,
    product: productid,
    body: bodycomment,
  });

  const user = await UserModel.findById(userid);
  user.comments.push(comment);
  user.save();

  const product = await ProductModel.findById(productid);
  console.log(product);
  product.comments.push(comment);
  product.save();
  console.log(product);

  comment.save((err) => {
    if (err) {
      return next(err);
    }
    return res.json(comment);
  });
};
