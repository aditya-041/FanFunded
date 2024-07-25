// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/app/models/Payment";
// import Razorpay from "razorpay";
// import connectDB from "@/app/db/connectDb";

// export const POST = async (req) =>{
//     await connectDB()
//     let body = await req.formData()
//     body = Object.fromEntries(body)

//     //check if razorpay order id is present on the server
//     let p = await Payment.findOne({o_id: body.razorpay_order_id})

//     if(!p){
//         return NextResponse.json({success: false, message:"Order Id Not Found"})
//     }

//     //verify the payment
//     let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "razorpay_payment_id": body.razorpay_payment_id},
//         body.razorpay_signature, process.env.KEY_SECRET)

//     if(xx){
//         //update the payment status
//         const updatePayment = await Payment.findOneAndUpdate({o_id: body.razorpay_order_id}, {done: "true"}, {new: true})
//         return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}?paymentdone = true`)
//     }
//     else{
//         return NextResponse.json({success: false, message: "Payment Verification Failed"})
//     }
// }


// // import { NextResponse } from "next/server";
// // import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// // import Payment from "@/app/models/Payment";
// // import Razorpay from "razorpay";
// // import connectDB from "@/app/db/connectDb";

// // export const POST = async (req) => {
// //     try {
// //         await connectDB();

// //         let body = await req.formData();
// //         body = Object.fromEntries(body);

// //         // Check if razorpay order id is present on the server
// //         let payment = await Payment.findOne({ oid: body.razorpay_order_id });

// //         if (!payment) {
// //             return NextResponse.json({ success: false, message: "Order ID Not Found" });
// //         }

// //         // Verify the payment
// //         let isValid = validatePaymentVerification(
// //             { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
// //             body.razorpay_signature,
// //             process.env.KEY_SECRET
// //         );

// //         if (isValid) {
// //             // Update the payment status
// //             const updatedPayment = await Payment.findOneAndUpdate(
// //                 { oid: body.razorpay_order_id },
// //                 { done: true },
// //                 { new: true }
// //             );

// //             return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
// //         } else {
// //             return NextResponse.json({ success: false, message: "Payment Verification Failed" });
// //         }
// //     } catch (error) {
// //         console.error("Error in payment verification:", error.message, error.stack);
// //         return NextResponse.json({ success: false, message: "Internal Server Error" });
// //     }
// // };


import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User";

export const POST = async (req) => {
    try {
        await connectDB();
        
        const formData = await req.formData();
        const body = Object.fromEntries(formData.entries());

        console.log("Received form data:", body);

        // Check if Razorpay order ID (`o_id`) is present on the server
        let payment = await Payment.findOne({ o_id: body.razorpay_order_id });

        if (!payment) {
            return NextResponse.json({ success: false, message: "Order ID Not Found" });
        }

        //fetch the secret of the user who is getting the payment
        let user = await User.findOne({username: payment.to_user})
        const secret = user.razorpaysecret


        // Verify the payment
        const isValid = validatePaymentVerification(
            { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
            body.razorpay_signature,
            secret
        );

        console.log("Verification result:", isValid);

        if (isValid) {
            // Update the payment status
            const updatedPayment = await Payment.findOneAndUpdate(
                { o_id: body.razorpay_order_id }, // Changed from `oid` to `o_id`
                { done: true },
                { new: true }
            );

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
        } else {
            return NextResponse.json({ success: false, message: "Payment Verification Failed" });
        }
    } catch (error) {
        console.error("Error processing payment verification:", error.message, error.stack);
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
};
