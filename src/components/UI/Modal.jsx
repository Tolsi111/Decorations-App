import classes from './Modal.module.css'
import ReactDOM from "react-dom";

function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClick}/>
}

function ModalOverlay(props) {
    return <div className={classes.modal}>
        <div>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
    return (
        <>
            {/*<Backdrop/>*/}
            {/*<ModalOverlay>{props.children}</ModalOverlay>*/}
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
}

export default Modal;