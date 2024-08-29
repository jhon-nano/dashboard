/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Linea } from "../models";
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
export declare type LineaUpdateFormInputValues = {
    nombreLinea?: string;
    estado?: string;
};
export declare type LineaUpdateFormValidationValues = {
    nombreLinea?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LineaUpdateFormOverridesProps = {
    LineaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombreLinea?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type LineaUpdateFormProps = React.PropsWithChildren<{
    overrides?: LineaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    linea?: Linea;
    onSubmit?: (fields: LineaUpdateFormInputValues) => LineaUpdateFormInputValues;
    onSuccess?: (fields: LineaUpdateFormInputValues) => void;
    onError?: (fields: LineaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LineaUpdateFormInputValues) => LineaUpdateFormInputValues;
    onValidate?: LineaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LineaUpdateForm(props: LineaUpdateFormProps): React.ReactElement;
