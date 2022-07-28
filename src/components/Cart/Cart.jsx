import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);


    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, amount: 1})
    }

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id)
    }

    function showCheckout() {
        setShowCheckoutForm(true);
    }

    async function submitOrderHandler(userData) {
        setIsSubmitting(true);
        const response = await fetch('https://home-deco-app-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.resetCart();
    }

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={showCheckout}>Order</button>}
    </div>

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item =>
            <CartItem key={item.id}
                      name={item.name}
                      amount={item.amount}
                      price={item.price}
                      onRemove={cartItemRemoveHandler.bind(null, item.id)}
                      onAdd={cartItemAddHandler.bind(null, item)}
            >{item.name}
            </CartItem>)}
    </ul>;

    const cartContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {!showCheckoutForm && modalActions}
        {showCheckoutForm && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler}/>}
    </>

    const isSubmittingCartContent = <p>Processing order...</p>

    const didSubmitCartContent = <p>Order received!</p>

    return (
        <Modal onClick={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartContent}
            {isSubmitting && isSubmittingCartContent}
            {didSubmit && !isSubmitting && didSubmitCartContent}
        </Modal>
    );
}

export default Cart;