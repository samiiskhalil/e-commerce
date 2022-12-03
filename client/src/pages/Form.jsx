import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Navigate } from 'react-router'
const Form = () => {
    const [totalprice,setTotalPrice]=useState(0)
    const [totalQuantity,setTotalquantity]=useState(0)
    const [cart,setCart]=useState([])
    const [form,setForm]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart')))
},[])
useEffect(()=>{
    let sum=0
for (let i = 0; i < cart.length; i++) {
    sum=sum+cart[i].count*cart[i].price
}
let aQ=0
for(let j=0;j<cart.length;j++){
    aQ=aQ+cart[j].count
}
setTotalquantity(aQ)
setTotalPrice(sum)
},[cart])
function handleClick(e){
    const sentCart=cart.map(item=>{
        return {productId:item._id,count:item.count}
    })
    console.log(sentCart)
 axios.post('http://localhost:1000/api',{form,sentCart})
 .then(res=>navigate('/'))
 .catch(err=>console.log(err))
}
function handleChange(e){
setForm(pre=>{
   return { ...pre,[e.target.name]:e.target.value}})
}
return (
<div className="container">
<div className="invoice-container">
<div className="invoice-header">
<span>name</span>
<span>price</span>
<span>quantity</span>
</div>
{cart.map((product,i)=>
    <div key={i} className='invoice-row'>
        <span>{product.name}</span>
        <span>{product.price}</span>
        <span>{product.count}</span>
         </div>)}
         <div className="invoice-footer">
           <span>
            your invoice
           </span>
            <span>
                {totalprice}
            </span>
            <span>
{totalQuantity}
            </span>
         </div>
</div>
<form className='logout admin-page'>
<input onChange={handleChange} type="text" name='name' placeholder='name' />
<input onChange={handleChange} type="text" name='email'placeholder='email' />
<input onChange={handleChange} type="text" name='address'placeholder='address' />
<button onClick={handleClick} type='button'  className='btn'  >submit</button>
</form>
</div>
    )
}

export default Form