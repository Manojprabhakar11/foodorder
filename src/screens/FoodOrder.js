import React, { memo, useCallback, useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Foodorder.css"
import ItemModal from "./ItemModal"
import ShowCartModal from "./ShowCartModal"
import OrderModal from "./OrderModal"
const items=[{
    id:1,
    item:"Briyani",
    origin:"South Indian",
    price:150,
    des:"biryani is a spiced mix of meat and rice, traditionally cooked over an open fire in a leather pot.",
    src:"https://thumbs.dreamstime.com/b/hyderabadi-chicken-biryani-38473399.jpg"
},
{
    id:2,
    item:"Parotta",
    origin:"North Indian",
    price:15,
    des:"Parotta or Porotta is a layered Indian and Sri Lankan flatbread made from Maida or Atta, alternatively known as flaky ribbon pancake",
    src:"https://media.istockphoto.com/id/1205482203/photo/kerala-parotta-popularly-known-as-paratha-or-porotta-is-a-delicacy-from-the-state-of-kerala.jpg?s=612x612&w=0&k=20&c=Yv6GQkzNErLM7NUA4q6S27FnFMT7yuC6RSCij5e2m0Y="  
},
{
    id:3,
    item:"Chappathi",
    origin:"North Indian",
    price:10,
    des:"a round flat unleavened bread of India that is usually made of whole wheat flour and cooked on a griddle",
    src:"https://upload.wikimedia.org/wikipedia/commons/f/fe/2_Chapati_warm_and_ready_to_be_eaten.jpg"
},
{
    id:4,
    item:"Meals",
    origin:"South Indian",
    price:80,
    des:"Delicious meals are tasty, appetizing, scrumptious, yummy, luscious, delectable, mouth-watering, fit for a king, delightful, lovely, wonderful, pleasant, enjoyable, appealing, enchanting, charming",
    src:"https://c8.alamy.com/comp/2BMT9DP/kerala-style-fish-curry-meals-on-banana-leaf-2BMT9DP.jpg"
},
{
    id:5,
    item:"Dosa",
    origin:"South Indian",
    price:15,
    des:"thin pancake in South Indian cuisine made from a fermented batter of ground black lentils and rice.",
    src:"https://images.news18.com/ibnkhabar/uploads/2021/08/masala-dosa-recipe.jpg?im=FitAndFill,width=1200,height=675"
},
{
    id:6,
    item:"Cutlet",
    origin:"Snacks",
    price:10,
    des:"have criify and delicious mouth watering cutlet",
    src:"https://st2.depositphotos.com/1010148/7363/i/600/depositphotos_73634723-stock-photo-chicken-cutlets-in-breadcrumbs.jpg"
}];
 function FoodOrder() {
    const [ordersuccessModal,setOrderSuccessModal]=useState(false);
    const [addInCart,setAddInCart]=useState(0);
    const [currentModal,setCurrentModal]=useState(false);
    const [filteredData,setFilteredData]=useState("");
    const [addeddata,setAddedData]=useState([]);
    const [order,setOrder]=useState([]);
    const [onCartModal,setCartModal]=useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        if(!window.localStorage.getItem("hi")){
            navigate("/");
        }
    }, [])
    const itemModal=useCallback((dataId)=>{
       const cartModal= items.filter(data=>{
            return data.id===dataId;
        });
        setCurrentModal(true);
        setFilteredData(cartModal);
    },[items]);
    const noOfItemHandler=useCallback((noOfItem,cartData)=>{
        setAddedData(prevData=>{
            const existingData=prevData.filter(data=>{
                return cartData.id===data.id;
            });
            console.log(existingData,"alreadythere");
            if(existingData.length!==0){
                return prevData.map(data=>{
                    if(data.id===cartData.id){
                        return {...data,noOfItem:data.noOfItem+noOfItem,amount:data.amount+noOfItem*cartData.price}
                    }
                    else{
                        return data;
                    }
                })
            }
            else{
                return [...prevData,{...cartData,noOfItem:noOfItem,amount:noOfItem*cartData.price}];
            }
        });
        // console.log(addeddata,"incart")
       const filteredData=  addeddata.filter(data=>{
            return data.id===cartData.id;
        });
        if(filteredData.length===0){
            setAddInCart(prevCount=>
                {
                    return prevCount+1;
                });
        }
        console.log(addeddata,"incart")
        setCurrentModal(false);
    },[addInCart]);
    console.log(addeddata,"incart2")
    const cartDetail=useCallback(()=>{
        console.log(addeddata)
        setCartModal(true);
        setOrderSuccessModal(false);
        setCurrentModal(false);
    },[filteredData]);
    const removeAddInCart=()=>{
        setAddInCart(prevCount=>{
            return prevCount-1;
        });
    }
    const cancelCartModal=(data)=>{
        setCartModal(false);
        setAddedData(data);
        
        setOrderSuccessModal(false);
    }
    const orderSuccess=(data)=>{
        setCartModal(false);
        setOrderSuccessModal(true);
        setOrder(data);
        setAddedData([]);
        setAddInCart(0);
    }
    const showOrderModal=()=>{
        setOrderSuccessModal(true);
        setCurrentModal(false);
    }
    const closeOrderModal=()=>{
        setOrderSuccessModal(false);   
    }
    const closeItemModal=()=>{
        setCurrentModal(false);
    }
    return (
        <div>
            <div className="BtnContainer">
            {currentModal&&<ItemModal noOfItemHandler={(noOfItem,cartData)=>{noOfItemHandler(noOfItem,cartData)}} closeItemModal={closeItemModal} cartData={filteredData} />}
            {onCartModal&&<ShowCartModal addedData={addeddata} orderplaced={(data)=>orderSuccess(data)} addInCart={removeAddInCart} cancelModal={(data)=>cancelCartModal(data)}></ShowCartModal>}
            {ordersuccessModal&&<OrderModal orderData={order} closeOrderModal={closeOrderModal}/>}
            <button className="orderedBtn" onClick={showOrderModal}><i className="fas fa-bullhorn"></i> YOUR ORDER</button>
            <button className="cartBtn" onClick={cartDetail}><i className="fa fa-shopping-cart"></i> YOUR CART {addInCart}</button>
            </div>
            <div className="cartContainer" >
            {items.map(data=>{
                return <div className="cartList" key={data.id} onClick={()=>itemModal(data.id)}>
                    <div className="origin">{data.origin}:</div>
                    <div >
                    <img className="itemProfile" src={data.src}></img>
                    </div>
                    <div className="itemData">
                        <div className="item">{data.item}</div>
                        <div className="itemPrice">{`Rs.${data.price}`}</div>
                    </div>
                </div>
            })}
            </div>
        </div>
    )
}
export default memo(FoodOrder);
