import React, { useState, useEffect } from 'react';
import './WallRacks.css'

const WallRacks = () => {
    const [descriptions, setDescriptions] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDescriptions = async () => {
            try {
                const response = await fetch('/api/descriptions');
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    // Convert array to object for easy access by name
                    const descriptionsByName = data.reduce((acc, desc) => {
                        acc[desc.name] = desc.description;
                        return acc;
                    }, {});
                    setDescriptions(descriptionsByName);
                } else {
                    setError('Failed to fetch descriptions');
                }
            } catch (error) {
                setError('Error fetching descriptions');
            }
        };

        fetchDescriptions();
    }, []);

    // Function to handle the scroll to the split section
    const scrollToVisual = () => {
        const targetSection = document.getElementById('visual');

        // Smoothly scrolls to the split section
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    return(
        <div className='wall-rack-page'>
            <div className = 'split-section'>
                <div className='racksLeft'>
                </div>
                <div className='racksRight'>
                    <h1>Wall Racks</h1>
                    <p>Hand carved cue racks are available in sizes of 4 to 8 pool cues, 
                        and can come in any color. The racks can be expanded to include 
                        a billiard ball holder for an extra $75.</p> 
                    <button className="button arrow-button" onClick={scrollToVisual}></button>
                </div>
            </div>
            <div className='bar'>
                <h1>PRICING</h1>
            </div>
            <div className="visual" id="visual">
                <div className = 'left' >
                    <h1>Base Price*</h1>
                    <p><b>4 Cues:</b> {descriptions['wall-racks-price-4']}</p>
                    <p><b>6 Cues:</b> {descriptions['wall-racks-price-6']}</p>
                    <p><b>8 Cues:</b> {descriptions['wall-racks-price-8']}</p>

                    <p>*Does not include cost of installation</p>
                    
                </div>
                <div className = 'middle'>
                    <img className = 'middle' src= 'https://i.imgur.com/2HeaViT.png' alt='graph'/>
                </div>
                <div className = 'right' >
                    <h1>Customizing</h1>
                    <p><b>Pool Ball Holder</b></p>
                    <p>{descriptions['wall-racks-price-hold']}</p>

                    <p><b>Rack Color</b></p>
                    <p>{descriptions['wall-racks-price-color']}</p>

                    <p><b>Rack Detailing</b></p>
                    <p>{descriptions['wall-racks-price-detailing']}</p>
                </div>
            </div>
        </div>
    )
}

export default WallRacks;