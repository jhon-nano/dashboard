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
export declare type UsuarioCreateFormInputValues = {
    username?: string;
    nombreUsuario?: string;
    sub?: string;
    estado?: string;
};
export declare type UsuarioCreateFormValidationValues = {
    username?: ValidationFunction<string>;
    nombreUsuario?: ValidationFunction<string>;
    sub?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UsuarioCreateFormOverridesProps = {
    UsuarioCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    nombreUsuario?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type UsuarioCreateFormProps = React.PropsWithChildren<{
    overrides?: UsuarioCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UsuarioCreateFormInputValues) => UsuarioCreateFormInputValues;
    onSuccess?: (fields: UsuarioCreateFormInputValues) => void;
    onError?: (fields: UsuarioCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UsuarioCreateFormInputValues) => UsuarioCreateFormInputValues;
    onValidate?: UsuarioCreateFormValidationValues;
} & React.CSSProperties>;
export default function UsuarioCreateForm(props: UsuarioCreateFormProps): React.ReactElement;
