import React from 'react';
import { Button, Container, Typography, Grid, styled } from '@mui/material';

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

const LevelSelection = ({ onGameStateChange }) => {

    return (
        <StyledContainer className="w-full">
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{
                    color: '#fff',
                    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)', // Add text shadow for a shiny effect
                    //fontFamily: 'cursive', // Use a cursive font for a fancy look
                    fontSize: '1.5rem', // Increase font size
                    letterSpacing: '2px', // Add letter spacing for a fancy touch
                }}
            >
                Level
            </Typography>
            <ButtonContainer>
                <StyledButton variant="contained" color="primary" onClick={() => onGameStateChange(5)}>
                    Easy
                </StyledButton>
                <StyledButton variant="contained" color="primary" onClick={() => onGameStateChange(6)}>
                    Medium
                </StyledButton>
                <StyledButton variant="contained" color="primary" onClick={() => onGameStateChange(7)}>
                    Hard
                </StyledButton>
                <StyledButton variant="contained" color="primary" onClick={() => onGameStateChange(0)}>
                    Back
                </StyledButton>
            </ButtonContainer>
        </StyledContainer>
    );
};

export default LevelSelection;
