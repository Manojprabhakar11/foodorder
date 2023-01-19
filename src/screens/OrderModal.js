import React from 'react'
import "./OrderModal.css"
function OrderModal(props) {
    const closeModal=()=>{
        props.closeOrderModal();
    }
    return (
        <div className="ordercontainerParent" onClick={closeModal}>
        <div className="ordercontainer">
        {props.orderData.length!==0?<div>
            {props.orderData.map(data=>{
                return <div key={data.id} className="orderitems">
                    <img src={data.src}className="orderimg"></img>
                    <div className="orderItem">{data.item}*{data.noOfItem}</div>
                </div>
            })}
            <div className="successmsg"><i class="fa fa-check" style={{color:"green"}}></i> order Successful</div>
        </div>
        :<div className="noDetailsPop">no orders to show</div>}
        <button className="orderOkBtn">Ok</button>
        </div>
        </div>
    )
}

export default OrderModal
