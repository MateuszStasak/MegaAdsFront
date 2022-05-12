import React from 'react';

import './Button.css'

interface Props {
    text: string;
}

export const Button = (props: Props) => (
        <button>{props.text}</button>
);