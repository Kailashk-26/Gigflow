import { useEffect, useRef, useState } from "react";
import {Search} from "lucide-react"
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const ref = useRef(null)
    const navigate=useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);
    const [searchBar,setSearchBar] =useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current.scrollTop > 10);
        };
        ref.current.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={ref} className="h-88 md:h-64 overflow-y-scroll">
            <p className="w-10 h-125"></p>
            <nav className={`fixed top-0 left-0 bg-red-500 w-full flex items-center justify-between px-4 md:px-8 transition-all duration-500 z-2 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <p className={`text-2xl text-white ${isScrolled ? "invert" : ""}`}>GigFlow</p>

                {/* logo */}
                <div className="flex items-center gap-4">
                    <Search onClick={()=>!setSearchBar} className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`}/>
                    <button onClick={()=>navigate('/state?')} className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                        Login
                    </button>
                </div>  
            </nav>
        </div>
    );
}
export default Navbar;