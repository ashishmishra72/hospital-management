import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";



const contactData = [
    {
        id: 0,
        icon: MdEmail,
        title: "Chat on us",
        desc: "Our Staff team is here to help.",
        info: "@mail address",
        link: "mailto:kummar@gmail.com",
    },
    {
        id: 1,
        icon: FaLocationDot,
        title: "Visit us",
        desc: "Come and visit our hospital.",
        info: "Here is the location/address",
        link: "",
    },
    {
        id: 2,
        icon: BsFillTelephoneForwardFill,
        title: "Call us",
        desc: "Mon-Sat From 9:00am to 11:00pm",
        info: "+91 9273628296",
    }
]


export default contactData;