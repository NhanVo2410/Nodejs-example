const ObjectId = require('mongodb').ObjectID;
const OrderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const commentModel = require('../models/comment.model');

exports.findAll = (req, res) => {
  OrderModel.find()
    .then((notes) => {
      res.send(notes);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.',
      });
    });
};

exports.populateOrders = async (req, res) => {
  try {
    const foundOrder = await OrderModel.findById(ObjectId('5ff2919d625f9ea2389a3915'))
      .populate({
        path: 'user', // bien tham chieu
        select: ['local.email', 'createdAt'],
      }).exec();
    res.json(foundOrder);
    console.log('Operation success');
  } catch (error) {
    console.log(`Operation failed.Error: ${error}`);
  }
};

exports.order_create = async () => {
  try {
    const order = new OrderModel({
      user: ObjectId('5fd1e9884d111a539009a26a'),
      totalprice: 0,
      orderitems: [{
        productid: ObjectId('5ff284a8c1793092eccef538'),
        productname: 'Hạt Giống Tâm Hồn',
        price: 120,
        qty: 2,
      },
      {
        productid: ObjectId('5ff2850ec1793092eccef539'),
        productname: 'Book Thay Đổi Cuộc Sống Với Nhân Số Học',
        price: 50,
        qty: 3,
      },
      ],
    });
    await order.save();
    console.log('Tạo thành công danh sách order');
  } catch (error) {
    console.log(`Ko tạo được các bản ghi.Error: ${error}`);
  }
};

// Cần join 2 collections: "order" và "user"
exports.populateUsers = async (req, res) => {
  try {
    const foundUsers = await userModel.findById(ObjectId('5fd00f239db9dc18f854162e')).populate({
      path: 'orders', // populate trường "tham chiếu"
      select: ['orderitems', 'totalprice'],
      // Lọc kết quả sau khi "populate" ?
      options: { limit: 5 },
    }).exec();
    res.json(foundUsers);
    foundUsers.forEach((user) => {
      console.log(`user = ${user}`);
    });
    console.log('Operation success');
  } catch (error) {
    console.log(`Operation failed.Error: ${error}`);
  }
};

// exports.populateOrders = async (req, res) => {
//   try {
//     const foundOrder = await OrderModel.find({})
//       .populate({
//         path: 'user',
//         select: ['username', 'email'],
//       }).exec();
//     res.json(foundOrder);
//     console.log('Operation success');
//   } catch (error) {
//     console.log(`Operation failed.Error: ${error}`);
//   }
// };

exports.populateComments = async (req, res) => {
  try {
    const foundComment = await commentModel.findById(ObjectId('5ff2b63e2e4add757f7b99ee'))
      .populate([
        {
          path: 'user',
          model: 'tblHelpDesk_User',
          select: ['local.email'],
        },
        {
          path: 'product',
          model: 'Product',
          select: ['name'],
        },
      ]).exec();
    res.json(foundComment);
    console.log('Operation success');
  } catch (error) {
    console.log(`Operation failed.Error: ${error}`);
  }
};
