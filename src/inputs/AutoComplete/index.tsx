import React from 'react';
import Autocomplete, { Input } from './styles';
import { ExpandMore } from '@mui/icons-material';
import { useController } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import { AutoCompleteProps } from './types';

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        field,
        fieldState: { error },
    } = useController<Record<string, string>>({
        name: props.name,
        control: props.control,
    });

    const findOption = (value: string = field.value) => {
        return props.options.find((i) => i.value === value);
    };

    const renderInput = (options: TextFieldProps) => {
        return (
            <Input
                {...options}
                placeholder={props.placeholder}
                focused
                value={findOption()?.label}
                label={props.label}
                helperText={error?.message}
                color={error ? 'error' : (props.color as 'primary' | 'info' | 'error')}
            />
        );
    };

    return (
        <Autocomplete
            disablePortal
            size="small"
            disableClearable
            popupIcon={<ExpandMore />}
            {...props}
            onChange={(_, value: any) => {
                field.onChange(value ? value.value : '');
            }}
            renderInput={renderInput}
            value={findOption() || ''}
        />
    );
};

export default AutoComplete;
