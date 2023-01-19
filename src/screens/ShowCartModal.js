import React, { memo, useEffect, useState } from 'react'
import "./ShowCartModal.css"
function ShowCartModal(props) {
    const [totalAmount,setTotalAmount]=useState(30);
    const incomingData=props.addedData;
    const [data,setData]=useState(incomingData);
    useEffect(()=>{
        // setData(props.addedData);
        data.map(data=>{
            return setTotalAmount(prevamt=>{
                return prevamt+data.amount;
            });
        });
    },[props.addedData])
    const addtionOfItem=(dataId)=>{
       const updatedNoofItem= data.map(data=>{
            if(data.id===dataId){
                // console.log(data.amount,data.price)
                data.amount=data.amount+data.price;
                setTotalAmount(prevamt=>{
                    return prevamt+data.price;
                })
                return {...data,noOfItem:++data.noOfItem,amount:data.amount};
            }
            else{
                return data;
            }
        });
        setData(updatedNoofItem);
    }
    // console.log(data,"data")
    const removeItem=(dataId)=>{
        const updatedNoofItem= data.map((datas)=>{
            if(datas.id===dataId){
                // console.log(datas.amount,datas.price)
                if(datas.amount>0){
                    datas.amount=datas.amount-datas.price;
                }
                setTotalAmount(prevamt=>{
                    if(prevamt>1){
                        return prevamt-datas.price;
                    }
                });
                if(datas.noOfItem>1){
                    return {...datas,noOfItem:--datas.noOfItem,amount:datas.amount};
                }
                else{
                  const removeddata=  data.filter(item=>{
                      return datas.id!==item.id
                  });
                  console.log(removeddata,"re")
                  setData(removeddata);
                  props.addInCart();
                // data=removeddata;
                }
            }
            else{
                return datas;
            }
        });
        // setData(updatedNoofItem);
    }
    const cancelModalHandler=()=>{
        props.cancelModal(data);
    }
    const placeOrder=()=>{
        // console.log(data,"cancel")
        props.orderplaced(data);
    }
    // console.log(data,"data");
    return (
        <div className="cartModalParent">
        <div className="cartModal">
            {data.length!==0?data.map(data=>{
                return <div key={data.id}className="carts">
                    <div className="cartsDetail">
                    <img src={data.src}className="itemimg"></img>
                <div>{data.item}</div>
                </div>
                <div className="cartModifier">
                <div className="addToCartBtn1" onClick={()=>removeItem(data.id)}>-</div>
                <div>{data.noOfItem}</div>
                <div className="addToCartBtn1" onClick={()=>addtionOfItem(data.id)}>+</div>
                </div>
                </div>
            }):<div>no orders to show</div>
            }
            <div>
            {data.length!==0&&<div>
            <div>delivery charge:Rs.30</div>
            <div>{`Total Amount: Rs.${totalAmount}`}</div>
            </div>
            }
            </div>
            <div className="cartModalBtns">
            <button className="orderBtn" onClick={cancelModalHandler}>cancel</button>
                <button className="orderBtn" onClick={placeOrder}>order</button>
                </div>
           
        </div>
        </div>
    )
}

export default memo(ShowCartModal)
