/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ConsecutivoCreateFormInputValues = {
    consecutivo?: number;
    codigo?: string;
};
export declare type ConsecutivoCreateFormValidationValues = {
    consecutivo?: ValidationFunction<number>;
    codigo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConsecutivoCreateFormOverridesProps = {
    ConsecutivoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    consecutivo?: PrimitiveOverrideProps<TextFieldProps>;
    codigo?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConsecutivoCreateFormProps = React.PropsWithChildren<{
    overrides?: ConsecutivoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ConsecutivoCreateFormInputValues) => ConsecutivoCreateFormInputValues;
    onSuccess?: (fields: ConsecutivoCreateFormInputValues) => void;
    onError?: (fields: ConsecutivoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConsecutivoCreateFormInputValues) => ConsecutivoCreateFormInputValues;
    onValidate?: ConsecutivoCreateFormValidationValues;
} & React.CSSProperties>;
export default function ConsecutivoCreateForm(props: ConsecutivoCreateFormProps): React.ReactElement;
