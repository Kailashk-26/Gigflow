import { Search } from 'lucide-react'
import {gigs} from '../constant.js'
import { useNavigate } from 'react-router-dom'

const Gigs = ({isSearchBar}) => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center justify-center gap-6 '>
      {isSearchBar && 
        <div className="flex items-center border pl-4 gap-2 border-gray-500/30 h-11.5 rounded-full overflow-hidden max-w-md w-full">
            <Search/>
            <input type="text" placeholder="Search" className="w-full h-full outline-none text-gray-500 bg-transparent placeholder-gray-500 text-sm" />
        </div>
      }
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {gigs.map((gig,index)=>(
          <div key={index} className="flex flex-col items-center w-80 bg-white text-gray-500 p-4 md:p-6 rounded-lg border border-gray-200 text-sm">
            <div className="flex items-center justify-center relative w-full gap-2 pb-3"> 
                <h2 className="text-gray-800 text-xl font-medium text-left w-full pt-3">{gig.title}</h2>
            </div>
            <p className="line-clamp-3 min-h-18">{gig.description}</p>
            <div className="flex items-center justify-between mt-6 gap-3 w-full">
                <p>ID:{gig.id}</p>
                <button onClick={()=>navigate(`/dashboard/gigs/${gig.id}`)} type="button" className="bg-red-600 px-6 py-2 rounded text-white font-medium active:scale-95 transition">More Info</button>
            </div>
          </div>
        ))}
        
      </div>
    </div>
    
  )
}

export default Gigs