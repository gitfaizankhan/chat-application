const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dbConnect = require('./utils/connection');
const userRoute = require('./routes/users');
const groupRoute = require('./routes/groups');
const User = require('./models/users');
const Chats = require('./models/userChat');
const Groups = require('./models/groups');
require('dotenv').config();



// Server handle
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
const io = socketIo(server);


// Cross Origin & Body-Parse
app.use(cors());
app.use(bodyParser.json());



// routes
app.use('/user', userRoute);

const userChatRoute = require('./routes/userChat');
app.use('/userChat', userChatRoute(io));



app.use('/group', groupRoute);





// connection between tables
User.hasMany(Chats)
Chats.belongsTo(User)

Groups.Group.belongsToMany(User, { through: 'User_Group' })
User.belongsToMany(Groups.Group, { through: 'User_Group' })

Groups.Group.hasMany(Chats)
Chats.belongsTo(Groups.Group)



// Database synchronize
async function syncDB() {
    try {
        // dbConnect.sync({ force: true })
        await dbConnect.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
syncDB();

