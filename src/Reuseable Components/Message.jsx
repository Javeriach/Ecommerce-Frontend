import Styles from "./Message.module.css";
import DoneMark from "../Images/DoneMark.png";
import CrossMark from "../Images/CrossMark.png";
import AOS from "aos";
import 'aos/dist/aos.css';

import { useEffect, useState } from "react";

function Message({ icon , message}) {

    useEffect(() => {
        AOS.init({ duration: 200 });
    }, []);

    return (
        <div data-aos="fade-down" data-aos-offset="200"
        className={` w-100 d-flex justify-content-center   ${Styles.message_section}`}>
            <p className={`d-flex  ${Styles.message} `}><img  className="w-[30px] h-[30px] " src={icon === "crossMark" ? CrossMark :DoneMark} alt="doneMark"></img> {message}</p>  
        </div>
    )
}

export default Message
