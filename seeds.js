const mongoose = require('mongoose');
    Item = require('./model/itemall');
    Comment = require('./model/comment');
    User = require('./model/user');

const dataItem = [
        {   
            name: 'Blue Dog',
            image:'/picture/bluedog.png',
            desc:'dog face at the chest clothes make with cotton',
            price:'600',
            stock:'20',
            category:'clothe',
            sold:'31',
            author : {
                id : '627ca21ceba5b65d5dd41cd1',
                username : 'baby-shop.co'
            }
        },
        {   
            name: 'Pink Rabbit',
            image:'/picture/pink.png',
            desc:'hood have rabbit ear',
            price:'999',
            stock:'2',
            category:'clothe',
            sold:'98',
            author : {
                id : '627ca21ceba5b65d5dd41cd1',
                username : 'baby-shop.co'
            }
        },
        {   
            name: 'Pink Mickymouse',
            image:'/picture/pinkmicky.png',
            desc:'overalls micky mouse',
            price:'699',
            stock:'5',
            category:'clothe',
            sold:'12',
            author : {
                id : '627ca21ceba5b65d5dd41cd1',
                username : 'baby-shop.co'
            }
        },
        {   
            name: 'White-Black',
            image:'/picture/whiteback.png',
            desc:'big black bow',
            price:'200',
            stock:'5',
            category:'clothe',
            sold:'39',
            author : {
                id : '627ca21ceba5b65d5dd41cd1',
                username : 'baby-shop.co'
            }
        },
        {   
            name: 'Red Heart',
            image:'/picture/whiteheart.png',
            desc:'xxxxx',
            price:'1500',
            stock:'5',
            category:'clothe',
            sold:'20',
            author : {
                id : '627ca21ceba5b65d5dd41cd1',
                username : 'baby-shop.co'
            }
        }
];

function seedDB(){
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('Comment remove complete');
        }
    }),
    Cart.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('Cart remove complete');
        }
    }),
    Item.deleteMany({}, function(err){
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