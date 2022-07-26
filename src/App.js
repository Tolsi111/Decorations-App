import Header from "./components/Layout/Header";
import Decorations from "./components/Decorations/Decorations";
import Cart from "./components/Cart/Cart";
import {useState} from "react";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown,setCartIsShown] = useState(false);

    function showCart() {
        setCartIsShown(true);
    }

    function hideCart() {
        setCartIsShown(false);
    }

    return (
        <CartProvider>
            {cartIsShown && <Cart onHideCart={hideCart}/>}
            <Header onShowCart={showCart}/>
            <main>
                <Decorations/>
            </main>
        </CartProvider>
    );
}

export default App;
