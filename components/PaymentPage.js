// "use client"
// import React, { useEffect, useState } from 'react'
// import Script from 'next/script'
// import { useSession } from 'next-auth/react'
// import { fetchuser, fetchpayments, initiate } from '@/app/actions/useractions'
// // import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
// import { useSearchParams } from 'next/navigation'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Bounce } from 'react-toastify'
// import { useRouter } from 'next/navigation'

// const PaymentPage = ({ username }) => {
//     const { data: session } = useSession()

//     const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
//     const [currentUser, setcurrentUser] = useState({})
//     const [payments, setPayments] = useState([])
//     const searchParams = useSearchParams()
//     const router = useRouter()

//     useEffect(() => {
//         getData()
//     }, [getData])

//     useEffect(() => {
//         if (searchParams.get("paymentdone") == "true") {
//             toast('Thanks for your donation :)', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//                 transition: Bounce,
//             });
//         }
//         router.push(`/${username}`)
//     }, [router, searchParams, username])


//     const handleChange = (e) => {
//         setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
//     }

//     const getData = async () => {
//         let u = await fetchuser(username)
//         setcurrentUser(u)
//         let dbpayments = await fetchpayments(username)
//         setPayments(dbpayments)
//         console.log(u, dbpayments)
//     }

//     const pay = async (amount) => {
//         //get the order id
//         let a = await initiate(amount, username, paymentform)
//         let orderid = a.id
//         var options = {
//             "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
//             "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//             "currency": "INR",
//             "name": "Hey fan, fund me :)", //your business name
//             "description": "Test Transaction",
//             "image": "https://example.com/your_logo",
//             "order_id": orderid, //This is a sample Order ID. Pass the id obtained in the response of Step 1
//             "callback_url": "http://localhost:3000/api/razorpay",
//             "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//                 "name": "Gaurav Kumar", //your customer's name
//                 "email": "gaurav.kumar@example.com",
//                 "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
//             },
//             "notes": {
//                 "address": "Razorpay Corporate Office"
//             },
//             "theme": {
//                 "color": "#3399cc"
//             }
//         }
//         var rzp1 = new Razorpay(options);
//         rzp1.open();
//     }
//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light" />
//             {/* Same as */}
//             <ToastContainer />
//             <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
//             <div className='cover w-full relative'>
//                 <img className='object-cover w-full h-48 md:h-[350px]' src={currentUser.coverpic} alt="" srcSet="" />

//                 <div className='absolute -bottom-14 left-1/2 transform -translate-x-1/2 size-32 overflow-hidden'>
//                     <img className='rounded-full border-2 border-white size-32' width={128} height={128} src={currentUser.profilepic} alt="" srcSet="" />
//                 </div>
//             </div>

//             <div className="info flex justify-center items-center mt-16 flex-col gap-2 mb-32">
//                 <div className='font-bold text-lg'>
//                     @{username}
//                 </div>
//                 <div className='text-slate-400'>
//                     Lets help {username} to create amazing content!
//                 </div>
//                 <div className='text-slate-400'>
//                     {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
//                 </div>

//                 <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
//                     <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
//                         <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
//                         <ul className='mx-5'>
//                             {payments.length == 0 && <li>No Payments Yet</li>}
//                             {payments.map((p, i) => {
//                                 return <li key={i} className='my-4 flex gap-2 items-center'>
//                                     <img className='rounded-lg' width={45} src="/avatar.gif" alt="user avatar" />
//                                     <span>
//                                         {p.name} donated <span className='font-bold'>₹{p.amount}</span> with message &quot;{p.message}&quot;
//                                     </span>
//                                 </li>
//                             })}
//                         </ul>
//                     </div>

//                     <div className="makePayments w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
//                         <h2 className='text-2xl font-bold my-5'>Make a payment</h2>
//                         <div className="flex gap-2 flex-col">
//                             {/* input for name and message */}
//                             <div>
//                                 <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800 m-2' placeholder='Enter Name' />
//                             </div>
//                             <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800 m-2' placeholder='Enter Message' />

//                             <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800 m-2' placeholder='Enter Amount' />
//                             <div className='text-center items-center'>
//                                 <button onClick={() => pay(Number.parseInt((paymentform.amount * 100)))} type="button" class="w-fit text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-slate-900" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay Now!</button>
//                             </div>
//                         </div>

//                         {/* {or choose from these amounts} */}
//                         <div className='flex flex-col md:flex-row gap-2 mt-5 text-lg'>
//                             <button className='bg-slate-800 p-3 rounded lg' onClick={() => pay(1000)}>Pay ₹10</button>
//                             <button className='bg-slate-800 p-3 rounded lg' onClick={() => pay(2000)}>Pay ₹20</button>
//                             <button className='bg-slate-800 p-3 rounded lg' onClick={() => pay(3000)}>Pay ₹30</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PaymentPage

"use client";
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments, initiate } from '@/app/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component

const PaymentPage = ({ username }) => {
    const { data: session } = useSession();
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Define getData before using it
    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
        console.log(u, dbpayments);
    };

    useEffect(() => {
        getData();
    }, [username]); // Include username as a dependency

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation :)', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`);
    }, [searchParams, router, username]); // Include searchParams, router, and username as dependencies

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform);
        let orderid = a.id;
        var options = {
            key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Hey fan, fund me :)",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderid,
            callback_url: "http://localhost:3000/api/razorpay",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='cover w-full relative'>
                <Image
                    className='object-cover w-full h-48 md:h-[350px]'
                    src={currentUser.coverpic}
                    alt="Cover Picture"
                    width={1200} // Adjust as needed
                    height={400} // Adjust as needed
                />
                <div className='absolute -bottom-14 left-1/2 transform -translate-x-1/2 size-32 overflow-hidden'>
                    <Image
                        className='rounded-full border-2 border-white size-32'
                        src={currentUser.profilepic}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                    />
                </div>
            </div>

            <div className="info flex justify-center items-center mt-16 flex-col gap-2 mb-32">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} to create amazing content!
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
                        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                        <ul className='mx-5'>
                            {payments.length === 0 && <li>No Payments Yet</li>}
                            {payments.map((p, i) => {
                                return (
                                    <li key={i} className='my-4 flex gap-2 items-center'>
                                        <Image
                                            className='rounded-lg'
                                            src="/avatar.gif"
                                            alt="user avatar"
                                            width={45}
                                            height={45}
                                        />
                                        <span>
                                            {p.name} donated <span className='font-bold'>₹{p.amount}</span> with message &quot;{p.message}&quot;
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="makePayments w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a payment</h2>
                        <div className="flex gap-2 flex-col">
                            <div>
                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800 m-2' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800 m-2' placeholder='Enter Message' />

                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800 m-2' placeholder='Enter Amount' />
                            <div className='text-center items-center'>
                                <button onClick={() => pay(Number.parseInt(paymentform.amount * 100))} type="button" className="w-fit text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-slate-900" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay Now!</button>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-2 mt-5 text-lg'>
                            <button className='bg-slate-800 p-3 rounded lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
