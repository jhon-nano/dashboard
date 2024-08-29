/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Consecutivo } from "../models";
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
export declare type ConsecutivoUpdateFormInputValues = {
    consecutivo?: number;
    codigo?: string;
};
export declare type ConsecutivoUpdateFormValidationValues = {
    consecutivo?: ValidationFunction<number>;
    codigo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConsecutivoUpdateFormOverridesProps = {
    ConsecutivoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    consecutivo?: PrimitiveOverrideProps<TextFieldProps>;
    codigo?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConsecutivoUpdateFormProps = React.PropsWithChildren<{
    overrides?: ConsecutivoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    consecutivo?: Consecutivo;
    onSubmit?: (fields: ConsecutivoUpdateFormInputValues) => ConsecutivoUpdateFormInputValues;
    onSuccess?: (fields: ConsecutivoUpdateFormInputValues) => void;
    onError?: (fields: ConsecutivoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConsecutivoUpdateFormInputValues) => ConsecutivoUpdateFormInputValues;
    onValidate?: ConsecutivoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ConsecutivoUpdateForm(props: ConsecutivoUpdateFormProps): React.ReactElement;
