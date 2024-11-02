import mongoose from 'mongoose';

const connect = async (dbName) => {
    try {
        let connectString = process.env.MONGO_URI || '';
        if (connectString === '') {
            throw new error('no connection string found');
        }
        connectString = connectString.replace('{1}', dbName);
        await mongoose.connect(connectString);
        console.log('successfully connected to the DB');
    } catch (error) {
        console.log('Could not connect to the DB', error?.message);
        process.exit();
    }
};

export default connect;