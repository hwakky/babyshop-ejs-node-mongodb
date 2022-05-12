const mongoose = require('mongoose');
    Item = require('./model/itemall');
    Comment = require('./model/comment');
    User = require('./model/user');

const dataItem = [
        {   
            name: 'Blue Dog',
            image:'/picture/bluedog.png',
            desc:'xxxxx',
            price:'20000',
            stock:'5',
            category:'Smartphone',
            sold:'200',
            author : {
                id : '60a23cdd13fdc43689eb8ded',
                username : 'asd'
            }
        },
        {   
            name: 'Pink Rabbit',
            image:'/picture/pink.png',
            desc:'xxxxx',
            price:'15000',
            stock:'5',
            category:'Game',
            sold:'100',
            author : {
                id : '60a23cdd13fdc43689eb8ded',
                username : 'asd'
            }
        },
        {   
            name: 'Pink Mickymouse',
            image:'/picture/pinkmicky.png',
            desc:'xxxxx',
            price:'65000',
            stock:'5',
            category:'Computer',
            sold:'80',
            author : {
                id : '60a23cdd13fdc43689eb8ded',
                username : 'asd'
            }
        },
        {   
            name: 'White-Black',
            image:'/picture/whiteback.png',
            desc:'xxxxx',
            price:'5000',
            stock:'5',
            category:'Shoe',
            sold:'50',
            author : {
                id : '60a23cdd13fdc43689eb8ded',
                username : 'asd'
            }
        },
        {   
            name: 'Red Heart',
            image:'/picture/whiteheart.png',
            desc:'xxxxx',
            price:'1500',
            stock:'5',
            category:'Figure',
            sold:'20',
            author : {
                id : '60a23cdd13fdc43689eb8ded',
                username : 'asd'
            }
        }
];

function seedDB(){
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('Comment remove complete');
        }
    }),
    Cart.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('Cart remove complete');
        }
    }),
    Item.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('Item remove complete');
        Item.create(dataItem, (err,item) => {
            if(err){
                console.log(err);
            } else{
                console.log('Item Added')
            }
        });
    });
}

module.exports = seedDB;