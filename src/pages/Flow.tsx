import { useNavigate } from "react-router-dom";

const Flow = ()=>{
    const navigate = useNavigate();

    return (
        <div className="flex flex-col"> 
            <button onClick={()=> (navigate("/emp"))} className="bg-primary-500 text-white" >Employee FLow</button>
            <button onClick={()=> (navigate("/org"))} className="bg-secondary-500 text-black">Organization FLow</button>
        </div>
    )
}


export default Flow ;