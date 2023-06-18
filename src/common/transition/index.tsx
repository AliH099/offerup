import { Keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';

// Uses for mount and unmount transitions

interface TransitionProps {
    children: React.ReactNode;
    unmountOnExit?: boolean; // For performance reasons
    in: boolean;
    enterKeyframes?: Keyframes;
    exitKeyframes?: Keyframes;
    duration?: number;
    onAnimationEnd?: () => void;
    onAnimationStart?: () => void;
}

const Transition: React.FC<TransitionProps> = (props) => {
    const [render, setRender] = useState<boolean>();

    useEffect(() => {
        if (props.in) {
            setRender(true);
        }
    }, [props.in]);

    // Unmount when animation is finished
    const onAnimationEnd = () => {
        if (!props.in) setRender(false);
        if (props.onAnimationEnd) props.onAnimationEnd();
    };

    if (!props.unmountOnExit || render) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    animation: `${props.in ? props.enterKeyframes : props.exitKeyframes} ${
                        props.duration
                    }s forwards`,
                }}
                hidden={
                    (props.in && props.enterKeyframes) || (!props.in && props.exitKeyframes)
                        ? !render
                        : !props.in
                }
                onAnimationEnd={onAnimationEnd}
                onAnimationStart={props.onAnimationStart}
            >
                {props.children}
            </Box>
        );
    } else {
        return <Fragment></Fragment>;
    }
};

Transition.defaultProps = {
    unmountOnExit: false,
    duration: 0.7,
};

export default Transition;
