import { AutocompleteProps } from '@mui/material';
import { Control } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';

export interface AutoCompleteProps
    extends Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput'> {
    control: Control<any>;
    name: string;
    label?: string;
}
