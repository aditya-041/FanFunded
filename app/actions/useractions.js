// "use server"

// import Razorpay from "razorpay"
// import Payment from "../models/Payment"
// import connectDB from "../db/connectDb"
// import User from "../models/User"

// export const initiate = async(amount, to_username, paymentform) => {
//     await connectDB()
//     var instance = new Razorpay({key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET})
//     instance.orders.create({
//         amount: 50000,
//         currency: "INR",
//         receipt: "receipt#1",
//         notes:{
//             key1: "value3",
//             key2: "value2"
//         }
//     })

//     let options = {
//         amount: Number.parseInt(amount),
//         currency: "INR",
//     }

//     let x = instance.orders.create(options)

//     //create a payment object which shows a pending payment in the database
//     await Payment.create({oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message})
//     return x
// }


// "use server"

// import Razorpay from "razorpay"
// import Payment from "../models/Payment"
// import connectDB from "../db/connectDb"
// import User from "../models/User"
// connectDB()

// export const initiate = async (amount, to_username, paymentform) => {
//     try {
//         await connectDB();

//         const instance = new Razorpay({
//             key_id: process.env.NEXT_PUBLIC_KEY_ID,
//             key_secret: process.env.KEY_SECRET
//         });

//         const order = await instance.orders.create({
//             amount: Number.parseInt(amount),
//             currency: "INR",
//             receipt: "receipt#1",
//             notes: {
//                 key1: "value3",
//                 key2: "value2"
//             }
//         });

//         console.log("Razorpay order created:", order);

//         // Create a payment object which shows a pending payment in the database
//         const payment = await Payment.create({
//             oid: order.id,
//             amount: amount,
//             to_user: to_username,
//             name: paymentform.name,
//             message: paymentform.message
//         });

//         console.log("Payment created in database:", payment);

//         return order;
//     } catch (error) {
//         console.error("Error initiating payment:", error);
//         throw new Error("Payment initiation failed");
//     }
// };


"use server"
import Razorpay from "razorpay";
import Payment from "../models/Payment";
import connectDB from "../db/connectDb";
import User from "../models/User";

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB();

        //fetch the secret of the user who is getting the payment
        let user = await User.findOne({username: to_username})
        const secret = user.razorpaysecret

        const instance = new Razorpay({
            key_id: user.razorpayid,
            key_secret: secret
        });

        const order = await instance.orders.create({
            amount: Number.parseInt(amount),
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                key1: "value3",
                key2: "value2"
            }
        });

        console.log("Razorpay order created:", order);

        // Create a payment object which shows a pending payment in the database
        const payment = await Payment.create({
            o_id: order.id,
            amount: amount/100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message
        });

        console.log("Payment created in database:", payment);

        return order;
    } catch (error) {
        console.error("Error initiating payment:", error.message, error.stack);
        throw new Error("Payment initiation failed");
    }
};

export const fetchuser = async(username) =>{
    await connectDB()
    let u = await User.findOne({username: username})
    let user = u.toObject({flattenObjectIds: true})
    return user
}

export const fetchpayments = async(username) =>{
    await connectDB()

    let p = await Payment.find({to_user: username, done:true}).sort({amount: -1}).limit(10).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDB();

    // Assuming 'data' is already an object
    let nData = data;

    if (oldusername !== nData.username) {
        let u = await User.findOne({ username: nData.username });
        if (u) {
            return { error: "username already exists" };
        }
    }

    await User.updateOne({ email: nData.email }, nData);
    return { success: true };
};