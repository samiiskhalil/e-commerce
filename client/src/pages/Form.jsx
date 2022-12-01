import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
const Form = () => {
    const [cart,setCart]=useState([])
    const [items,setItems]=useState([])
    const [productCount,setProductCount]=useState([])
useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart')))
},[])
useEffect(()=>{
    if(cart.length){
        console.log(cart)
    let tmp=cart
for(let i=0;i<cart.length;i++){
    for(let j=i;j<cart.length;j++){
        if(cart[i].name===tmp[j].name)
       { console.log('a')
       setCart(pre=>[...pre ,pre[i].count=pre[i].count+1])
        tmp[j]=''
                
    }
    }
}
}
},[])
console.log(cart)

return (
<div className="container">
<div className="invoice-container">
<div className="invoice-header">
<span>name</span>
<span>price</span>
<span>quantity</span>
</div>
{cart.map((product,i)=>
    <div key={i} className='invoise-row'>
        <span>{product.name}</span>
        <span>{product.price}</span>
        <span></span>
         </div>)}
</div>
<form className='logout admin-page'>
<input type="text" name='name' placeholder='name' />
<input type="text" name='email'placeholder='email' />
<input type="text" name='address'placeholder='address' />
<button type='button'  className='btn' onClick={(e)=>console.log('post')} >submit</button>
</form>
</div>
    )
}

export default Form