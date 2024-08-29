/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Marca } from "../models";
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
export declare type MarcaUpdateFormInputValues = {
    nombreMarca?: string;
    estado?: string;
};
export declare type MarcaUpdateFormValidationValues = {
    nombreMarca?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MarcaUpdateFormOverridesProps = {
    MarcaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombreMarca?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type MarcaUpdateFormProps = React.PropsWithChildren<{
    overrides?: MarcaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    marca?: Marca;
    onSubmit?: (fields: MarcaUpdateFormInputValues) => MarcaUpdateFormInputValues;
    onSuccess?: (fields: MarcaUpdateFormInputValues) => void;
    onError?: (fields: MarcaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MarcaUpdateFormInputValues) => MarcaUpdateFormInputValues;
    onValidate?: MarcaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MarcaUpdateForm(props: MarcaUpdateFormProps): React.ReactElement;
