import { Users } from "lucide-react";

const WelcomeMessage = ({type}:{type:string}) => {

    let quote ;
    if(type==="Organization"){
        quote="Together, we build better every day";
    }else if(type==="Employee"){
        quote="Small Steps today create big impacts tomorrow"
    }

    return (
        <div className="bg-gradient-to-br from-secondary-500 via-secondary-500 to-tertiary-500 px-5 pt-6 pb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-text-500">
                    <Users size={20} />
                    <span className="font-medium text-sm">{type}</span>
                </div>
                <button className="text-sm font-medium text-text-500">
                    Support
                </button>
            </div>

            <h1 className="text-3xl font-bold text-text-500 leading-tight">
                Welcome back!
                <br />
                {quote}
                <br />
            </h1>
        </div>
    );
};

export default WelcomeMessage;
