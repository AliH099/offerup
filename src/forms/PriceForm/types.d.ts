

export interface PriceFormProps {
    defaultValue?: number;
    onSubmit: (values: { price: number }) => void;
    variant: PriceVariant;
    submitButton?: React.ReactNode;
    loading?: boolean;
}
