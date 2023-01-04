import express from 'express';
import { userModel, myProductModel } from '../routes/dbmodels.mjs'
import mongoose from 'mongoose';

const router = express.Router()

router.post('/product', (req, res) => {
    const body = req.body;
  if ( // validation
      !body.name
      || !body.price
      || !body.description
  ) {
      res.status(400).send({
          message: "required parameters missing",
      });
      return;
  }

  console.log(body)
  console.log(body.name)
  console.log(body.price)
  console.log(body.description)
 
    // products.push({
    //     id: new Date().getTime(),
    //     names: req.body.names,
    //     price: req.body.price,
    //     description: req.body.description

    // });

    myProductModel.create({
        name:body.name,
        price:body.price,
        description:body.description,
        owner: new mongoose.Types.ObjectId(body.token._id)
    },
        (err, saved) => {
            if (!err) {
                console.log(saved);
                res.send({
                    message: "product added successfully"
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })

})


router.get('/products', (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.body.token._id);

    myProductModel.find(
        { owner: userId },
        {},
        {
            sort: { "_id": -1 },
            limit: 50,
            skip: 0
        }
        , (err, data) => {
            if (!err) {
                res.send({
                    message: "got all products successfully",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
 
})
router.get('/product/:id', (req, res) => {

    const id = req.params.id;

    myProductModel.findOne({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
                res.send({
                    message: `get product by id: ${data._id} success`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: "product not found",
                })
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.delete('/product/:ids', (req, res) => {
    const id =req.params.ids;
    myProductModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been deleted successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No Product found with this id: " + id,
                });
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });


    
})

router.put('/product/:editId', async (req, res) => {

    const body = req.body;
    const id = req.params.editId;

    if ( // validation
        !body.name
        && !body.price
        && !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing"
        });
        return;
    }

    try {
        let data = await myProductModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
                description: body.description
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})

export default router