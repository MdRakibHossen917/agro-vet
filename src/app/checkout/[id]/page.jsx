import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react'

export default async function page({params}) {
     const res = await fetch(
       `https://agro-vet.vercel.app/api/product/${params.id}`,
       {
         cache: "no-store",
       }
     );
  const data = await res.json();
  return (
    <div>

        <CheckoutForm data={data}/> 
    </div>
  )
}
