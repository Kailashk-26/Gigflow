import { useEffect, useRef, useState } from "react";
import {LayoutDashboard, Search} from "lucide-react"
import { useNavigate } from "react-router-dom";

const Navbar = ({setIsSearchBar}) => {

    const user=false;

    const ref = useRef(null)
    const navigate=useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current.scrollTop > 10);
        };
        ref.current.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={ref} className="h-40 overflow-y-scroll">
            <nav className={`fixed top-0 left-0 bg-red-500 w-full flex items-center justify-between px-4 md:px-8 transition-all duration-500 z-2 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <p className={`text-2xl text-white ${isScrolled ? "invert" : ""}`}>GigFlow</p>

                {/* logo */}
                <div className="flex items-center gap-4">
                    <Search onClick={()=>setIsSearchBar(prev=>!prev)} className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`}/>
                    <button onClick={!user?()=>navigate('/state?'):()=>navigate('/dashboard')} className={`p-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                        {user?<LayoutDashboard />:"Login"}
                    </button>
                </div>  
            </nav>
        </div>
    );
}
export default Navbar;