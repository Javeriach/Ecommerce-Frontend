import Styles from './Buttons.module.css';

function Buttons({ type, children, onClick }) {
    return (
        <button className={`${Styles[type]} ${Styles.btn} `} onClick={onClick}>
            {children}
        </button>
    )
}

export default Buttons
