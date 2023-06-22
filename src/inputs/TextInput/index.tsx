import { FormHelperText, InputBase, InputLabel } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import TextInputContainer from './styles';
import { useController } from 'react-hook-form';
import { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = (props) => {
    const {
        field,
        fieldState: { error },
    } = useController<Record<string, string>>({
        name: props.name,
        control: props.control,
    });

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // send input ref, so we can focus on input when error appear
        field.ref(ref.current);
        if (props.inputRef) props.inputRef.current = ref.current;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);

    return (
        <TextInputContainer variant="standard" fullWidth>
            <InputLabel shrink disabled={props.disabled} className="label">
                {props.label}
            </InputLabel>
            <InputBase
                {...props}
                name={field.name} // send down the input name
                inputRef={ref}
                value={props.disableChange ? props.value : field.value} // input value
                onBlur={(e) => {
                    if (props.onBlur) props.onBlur(e);
                    if (props.disableChange !== true) field.onBlur();
                }} // notify when input is touched/blur
                onChange={(e) => {
                    if (props.onChange) props.onChange(e);
                    if (props.disableChange !== true) field.onChange(e);
                }} // send value to hook form
                color={error ? 'error' : props.color ?? 'info'}
            />

            <FormHelperText className="helper-text">
                {error?.message || props.helpertext}
            </FormHelperText>
        </TextInputContainer>
    );
};

export default TextInput;
