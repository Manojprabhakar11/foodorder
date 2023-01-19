import React, { memo, useCallback, useState } from 'react'
import "./ItemModal.css"
function ItemModal(props) {
    // console.log(props);
    const [noOfItem,setNoOfItem]=useState(0);
    const [amount,setAmount]=useState(props.cartData[0].price)
    const addHandler=useCallback(()=>{
        setNoOfItem(prevValue=>{
            return prevValue+1;
        });
        if(noOfItem>0){
            setAmount(prevValue=>{
                return prevValue+props.cartData[0].price;
            });
        }
    },[noOfItem]);
    const removeHandler=useCallback(()=>{
        if(noOfItem>0){
            if(noOfItem>1){
                setAmount(prevValue=>{
                return prevValue-props.cartData[0].price;
            });
            }
            else{
                setAmount(props.cartData[0].price);
            }
            setNoOfItem(prevValue=>{
                return prevValue-1;
            })
        }
        else{
            setNoOfItem(0);
            setAmount(props.cartData[0].price);
        }
    },[noOfItem]);
    const AddToCart=useCallback(()=>{
        if(noOfItem>0){
            props.noOfItemHandler(noOfItem,props.cartData[0]);
        }
    },[noOfItem]);
    const cancelHandler=()=>{
        props.closeItemModal();
    }
    return (
        <div className="modalContainerParent">
        <div className="modalContainer">
            <div className="ModalItemProfile">
           <img style={{width:"100%"}} src={props.cartData[0].src}></img>
            </div>
            <div className="itemDescription">
                {props.cartData[0].des}
            </div>
            <div className="noOfItems">
                <div className="itemDetail">
               {`Rs.${amount}`}
                </div>
                <div className="itemAddTo">
                <button className="addToCartBtn" onClick={removeHandler}>-</button>
                <div>{noOfItem}</div>
                <button className="addToCartBtn" onClick={addHandler}>+</button>
                </div>
            </div>
            <div className="orderBtnParent">
                <button className="orderBtn" onClick={cancelHandler}>back to list</button>
                <button className="orderBtn" onClick={AddToCart}>AddToCart</button>
            </div>
        </div>
        </div>
    )
}
export default memo(ItemModal);