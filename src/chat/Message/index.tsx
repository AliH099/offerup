import { Box, Typography } from '@mui/material';
import React from 'react';

interface MessageProps {
    guest: boolean;
    text: string;
}

export const Message = (props: MessageProps): JSX.Element => {
    return (
        <Box
            sx={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: props.guest ? 'row' : 'row-reverse',
                mb: '25px',
                padding: '0 25px',
                gap: '10px',
            }}
        >
            <Typography
                sx={{
                    maxWidth: '65%',
                    lineHeight: 2,
                    backgroundColor: props.guest
                        ? 'rgba(234, 211, 211, 0.4)'
                        : 'rgba(34, 118, 216, 0.8)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: props.guest ? 'black' : 'white',
                    padding: '10px 15px',
                }}
            >
                {props.text}
            </Typography>
        </Box>
    );
};
