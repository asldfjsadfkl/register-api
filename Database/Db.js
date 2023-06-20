import mongoose from 'mongoose';

export const conn = () => {

    try {
        const DB = 'mongodb+srv://root:root@cluster0.xl4g213.mongodb.net/user?retryWrites=true&w=majority';
        const connection = mongoose.connect(DB);
        console.log('database connented');
    } catch (error) {
        console.log(`database connection have error that is ${error}`);
    }

}