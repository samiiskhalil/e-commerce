import axios from "axios"
import Cookies from "js-cookie"
import {useEffect, useState} from "react"
import s from '../resources/sami.jpg'
const Admin = () => {
  const [image,setImage]=useState({})
    const [form,setForm]=useState({})    
  const [product,setProduct]=useState({})
  const [products,setProducts]=useState([{name:'asdasd',price:2},
  {name:'asdas',price:1},
  {name:'dklasdj',price:6}
  ])
  useEffect(()=>{
    axios.get('http://localhost:1000/api/admin',{
        headers:{
            'authorization':`BEARER ${Cookies.get('token')}`

        }
    })
    .then(res=>{
        console.log(res)
        axios.get('http://localhost:1000/api/admin/image',{
            headers:{
                'authorization':`BEARER ${Cookies.get('token')}`

            }
        })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>console.log(err))
    }).catch(err=>console.log(err))
  },[])
  function handleImgUpload(e){
    let img=new File([e.target.files[0]],form.name,{
        type:e.target.files[0].type,
        lastModified:e.target.files[0].lastModified
                             })
    setImage(img)
}
console.log(image)
  function handleChange(e){

    setForm(pre=>{
        return {
            ...pre ,[e.target.name]:e.target.value
        }
    })
  }
  async function handleSubmit(e){
    
    try{
        //submit data
    e.preventDefault()
        console.log(form)
            axios.post
    ('http://localhost:1000/api/admin',
    form,{
        headers:{
            'authorization':`BEARER ${Cookies.get('token')}`
        }
    })
.then(res=>{

    axios.post('http://localhost:1000/api/admin/image',{image:image},{
        headers:{
            'image-name': `${image.name}`,
            authorization:`BEARER ${Cookies.get('token')}`,
            'content-type':'multipart/form-data'
           , 'encypte':'multipart/form-data'
        }
    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
})}
    catch(err){
        console.log(err)
    }
    //submit image
}
console.log(image.name)
  return (
    <div className="container admin-page " >
        <form className="form" >
            <input onChange={handleChange} placeholder="name" type="text" name="name" id="name" />
            <input onChange={handleChange} placeholder="price" type="number" name="price" id="price" />
            <input onChange={handleChange} placeholder="quantity" type="number" name="quantity" id="quantity" />
            <label htmlFor="image">add image
            <input onInputCapture={handleImgUpload} placeholder="image" className="img-input"  type='file' name="image" id="image" />
            </label>
            <button type="button" onClick={handleSubmit}  className="btn">submit</button>
        </form>
        <div className="products-container admin-page ">
            {products.map((product,index)=> <div className="shadow-1 product-container" key={index} > 
                <h1> name : {product.name}</h1>
                
                <h2> price: {product.price}</h2>
                <h2>qunantity: 3</h2>
                <p>lorem*10</p>
                <img src={s} alt="img" />
                <div className="actions-box">
                    <button className="shadow-0 btn admin-btn" type="button">remove</button>
                </div>
            </div>)}
        </div>
    </div>

    )
}

export default Admin