import { CSSProperties } from 'react';

const textOverflowStyle = (line?: number): CSSProperties => ({
    display: '-webkit-box',
    WebkitLineClamp: line || 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
});

export default textOverflowStyle;
