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


    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, amount: 1})
    }

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id)
    }

    function showCheckout() {
        setShowCheckoutForm(true);
    }

    // function hideCheckout() {
    //     setShowCheckoutForm(false);
    // }
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

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!showCheckoutForm && modalActions}
            {showCheckoutForm && <Checkout onCancel={props.onHideCart}/>}
        </Modal>
    );
}

export default Cart;