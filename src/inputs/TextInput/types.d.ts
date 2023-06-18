import { InputBaseProps } from '@mui/material';

export interface TextInputProps extends Omit<InputBaseProps, 'sx' | 'name'> {
    label?: string;
    name: string;
    control: Control<any>;
    inputRef?: React.MutableRefObject<HTMLInputElement | null>;
    /**
     * disable onChange hook form value
     * @default false
     */
    disableChange?: boolean;
    helperText?: string;
}
