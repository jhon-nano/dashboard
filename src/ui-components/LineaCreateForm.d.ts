/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LineaCreateFormInputValues = {
    nombreLinea?: string;
    estado?: string;
};
export declare type LineaCreateFormValidationValues = {
    nombreLinea?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LineaCreateFormOverridesProps = {
    LineaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombreLinea?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type LineaCreateFormProps = React.PropsWithChildren<{
    overrides?: LineaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LineaCreateFormInputValues) => LineaCreateFormInputValues;
    onSuccess?: (fields: LineaCreateFormInputValues) => void;
    onError?: (fields: LineaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LineaCreateFormInputValues) => LineaCreateFormInputValues;
    onValidate?: LineaCreateFormValidationValues;
} & React.CSSProperties>;
export default function LineaCreateForm(props: LineaCreateFormProps): React.ReactElement;
