import React, { useEffect, useRef, useState } from 'react';
import Meyda from 'meyda';

const AudioAnalyzer = ({ fileUrl }) => {
    const [audioData, setAudioData] = useState({ rms: 0, zcr: 0 });
    const audioContextRef = useRef(null);
    const analyzerRef = useRef(null);

    const startAnalysis = async () => {
        // Initialize audio context
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Fetch and decode audio from backend
        const response = await fetch(fileUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

        // Create buffer source
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;

        // Setup Meyda for audio engineering metrics
        analyzerRef.current = Meyda.createMeydaAnalyzer({
            audioContext: audioContextRef.current,
            source: source,
            bufferSize: 512,
            featureExtractors: ['rms', 'zcr'],
            callback: (features) => setAudioData(features),
        });

        source.connect(audioContextRef.current.destination);
        source.start();
        analyzerRef.current.start();
    };


    return (
        <div className="p-4 border rounded shadow">
            <button onClick={startAnalysis} className="bg-blue-500 text-white px-4 py-2 rounded">
                Analyze Session
            </button>
            <div className="mt-4">
                <p>RMS Level (Loudness): <strong>{audioData.rms.toFixed(4)}</strong></p>
                <p>Zero Crossing Rate (Noise/Pitch): <strong>{audioData.zcr}</strong></p>
            </div>
        </div>
    );
};

export default AudioAnalyzer;