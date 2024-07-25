import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import React from 'react';
import connectDB from '../db/connectDb';
import User from '../models/User';

const Username = async ({params}) => {
  const checkUser = async()=>{

    connectDB()
    let u = await User.findOne({username: params.username})
    if(!u){
      return notFound()
    }
  }
  await checkUser()
  return (
    <>
      <PaymentPage username = {params.username}/>
    </>
  );
};

export default Username;

export async function generateMetadata({params}){
  return{
    title: ` Support ${params.username} - FanFunded`,
  }
}