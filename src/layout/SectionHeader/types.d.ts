export interface SectionHeaderProps {
    title: string;
    hasCancel?: boolean;
    onClickBack: () => void;
    onCancel?: () => void;
}
