import './App.css';
import seatData from './data';
import { useState } from 'react';



const Seat = (props) =>{
  
  const {seatId,price, isReserved,onClick} = props

  const initialColor = isReserved?'bg-gray-600':'bg-orange-500'
  const initialText = isReserved?'Reserved':'';
  const hoverColor = isReserved?'bg-gray-600':'bg-orange-200'

  const [color,setColor] = useState(initialColor)
  const [seatText,setSeatText] = useState(initialText)

  const changeProp = () =>{
    if (!isReserved){
      seatText=='Added'?setSeatText(''):setSeatText('Added')
      color=='bg-green-500'?setColor('bg-orange-500'):setColor('bg-green-500')
    }
  }

  const clickEventFunctions = ()=>{
    {changeProp()};
    {onClick()};
  }

  return (
    <button onClick={clickEventFunctions}
   
    className={ `${color} text-white text-sm font-medium text-opacity-80  hover:${hoverColor} focus:${color}    h-[70px] w-[70px] rounded-sm`}  id={seatId} >{seatText}</button>

  )
}



function App() {

  const [selectedSeats,setSelectedSeats] = useState([])
  const [total,setTotal] = useState(0)
  
  return (
    
    <div className='flex justify-between'>
      {console.log(selectedSeats)}

      <div className='flex-col flex items-center  h-[100vh] w-[30%] p-5   '>
 
       <div className='flex justify-between w-[75%] '>
        <p className='font-medium text-xl  '>Selected Seats</p>
        <p className='font-medium text-xl  '>Price</p>
       </div> 

        <div className='flex flex-col gap-2  mt-6 h-[100vh] w-[75%]'>
             {
              selectedSeats.map((seatObj) =>(
                <div className='flex justify-between  '> 
                <p className='font-semibold text-lg '>{seatObj.id}</p>
                <p className='text-orange-600 font-semibold text-lg '>{`₹ ${seatObj.price}`}</p>
                </div>
              ))
             }
        </div>

        <p className='font-medium text-xl '>Total: ₹ {total}</p>


      </div>

      <div className='bg-black w-[70%] h-[100vh] flex flex-col  justify-center items-center '>

        <p  className='text-white text-5xl mb-[80px] '>SEAT MATRIX </p>

        <div className='flex gap-4 flex-wrap w-[420px] h-[420px]'>
        
        {
          seatData.map((seatObj)=>(
            
            <Seat onClick={()=>{

              if (selectedSeats.includes(seatObj) && seatObj.isReserved===false){
                const filterList = Array.from(selectedSeats)
                filterList.splice(filterList.indexOf(seatObj),1)

                setSelectedSeats(filterList)
                setTotal(total-seatObj.price)
              }
              else {
                if (seatObj.isReserved===false){
                  setSelectedSeats([...selectedSeats,seatObj])
                  setTotal(total+seatObj.price)
                }

              }
            }} 
            key={seatObj.id} seatId={seatObj.id} price={seatObj.price} isReserved={seatObj.isReserved} />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default App;
