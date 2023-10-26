import React, { useState, useRef, useEffect } from 'react';
import Timer from './Timer';
import { Button, Container, Typography, Grid, styled } from '@mui/material';

import emojisData from '../common-emojis.json';
import EmojiCard from "./EmojiCard"; // Update the path to your JSON file

const StyledGameContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#f1f1f1',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 15px 0px #000',
}));

function GameController({ selectedLevel, onGameOver }) {
    const emojis = emojisData.emojis;
    const allEmojis = [...emojis, ...emojis];

    // Define game parameters based on the selected level (ranging from 1 to 5)
    const levelParameters = {
        1: { gridSize: 2, timeLimit: 30 },
        2: { gridSize: 4, timeLimit: 45 },
        3: { gridSize: 6, timeLimit: 60 },
        4: { gridSize: 8, timeLimit: 75 },
        5: { gridSize: 10, timeLimit: 90 },
    };

    const { gridSize, timeLimit } = levelParameters[selectedLevel];

    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setGameOver] = useState(null);
    const [reset, setReset] = useState(0);
    const timerRef = useRef(null);

    const handleTimeout = () => {
        setGameOver("Game Over! Your time ran out.");
    };

    useEffect(() => {
        const shuffleCards = () => {
            let shuffled = allEmojis.sort(() => Math.random() - 0.5).slice(0, gridSize * gridSize);
            setCards(shuffled);
        };
        shuffleCards();
    }, [selectedLevel]);

    const handleClick = (index) => {
        if (gameOver) {
            return; // Don't allow flipping cards when the game is over
        }

        if (flipped.length === 2) {
            return;
        }

        if (flipped.length === 0) {
            setFlipped([index]);
        } else if (flipped.length === 1) {
            setFlipped([flipped[0], index]);
            if (cards[flipped[0]] === cards[index]) {
                setSolved([...solved, flipped[0], index]);
                resetFlipped();
            } else {
                setDisabled(true);
                setTimeout(() => {
                    resetFlipped();
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    const resetFlipped = () => {
        setFlipped([]);
    };

    const resetGame = () => {
        setCards([]);
        setFlipped([]);
        setSolved([]);
        setDisabled(false);
        setReset((prevReset) => prevReset + 1);
        if (timerRef.current) {
            timerRef.current.resetTimer();
        }
        setGameOver(null);
        const shuffleCards = () => {
            let shuffled = allEmojis.sort(() => Math.random() - 0.5).slice(0, gridSize * gridSize);
            setCards(shuffled);
        };
        shuffleCards();
    };

    return (
        <StyledGameContainer maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Game
            </Typography>
            {solved.length === gridSize * gridSize / 2 ? (
                <Typography variant="h2" align="center">
                    Congratulations! You won!
                </Typography>
            ) : (
                gameOver ? (
                    <Typography variant="h2" align="center">
                        {gameOver}
                    </Typography>
                ) : (
                    <Timer
                        key={reset}
                        ref={timerRef}
                        initialTime={timeLimit}
                        onTimeout={handleTimeout}
                    />
                )
            )}
            {/*<Grid container spacing={2}>*/}
            {/*    {cards.map((emoji, index) => (*/}
            {/*        <Grid item xs={3} key={index}>*/}
            {/*            <EmojiCard*/}
            {/*                emoji={emoji}*/}
            {/*                // index={index}*/}
            {/*                // flipped={flipped}*/}
            {/*                // solved={solved}*/}
            {/*                // disabled={disabled}*/}
            {/*                onClick={handleClick}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*    ))}*/}
            {/*</Grid>*/}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {cards.map((emoji, index) => (
                    <EmojiCard
                        emoji={emoji}
                        key={index}
                        onClick={handleClick}
                    />
                ))}
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={resetGame}
                style={{ marginTop: '16px' }}
            >
                Reset Game
            </Button>
        </StyledGameContainer>
    );
}

export default GameController;
