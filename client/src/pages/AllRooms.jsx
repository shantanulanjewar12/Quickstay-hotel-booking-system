import React,{useMemo, useState} from 'react'
import {roomsDummyData} from '../assets/assets'
import {useSearchParams} from 'react-router-dom'
import StarRating from '../components/StarRating'
import {assets, facilityIcons} from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const CheckBox = ({label, selected=false, onchange=() => {}}) =>{
  return(
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input type="checkbox" checked={selected} onChange={(e)=>onchange(e.target.checked, label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
} 

const RadioButton = ({label, selected=false, onchange=() => {}}) =>{
  return(
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input type="radio" name="sortOption" checked={selected} onChange={()=>onchange(label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
} 

const AllRooms = () =>{

    const [openFilters, setOpenFilters] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const {rooms, navigate, currency} = useAppContext();

    const [selectedFilters, setSelectedFilters] = useState({
      roomType: [],
      priceRange: [],
    });

    const [selectedSort, setSelectedSort] = useState("");

    const roomTypes = [
      "Single Bed",
      "Double Bed",
      "Luxury Bed",
      "Family Suite",
    ];

    const priceRanges = [
      "0 to 500",
      "500 to 1000",
      "1000 to 2000",
      "2000 to 3000",
    ];

    const sortOptions = [
      "Price Low to High",
      "Price High to Low",
      "Newest First",
    ];

    // Handle filter changes
    const handleFilterChange = (checked, value, type) => {
      setSelectedFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        if (checked) {
          if (!updatedFilters[type].includes(value)) {
            updatedFilters[type].push(value);
          }
        }
        else {
          updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
        }
        return updatedFilters;
      });
    };

    const handleSortChange = (sortOption) => {
      setSelectedSort(sortOption);
    };


    //function to check if room matches selected room type
    const matchesRoomType = (room) => {
      return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.type);
    }

    //function to check if room matches selected price range
    const matchesPriceRange = (room) => {
      return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
        const [min, max] = range.split(' to ').map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    }

    //function to sort rooms based on selected filters
    const sortRooms = (a,b) => {
      if (selectedSort === "Price Low to High") {
        return a.pricePerNight - b.pricePerNight;
      }
      if (selectedSort === "Price High to Low") {
        return b.pricePerNight - a.pricePerNight;
      }
      if (selectedSort === "Newest First") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0; // Default case
    }

    //Filter destination based on search params
    const filterDestination = (room) => {
      const destination = searchParams.get('destination');
      if (!destination) return true; // If no destination is specified, return all rooms
      return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
    }

    //FILTER ROOMS BASED ON SELECTED FILTERS AND SORT OPTIONS
    const filteredRooms = useMemo(() => {
      return rooms.filter(room => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);
    }, [rooms, selectedFilters, selectedSort, searchParams]);


    //clear all filters
    const clearFilters = () => {
      setSelectedFilters({
        roomType: [],
        priceRange: [],
      });
      setSelectedSort("");
      setSearchParams({});
    };

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24'>
            {/*Hotel List*/}
          <div>
            <div className='flex flex-col items-start text-left'>
                <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                <p className='text-xs md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
            </div>

            {filteredRooms.map((room)=>(
              <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                <img onClick={()=> {navigate(`/rooms/${room._id}`); (scrollTo(0,0))}} src={room.images[0]} title="View Room" className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'/>
                <div className='md:w-1/2 flex flex-col gap-2'>
                  <p className='text-gray-500'>{room.hotel.city}</p>
                  <p onClick={()=> {navigate(`/rooms/${room._id}`); (scrollTo(0,0))}} className='text-gray-800 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
                  <div className='flex items-center'>
                    <StarRating />
                    <p className='ml-2'>200+ reviews</p>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                    <img src={assets.locationIcon} alt="" />
                    <span>{room.hotel.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center mt-3 mb-6 gap-4 ">
                    {room.amenities.map((item,index)=>(
                      <div>
                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                        <p className='text-xs'>{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/ night</p>
                </div>
              </div>
            ))}
          </div>
            {/* Filters */}
          <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
            <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && 'border-b'}`}>
              <p className='text-base font-medium text-gray-800'>FILTERS</p>
              <div className='text-xs cursor-pointer'>
                <span onClick={()=> setOpenFilters(!openFilters)} className='lg:hidden'>{openFilters ? 'HIDE' : 'SHOW'}</span>
                <span className='hidden lg:block'>CLEAR</span>
              </div>
            </div>

            <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-all`}>
              <div className='px-5 pt-5'>
                <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>

                {roomTypes.map((room, index)=>(
                  <CheckBox key={index} label={room} selected={selectedFilters.roomType.includes(room)} onchange={(checked)=> handleFilterChange(checked, room, "roomType")}/>
                ))}
              </div>

                <div className='px-5 pt-5'>
                <p className='font-medium text-gray-800 pb-2'>Price Range</p>

                {priceRanges.map((range, index)=>(
                  <CheckBox key={index} label={`${currency} ${range}`} selected={selectedFilters.priceRange.includes(range)} onchange={(checked)=> handleFilterChange(checked, range, "priceRange")}/>
                ))}
              </div>

              <div className='px-5 pt-5 pb-7'>
                <p className='font-medium text-gray-800 pb-2'>Sort By</p>

                {sortOptions.map((option, index)=>(
                  <RadioButton key={index} label={option} selected={selectedSort === option} onchange={()=> handleSortChange(option)}/>
                ))}
              </div>
            </div>
          </div>
        </div>
    )
}

export default AllRooms
