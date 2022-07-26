import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
    const [btnHighlight,setBtnHighlight] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const totalItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0)

    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length ===0) {
            return;
        }

        setBtnHighlight(true);
        const timer = setTimeout(() => {
            setBtnHighlight(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    );
};

export default HeaderCartButton;