import React, { useState, useEffect } from 'react';
import {Button, Container, Typography, styled, Grid} from '@mui/material';
import GameNavbar from './GameNavbar';

import emojisData from '../common-emojis.json';

import gameClickSound from '../audio/success_sound.wav'
import gameClickSoundWrong from '../audio/fail_sound.wav'

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'linear-gradient(to bottom, #000, #111)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 15px 0px #fff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2),
}));

const EasyGameMode = ({onGameStateChange, soundEnabled}) => {
    const emojis = emojisData.emojis.slice(0, 20);

    const [gameStatus, setGameStatus] = useState('playing');
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(parseInt(localStorage.getItem("easyHighScore")) || 0);
    const [clickedEmojis, setClickedEmojis] = useState([]);
    const [shuffledEmojis, setShuffledEmojis] = useState([]);

    const [startTime, setStartTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState(0);

    const [lives, setLives] = useState(5); // State for lives

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const elapsedTime = Math.floor((now - startTime) / 1000); // Calculate elapsed time in seconds
            setElapsedTime(elapsedTime);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [startTime]);

    useEffect(() => {
        // Shuffle emojis when the game starts
        setShuffledEmojis(shuffleEmojis(emojis));

        console.log(clickedEmojis)
        // eslint-disable-next-line
    }, [currentScore]);

    const shuffleEmojis = (emojis) => {
        let shuffledEmojis = [...emojis];
        for (let i = shuffledEmojis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledEmojis[i], shuffledEmojis[j]] = [shuffledEmojis[j], shuffledEmojis[i]];
        }

        // Check if at least one emoji is different from the clicked emojis
        const shuffledSubset = shuffledEmojis.slice(0, 16);
        const uniqueEmoji = shuffledSubset.find((emoji) => !clickedEmojis.includes(emoji));

        if (!uniqueEmoji) {
            // If there's no unique emoji, manually replace one from the shuffled subset
            const randomIndex = Math.floor(Math.random() * 16);
            shuffledSubset[randomIndex] = emojis.find((emoji) => !shuffledSubset.includes(emoji));
        }

        return shuffledSubset;
    };

    const onEmojiClick = (emoji) => {
        if (clickedEmojis.includes(emoji)) {
            if (soundEnabled) {
                // Play the click sound
                new Audio(gameClickSoundWrong).play().then();
            }
            // Decrement lives and check if game is over
            setLives((prevLives) => prevLives - 1);

            // Game over, handle game lose logic
            if (lives - 1 === 0) {
                setGameStatus('lose');
                if (currentScore > bestScore) {
                    setBestScore(currentScore);
                }
            }

            if (currentScore > bestScore) {
                setBestScore(currentScore);
            }
        } else {
            if (soundEnabled) {
                // Play the click sound
                new Audio(gameClickSound).play().then();
            }

            // Emoji is not clicked before, increase the score
            setCurrentScore(currentScore + 1);
            setClickedEmojis([...clickedEmojis, emoji]);

            if (currentScore + 1 > bestScore) {
                setBestScore(currentScore + 1);
                localStorage.setItem("easyHighScore", (currentScore + 1).toString());
            }

            // Check if the user has won
            if (currentScore + 1 === 16) {
                setGameStatus('win');
            }
        }

        // Add the sparkling boom effect here
        const emojiElement = document.getElementById(`emoji-${emoji}`);
        if (emojiElement) {
            emojiElement.style.animation = 'sparkle 0.5s ease-in-out';
            setTimeout(() => {
                emojiElement.style.animation = ''; // Reset animation
            }, 500);
        }
    };


    const playAgain = () => {
        setCurrentScore(0);
        setClickedEmojis([]);
        setGameStatus('playing');
        // Shuffle emojis again
        const newShuffledEmojis = shuffleEmojis(emojis);
        setShuffledEmojis(newShuffledEmojis);
        setStartTime(new Date());
        setLives(5);
    };


    return (
        <StyledContainer>
            <GameNavbar highScore={bestScore} currentScore={currentScore} elapsedTime={elapsedTime} gameMode={"Easy"} lives={lives} />
            {gameStatus === 'playing' ? (
                <div
                    className="flex justify-center items-center text-center"
                     style={{
                         width: '400px',
                         height: '400px',
                         margin: "10px",
                         // border: '2px solid white',
                         // borderRadius: '15px',
                         // animation: 'shinyBorder_bk 2s linear infinite'
                }}>
                    <Grid container spacing={1}>
                        {shuffledEmojis.map((emoji, index) => (
                            <Grid item xs={3} key={index}>
                                <div
                                    onClick={() => onEmojiClick(emoji)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
                                        borderRadius: '10px', // To make it rounded
                                        border: '2px solid white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        margin: "6px",
                                        animation: 'shinyBorder 2s linear infinite',
                                        opacity: 1, // Start with opacity set to 0
                                        transition: 'opacity 0.5s ease', // Apply a transition effect
                                    }}
                                >
                                    <span
                                        id={`emoji-${emoji}`} // Add an ID to the emoji for the sparkling effect
                                        style={{ fontSize: '5rem'
                                        }}>
                                        {emoji}
                                    </span>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : gameStatus === 'lose' ? (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="error" style={{ color: 'red' }}>
                        Game Over
                    </Typography>
                    <Typography variant="h6" style={{ color: 'green' }}>Current Score: {currentScore}</Typography>
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success"  style={{ color: 'green' }}>
                        You Win!
                    </Typography>
                    <Typography variant="h6" style={{ color: 'green' }}>Best Score: {bestScore}</Typography>
                </div>
            )}

            <div style={{ textAlign: 'center', marginTop: "20px" }}>
                <StyledButton variant="contained" color="primary" onClick={playAgain}>
                    Play Again
                </StyledButton>
                <StyledButton variant="contained" color="primary" onClick={() => onGameStateChange(0)}>
                    Main Menu
                </StyledButton>
            </div>
        </StyledContainer>
    );
};

export default EasyGameMode;
