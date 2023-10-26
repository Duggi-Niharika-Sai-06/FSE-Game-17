import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Typography, Grid, styled } from '@mui/material';
import LevelSelection from "./LevelSelection";
import HighScore from "./HighScore";
import About from "./About";
import GameMenu from "./GameMenu";
import EasyGameMode from "./EasyGameMode";
import MediumGameMode from "./MediumGameMode";
import HardGameMode from "./HardGameMode";

const StyledContainer = styled(Container)(({ theme }) => ({
    background: 'linear-gradient(to bottom, #000, #111)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 15px 0px #fff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2),
}));

const ButtonContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const GameMenuController = () => {
    const [gameState, setGameState] = useState(0);

    const scrollRef = useRef(null);

    const onGameStateChange = (gameState) => {
        setGameState(gameState);
    };

    useEffect(() => {
        if (gameState === 5 && scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'});
        }
    }, [gameState]);

    return (
        <div>
            <div className="mt-10">
                {gameState === 0 ? <GameMenu onGameStateChange={onGameStateChange} /> : ''}
                {gameState === 1 ? <LevelSelection onGameStateChange={onGameStateChange} /> : ''}
                {gameState === 2 ? <HighScore onGameStateChange={onGameStateChange} /> : ''}
                {gameState === 4 ? <About onGameStateChange={onGameStateChange} /> : ''}
                {gameState === 5 ? <EasyGameMode onGameStateChange={onGameStateChange} /> : ''}
                {gameState === 6 ? <MediumGameMode onGameStateChange={onGameStateChange} /> : ''}
                {gameState === 7 ? <HardGameMode onGameStateChange={onGameStateChange} /> : ''}
            </div>
            {gameState === 5 ? <div className="m-20" ref={scrollRef}><hr /></div> : ""}
        </div>
    );
};

export default GameMenuController;
