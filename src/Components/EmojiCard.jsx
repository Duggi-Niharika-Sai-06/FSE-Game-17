import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Card = ({ emoji, onClick }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        // You can add your logic here when a card is clicked.

        // Reset the click effect after a certain time or when needed.
        setTimeout(() => setClicked(false), 500);
    };

    const springProps = useSpring({
        scale: clicked ? 0.9 : 1, // Scale down when clicked.
        config: { mass: 1, tension: 500, friction: 20 }, // Adjust these values for desired effect.
    });

    return (
        <animated.div
            onClick={handleClick}
            style={{
                ...springProps,
                width: '80px',
                height: '80px',
                background: 'white',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '6px',
                fontSize: '5rem',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                transformOrigin: 'center',
            }}
        >
            {emoji}
        </animated.div>
    );
};

export default Card;
