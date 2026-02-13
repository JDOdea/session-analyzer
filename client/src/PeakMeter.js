import React from "react";

const PeakMeter = ({ level }) => {
    // Convert 0.0-1.0 segments
    const segments = 20;
    const activeSegments = Math.round(level * segments * 2); // Multiplier to make it move more

    return (
        <div className="flex flex-col-reverse gap-1 bg-black p-2 rounded w-12 h-64 border-2 border-gray-800">
            {[...Array(segments)].map((_, i) => {
                const isActive = i < activeSegments;
                let bgColor = "bg-gray-900"; // Default (Off)

                if (isActive) {
                if (i < 12) bgColor = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"; // Normal
                else if (i < 17) bgColor = "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"; // Caution
                else bgColor = "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"; // Peak/Clip
                }

                return (
                <div 
                    key={i} 
                    className={`h-2 w-full rounded-sm transition-all duration-75 ${bgColor}`}
                />
                );
            })}
        </div>
    )
};

export default PeakMeter;