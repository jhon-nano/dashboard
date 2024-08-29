/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Usuario } from "../models";
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
export declare type UsuarioUpdateFormInputValues = {
    username?: string;
    nombreUsuario?: string;
    sub?: string;
    estado?: string;
};
export declare type UsuarioUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
    nombreUsuario?: ValidationFunction<string>;
    sub?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UsuarioUpdateFormOverridesProps = {
    UsuarioUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    nombreUsuario?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type UsuarioUpdateFormProps = React.PropsWithChildren<{
    overrides?: UsuarioUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    usuario?: Usuario;
    onSubmit?: (fields: UsuarioUpdateFormInputValues) => UsuarioUpdateFormInputValues;
    onSuccess?: (fields: UsuarioUpdateFormInputValues) => void;
    onError?: (fields: UsuarioUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UsuarioUpdateFormInputValues) => UsuarioUpdateFormInputValues;
    onValidate?: UsuarioUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UsuarioUpdateForm(props: UsuarioUpdateFormProps): React.ReactElement;
