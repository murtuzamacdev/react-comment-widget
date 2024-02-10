import {useNavigate} from 'react-router'

const ResCard = ({card}) => {
    const navigate = useNavigate();

    const handleResCardClick = () => {
        navigate('/resDetails', {state: card});
    }

    return ( <div className='mr-3 cursor-pointer flex content-evenly justify-between mb-3 mt-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ' onClick={handleResCardClick}>{card.resName}</div> );
}
 
export default ResCard;