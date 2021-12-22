// const UserService = require('../service/user.service');
// const chalk = require('chalk');
const debug = require('debug')('aggregate');
const chalk = require('chalk');
const { ObjectId } = require('mongodb');
const User = require('../models/user.model');
const handle = require('../../../middleware/handleResponse.middleware');
const { error, success } = require('../../util/handleResponse.json');

exports.GetUserActive = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(chalk.red(id));
    User.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $unwind: '$tickets',
      },
      {
        $lookup: {
          from: 'tblhelpdesk_tickets',
          localField: 'tickets',
          foreignField: '_id',
          as: 'ticket_info',
        },
      },
      {
        $unwind: '$ticket_info',
      },
      {
        $lookup: {
          from: 'tblhelpdesk_ticketdetails',
          localField: 'ticket_info.TicketDetailID',
          foreignField: '_id',
          as: 'ticket_info.ticket_detail_info',
        },
      },
      {
        $unwind: '$ticket_info.ticket_detail_info',
      },
      {
        $project: {
          _id: 0,
          'local.Password': 0,
          'ticket_info.TicketDetailID': 0,
          // new_amount: { $add: ['$amount', 100] },
        },
      },
      {
        $skip: 0,
      },
      {
        $limit: 1,
      },
      {
        $sort: {
          createdDate: -1,
        },
      },
      // {
      //   $count: 'total',
      // },
    ],
    (err, result) => {
      console.log(result);
      return handle.responseOk(res, success[0].status, success[0].key, success[0].message, result);
    });
    // console.log(temp);
  } catch (err) {
    debug(chalk.redBright('error'));
    handle.responseError(res, error[0].status, error[0].message, err);
  }
};
exports.GetUserActive2 = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(chalk.red(id));
    User.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      // {
      //   $unwind: '$tickets',
      // },
      {
        $lookup: {

          from: 'tblhelpdesk_tickets',
          let: {
            the_ticket: '$tickets',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    '$_id', '$$the_ticket',
                  ],
                },
              },

            },
            {
              $lookup: {
                from: 'tblhelpdesk_ticketdetails',
                let: {
                  the_ticket_details: '$TicketDetailID',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: [
                          '$_id', '$$the_ticket_details',
                        ],
                      },
                    },
                  },
                ],
                as: 'test',
              },
            },
          ],
          as: 'abc',

        },
      },
      {
        $unwind: '$abc',
      },
      {
        $project: {
          _id: 0,
          'local.Password': 0,
          'ticket_info.TicketDetailID': 0,
          tickets: 0,
          // new_amount: { $add: ['$amount', 100] },
        },
      },

    ],
    (err, docs) => {
      console.log(docs);
      res.status(200).json({
        success: true,
        message: 'ok con dê',
        data: docs,
      });
    });
  } catch (err) {
    debug(chalk.redBright('error'));
    handle.responseError(res, error[0].status, error[0].message, err);
  }
};
exports.GetTwoColl = async (req, res) => {
  try {
    User.aggregate([
      // {
      //   $unwind: '$tickets',
      // },
      {
        $lookup: {
          from: 'tblhelpdesk_tickets',
          localField: 'tickets',
          foreignField: '_id',
          as: 'ticket_info',
        },
      },
      {
        $unwind: '$ticket_info',
      },
      {
        $lookup: {
          from: 'tblhelpdesk_ticketdetails',
          localField: 'ticket_info.TicketDetailID',
          foreignField: '_id',
          as: 'ticket_detail_info',
        },
      },
      {
        $unwind: '$ticket_detail_info',
      },
      {
        $project: {
          _id: 0,
          tickets: 0,
          TicketDetailID: 0,
          'local.Password': 0,
          // new_amount: { $add: ['$amount', 100] },
        },
      },
    ],
    (err, docs) => {
      console.log(docs);
      res.status(200).json({
        success: true,
        message: 'ok con dê',
        data: docs,
      });
    });
    // console.log(temp);
  } catch (err) {
    debug(chalk.redBright('error'));
    handle.responseError(res, error[0].status, error[0].message, err);
  }
};
exports.GetUserActive3 = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(chalk.red(id));
    User.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'orders',
          let: {
            the_orders: '$orders',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    '$_id', '$$the_orders',
                  ],
                },
              },
            }, {
              $lookup: {
                from: 'categories',
                let: {
                  the_categories: '$categories',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: [
                          '$_id', '$$the_categories',
                        ],
                      },
                    },
                  }, {
                    $lookup: {
                      from: 'products',
                      let: {
                        the_product: '$products',
                      },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $in: [
                                '$_id', '$$the_product',
                              ],
                            },
                          },
                        }, {
                          $lookup: {
                            from: 'tblhelpdesk_tickets',
                            let: {
                              the_tickets: '$tickets',
                            },
                            pipeline: [
                              {
                                $match: {
                                  Status: {
                                    $eq: 'active',
                                  },
                                  $expr: {
                                    $in: [
                                      '$_id', '$$the_tickets',
                                    ],
                                  },
                                },
                              }, {
                                $lookup: {
                                  from: 'tblhelpdesk_ticketdetails',
                                  let: {
                                    the_ticket_detail: '$TicketDetailID',
                                  },
                                  pipeline: [
                                    {
                                      $match: {
                                        $expr: {
                                          $eq: [
                                            '$_id', '$$the_ticket_detail',
                                          ],
                                        },
                                      },
                                    }, {
                                      $lookup: {
                                        from: 'comments',
                                        let: {
                                          the_comment: '$comments',
                                        },
                                        pipeline: [
                                          {
                                            $match: {
                                              $expr: {
                                                $in: [
                                                  '$_id', '$$the_comment',
                                                ],
                                              },
                                            },
                                          }, {
                                            $addFields: {
                                              temp: 'meomeo',
                                            },
                                          },
                                        ],
                                        as: 'comment_info',
                                      },
                                    },
                                  ],
                                  as: 'tickets_detail_info',
                                },
                              },
                            ],
                            as: 'tickets_info',
                          },
                        },
                      ],
                      as: 'product_info',
                    },
                  },
                ],
                as: 'category_info',
              },
            },
          ],
          as: 'orders_info',
        },
      },
      {
        $unwind: '$orders_info',
      },
      {
        $project: {
          // _id: 0,
          'local.Password': 0,
          'orders_info._id': 0,
          'orders_info.tickets': 0,
          'orders_info.categories': 0,
          'orders_info.category_info._id': 0,
          'orders_info.category_info.products': 0,
          'orders_info.category_info.product_info._id': 0,
          'orders_info.category_info.product_info.tickets': 0,
          'orders_info.category_info.product_info.tickets_info._id': 0,
          'orders_info.category_info.product_info.tickets_info.TicketDetailID': 0,
          'orders_info.category_info.product_info.tickets_info.tickets_detail_info._id': 0,
          'orders_info.category_info.product_info.tickets_info.tickets_detail_info.comment_info._id': 0,
          'orders_info.category_info.product_info.tickets_info.tickets_detail_info.comments': 0,
        },
      },
    ],
    (err, docs) => {
      console.log(docs);
      res.status(200).json({
        success: true,
        message: 'ok con dê',
        data: docs,
      });
    });
  } catch (err) {
    debug(chalk.redBright('error'));
    handle.responseError(res, error[0].status, error[0].message, err);
  }
};
