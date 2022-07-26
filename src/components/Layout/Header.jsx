import headerImg from '../../assets/header-img.jpg';
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1>Home gifts</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={headerImg} alt={"home decorations"}/>
            </div>
        </>
    );
}

export default Header;