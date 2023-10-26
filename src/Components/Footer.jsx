import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Link, styled } from '@mui/material';

const StyledFooter = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    color: 'white',
    position: 'absolute',
    bottom: 0, // Position at the bottom
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
}));

const Footer = () => {
    return (
        <StyledFooter>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" style={{ textAlign: 'left' }}>
                            © {new Date().getFullYear()} Your Website Name
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link href="#" color="inherit">
                            Privacy Policy
                        </Link>
                        <Link href="#" color="inherit">
                            Terms of Service
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </StyledFooter>
    );
};

export default Footer;
