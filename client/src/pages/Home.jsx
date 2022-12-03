import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import React,{useEffect,useState} from 'react'
const Home = () => {
const [itemCount,setItemCount]=useState(0)
const [cart,setCart]=useState([])
const [products,setProducts]=useState([])
const navigate=useNavigate()
useEffect(()=>{

  axios.get('http://localhost:1000/api/admin')
  .then(res=>setProducts(res.data.products))
  .catch(err=>console.log(err))
  setItemCount(0)
},[])
useEffect(()=>{
  localStorage.setItem('cart',JSON.stringify(cart))

},[cart])
return (
    <div className="container">
      <button className="btn admin " onClick={e=>{
        if(!Cookies.get('token'))
        navigate('/admin/login')
        if(Cookies.get('token'))
        navigate('/admin')
        }} >admin</button>
      <div onClick={(e)=>navigate('/form')} className="cart-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
</svg>
<h4 >

  {
    itemCount
  }
 
</h4>
      </div>
      <div className={`products-container admin-page `}>
      {products.map((product,i)=>
      <div className='shadow-1 product-container' >
        <h1>{`name: ${product.name}`}</h1>
        <h2>{`price: ${product.price}`}</h2>
        <h2>{`quantity: ${product.quantity}`}</h2>
        <img src={`http://localhost:1000/${product.name}.jpg`} alt="" />
         <div className="actions-container">
          <button type='button' onClick={(e)=>{
            e.preventDefault()
            if(product.quantity===0)
            return null
            let itmesNames=cart.map(item=>item.name)
            if(itmesNames.includes(product.name))
            cart.forEach((item,i)=>{
              if(item.name===product.name)
              {let num=item.count+1
              setCart(pre=>{
                pre[i].count=num
                return [...pre]
              })}
            })
            if(!itmesNames.includes(product.name))
            setCart(pre=>[...pre,{_id:product._id,name:product.name,price:product.price,count:1}])
            axios.patch('http://localhost:1000/api',product)
            .then(res=>{
              if(res.data.success){
                setItemCount(pre=>pre+1)
                setProducts(res.data.products)
              }  })
            .catch(err=>console.log(err))

          }} className="btn">buy</button>
         </div>
         </div>
      )}
      </div>
    </div>
    )
}

export default Home