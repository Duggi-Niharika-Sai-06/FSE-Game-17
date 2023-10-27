import React from 'react';
import { Typography, Grid, styled } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import the heart icon
import ClearIcon from '@mui/icons-material/Clear'; // Import the clear (cross) icon

const StyledNavbar = styled(Grid)(({ theme }) => ({
    backgroundColor: 'black',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const StyledText = styled(Typography)({
    color: 'white',
    backgroundColor: 'black',
    padding: '8px 16px',
    borderRadius: '10%'
});

const GameNavbar = ({ highScore, currentScore, elapsedTime, gameMode, lives }) => {
    const formattedTime = `${Math.floor(elapsedTime / 60)}:${elapsedTime % 60}`;

    return (
        <StyledNavbar container>
            <Grid item>
                <StyledText variant="h6">
                    High Score: <span style={{color: "green"}}>{highScore}</span>
                </StyledText>
            </Grid>
            <Grid item>
                <StyledText variant="h6">
                    Current Score: <span style={{color: "green"}}>{currentScore}</span>
                </StyledText>
            </Grid>
            <Grid item>
                <StyledText variant="h6">
                    Mode: <span style={{color: "green"}}>{gameMode}</span>
                </StyledText>
            </Grid>
            <Grid item>
                <StyledText variant="h6">
                    Time: <span style={{color: "green"}}>{formattedTime}</span>
                </StyledText>
            </Grid>
            <Grid item>
                <StyledText variant="h6">
                    Lives: {Array.from({ length: lives }, (_, index) => (
                        <FavoriteIcon key={index} style={{ color: 'red' }} />
                    ))} { Array.from({ length: Math.max(0, 5 - lives) }, (_, index) => (
                    <ClearIcon key={index} style={{ color: 'red' }} />
                ))}
                </StyledText>
            </Grid>
        </StyledNavbar>
    );
};

export default GameNavbar;
