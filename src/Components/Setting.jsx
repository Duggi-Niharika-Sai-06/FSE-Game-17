import React, { useState, useEffect} from 'react';
import { Button, Container, Typography, Grid, styled, Switch, FormControlLabel } from '@mui/material';

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

const Setting = ({onGameStateChange}) => {
    const [audioOn, setAudioOn] = useState(true);

    useEffect(() => {
        // Retrieve the audio setting from localStorage
        const savedAudioSetting = localStorage.getItem('audioOn');

        // Check if the savedAudioSetting is '1' or '0' and set the audio state accordingly
        if (savedAudioSetting === '1' || savedAudioSetting === '0') {
            setAudioOn(savedAudioSetting === '1');
        }

    }, []);

    const handleAudioToggle = () => {
        // You can add logic to turn audio on/off here as needed.
        if (audioOn) {
            //console.log('true -> false: true', audioOn);
            setAudioOn(false);
            //console.log('true -> false: false', audioOn);
            localStorage.setItem('audioOn', '0');
        } else {
            //console.log('false -> true: false', audioOn);
            setAudioOn(true);
            //console.log('false -> true: true', audioOn);
            localStorage.setItem('audioOn', '1');
        }

        console.log('final:', localStorage.getItem('audioOn'));
    };

    return (
        <div className="mt-10">
            <StyledContainer className="w-96">
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
                    Setting
                </Typography>
                <Typography variant="h6" style={{ textAlign: 'center', color: '#fff', fontSize: '1rem'}}>
                    Sound
                </Typography>
                <ButtonContainer>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={audioOn}
                                onChange={handleAudioToggle}
                                color="primary"
                                name="audioToggle"
                                inputProps={{ 'aria-label': 'toggle audio' }}
                            />
                        }
                        label={
                            <span
                            style={{
                                color: '#fff', // Set label text color to white
                            }}>
                            {audioOn ? 'On' : 'Off'}
                            </span>
                        }
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <StyledButton variant="contained" color="primary" onClick={() => onGameStateChange(0)}>
                        Back
                    </StyledButton>
                </ButtonContainer>
            </StyledContainer>
        </div>
    );
};

export default Setting;