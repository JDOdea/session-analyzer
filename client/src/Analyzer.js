import React, { useEffect, useRef } from 'react';
import Meyda from 'meyda';

const AudioAnalyzer = ({ audioFile }) => {
    const audioContextRef = useRef(null);
    const sourceRef = useRef(null);

    useEffect(() => {
        if (!audioFile) return;

        // Initialize web audio context
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

        // Create an analyser node (standard web audio)
        const analyser = audioContextRef.current.createAnalyzer();
        analyzer.fftSize = 2048;

        // Setup Meyda for audio engineering metrics
        const analyzer = Meyda.createMeydaAnalyzer({
            AudioContext: audioContextRef.current,
            source: analyser,
            bufferSize: 512,
            featureExtractors: ['rms', 'zcr', 'spectralCentroid'],
            callback: (features) => {
                console.log("RMS Level:", features.rms); // For UI meters
            },
        });

        analyzer.start();

        return () => analyzer.stop();
    }, [audioFile]);

    return (
        <div>Canvas</div>
    )
}