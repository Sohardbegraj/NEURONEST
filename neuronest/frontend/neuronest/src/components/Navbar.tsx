import { Button } from './Button'
import logo from '../assets/logo.svg';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row justify-around border-b-black bg-gray-50 p-4 shadow-md'>
      <div className='flex items-center'>
      <img
        src={logo}
        alt="neuronest"
        className='cursor-pointer h-16 sm:h-20 min-h-16 sm:min-h-20 object-contain'
        draggable="false"
        style={{ minWidth: '64px' }}
      />
      </div>
      <div className='flex gap-4'>
      <Button
        variant='primary'
        size='large'
        label='Share'
        onClick={() => {navigate("/content/share")}}
      />
      <Button
        variant='secondary'
        size='large'
        label='Add Content'
        onClick={() => {navigate("/content/addcontent")}}
      />
      </div>
    </div>
  )
}

export default Navbar
