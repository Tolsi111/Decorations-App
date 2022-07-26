import classes from './DecoItem.module.css'
import DecoItemForm from "./DecoItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

function DecoItem(props) {
    const price = `$${props.itemPrice.toFixed(2)}`;
    const cartCtx = useContext(CartContext);

    function addToCartHandler(amount) {
        cartCtx.addItem({
            id: props.itemId,
            name: props.itemName,
            amount: amount,
            price: props.itemPrice
        });
    }

    return (
        <li className={classes.deco}>
            <div>
                <h3>{props.itemName}</h3>
                <div className={classes.description}>{props.itemDescription}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <DecoItemForm id={props.itemId} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
}

export default DecoItem;