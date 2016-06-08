var Sequelize = require('sequelize');
var random = require("random-js")();

var sequelize = new Sequelize('fake_data', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    omitNull: true,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var uniqueStatsPc = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: null,
        field: 'id'
    },
    groupid: {
        type: Sequelize.STRING(64),
        field: 'groupid'
    },
    date: {
        type: Sequelize.DATE,
        field: 'date'
    },
    date_range: {
        type: Sequelize.ENUM,
        values: ['day', 'week', 'month', 'hour'],
        field: 'date_range'
    },
    senders: {
        type: Sequelize.INTEGER,
        field: 'senders'
    },
    inviters: {
        type: Sequelize.INTEGER,
        field: 'inviters'
    },
    likers: {
        type: Sequelize.INTEGER,
        field: 'likers'
    },
    viewers: {
        type: Sequelize.INTEGER,
        field: 'viewers'
    },
    followers: {
        type: Sequelize.INTEGER,
        field: 'followers'
    },
    unfollowers: {
        type: Sequelize.INTEGER,
        field: 'unfollowers'
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true,
    tableName: 'unique_stats_pc'
});

var startDate = new Date();
var nowDate = new Date();
startDate.setFullYear(startDate.getFullYear()-1);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);


var data = [];
var i =0;
var z = 0;
//for (i = 0; i < 1000; i++) {
//    console.log(startDate);
while (new Date(startDate.getTime()) <= nowDate){
    data.push({
        groupid: 1,
        date: new Date(startDate.getTime()),
        date_range: 'hour',
        senders: random.integer(100, 10000),
        inviters: random.integer(100, 10000),
        likers: random.integer(100, 10000),
        viewers: random.integer(100, 10000),
        followers: random.integer(100, 10000),
        unfollowers: random.integer(100, 10000)
    });

    if (startDate.getHours() == 0){
        data.push({
            groupid: 1,
            date: new Date(startDate.getTime()),
            date_range: 'day',
            senders: random.integer(100, 10000),
            inviters: random.integer(100, 10000),
            likers: random.integer(100, 10000),
            viewers: random.integer(100, 10000),
            followers: random.integer(100, 10000),
            unfollowers: random.integer(100, 10000)
        });

        data.push({
            groupid: 1,
            date: new Date(startDate.getTime()),
            date_range: 'week',
            senders: random.integer(100, 10000),
            inviters: random.integer(100, 10000),
            likers: random.integer(100, 10000),
            viewers: random.integer(100, 10000),
            followers: random.integer(100, 10000),
            unfollowers: random.integer(100, 10000)
        });

        data.push({
            groupid: 1,
            date: new Date(startDate.getTime()),
            date_range: 'month',
            senders: random.integer(100, 10000),
            inviters: random.integer(100, 10000),
            likers: random.integer(100, 10000),
            viewers: random.integer(100, 10000),
            followers: random.integer(100, 10000),
            unfollowers: random.integer(100, 10000)
        });

    }
    console.log(i);
    if((i+1) % 10 == 0){
        //console.log(data);
        //uniqueStatsPc.bulkCreate(data, { validate: true }).catch(function(errors) {console.log(errors)});
        bulkInsert(data);
        data = [];
        i=0;
        z++;
      //  if(z>100){return}
    }


    startDate.setHours(startDate.getHours()+1);
    i++;
}

function bulkInsert(data) {
    console.log('start');
    uniqueStatsPc.bulkCreate(data,{raw: true}).catch(function(errors) {console.log(errors)});
    console.log('end');
}

// uniqueStatsPc.sync({force: true}).then(function () {
//     // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// });