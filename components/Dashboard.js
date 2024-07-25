// "use client"
// import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { fetchuser, updateProfile } from '@/app/actions/useractions';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Bounce } from 'react-toastify'

// const Dashboard = () => {
//     const { data: session, status, update } = useSession();
//     const router = useRouter();
//     const [form, setForm] = useState({});

//     useEffect(() => {
//         if (status === 'loading') return; // Wait for session to be loaded
//         if (!session) {
//             router.push('/login');
//         } else {
//             getData();
//         }
//     }, [router, session, status, getData]);

//     const getData = async () => {
//         if (session && session.user) {
//             let u = await fetchuser(session.user.name);
//             setForm(u);
//         }
//     };

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         update();
//         let a = await updateProfile(form, session.user.name);
//         toast('Profile Updated!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//         });
//     };

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
//                 theme="light"
//             />
//             {/* Same as */}
//             <ToastContainer />
//             <form className='max-w-2xl mx-auto px-6' onSubmit={handleSubmit}>
//                 <div className="dashboard">
//                     <h1 className='text-center font-bold text-2xl px-2 mx-5 py-3'>Welcome To Your Dashboard</h1>
//                     {/* Input for Name */}
//                     <div className="my-2">
//                         <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                         <input value={form.name || ""} onChange={handleChange} type="text" name="name" id="name" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Input for Email */}
//                     <div className="my-2">
//                         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                         <input value={form.email || ""} onChange={handleChange} type="text" name="email" id="email" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Input for Username */}
//                     <div className="my-2">
//                         <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
//                         <input value={form.username || ""} onChange={handleChange} type="text" name="username" id="username" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Input for Profile Picture */}
//                     <div className="my-2">
//                         <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
//                         <input value={form.profilepic || ""} onChange={handleChange} type="text" name="profilepic" id="profilepic" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Input for Cover Picture */}
//                     <div className="my-2">
//                         <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
//                         <input value={form.coverpic || ""} onChange={handleChange} type="text" name="coverpic" id="coverpic" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Input for Razorpay ID */}
//                     <div className="my-2">
//                         <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
//                         <input value={form.razorpayid || ""} onChange={handleChange} type="text" name="razorpayid" id="razorpayid" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Input for Razorpay Secret */}
//                     <div className="my-2">
//                         <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
//                         <input value={form.razorpaysecret || ""} onChange={handleChange} type="text" name="razorpaysecret" id="razorpaysecret" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border:blue-500' />
//                     </div>

//                     {/* Save Button */}
//                     <div className="my-2">
//                         <button type="submit" className='block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm'>Save</button>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default Dashboard;


"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchuser, updateProfile } from '@/app/actions/useractions';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});

    // Define getData with useCallback to avoid unnecessary re-renders
    const getData = useCallback(async () => {
        if (session && session.user) {
            try {
                let u = await fetchuser(session.user.name);
                setForm(u);
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to fetch user data');
            }
        }
    }, [session]);

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to be loaded
        if (!session) {
            router.push('/login');
        } else {
            getData();
        }
    }, [router, session, status, getData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(form, session.user.name);
            toast('Profile Updated!', {
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
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
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
                theme="light"
            />
            <form className='max-w-2xl mx-auto px-6' onSubmit={handleSubmit}>
                <div className="dashboard">
                    <h1 className='text-center font-bold text-2xl px-2 mx-5 py-3'>Welcome To Your Dashboard</h1>
                    
                    {/* Input for Name */}
                    <div className="my-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name || ""} onChange={handleChange} type="text" name="name" id="name" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Input for Email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email || ""} onChange={handleChange} type="text" name="email" id="email" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Input for Username */}
                    <div className="my-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username || ""} onChange={handleChange} type="text" name="username" id="username" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Input for Profile Picture */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input value={form.profilepic || ""} onChange={handleChange} type="text" name="profilepic" id="profilepic" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Input for Cover Picture */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input value={form.coverpic || ""} onChange={handleChange} type="text" name="coverpic" id="coverpic" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Input for Razorpay ID */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
                        <input value={form.razorpayid || ""} onChange={handleChange} type="text" name="razorpayid" id="razorpayid" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Input for Razorpay Secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input value={form.razorpaysecret || ""} onChange={handleChange} type="text" name="razorpaysecret" id="razorpaysecret" className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    {/* Save Button */}
                    <div className="my-2">
                        <button type="submit" className='block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm'>Save</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Dashboard;
