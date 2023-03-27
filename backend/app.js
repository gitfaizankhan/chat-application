const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const dbConnect = require('./utils/connection');
const userRoute = require('./routes/users');
const userChatRoute = require('./routes/userChat');
const User = require('./models/users');
const Chats = require('./models/userChat')

require('dotenv').config();

const app = express();


app.use(cors({origin:'http://127.0.0.1:5500'}));
app.use(bodyParser.json());

// routes
app.use('/user', userRoute);
app.use('/userChat', userChatRoute);



// connection between tables
User.hasMany(Chats)
Chats.belongsTo(User)


// Database synchronize
async function syncDB(){
    try{
        // await dbConnect.sync({alter:true});
        // await dbConnect.sync({force:true});
        await dbConnect.sync();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}/`);
        });
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

syncDB();