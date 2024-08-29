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
export declare type TerceroCreateFormInputValues = {
    tipo_tercero?: string;
    identificacion?: string;
    dv?: number;
    expedida?: string;
    lugar_nacimiento?: string;
    fecha_nacimiento?: string;
    nombre_completo?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    primer_nombre?: string;
    segundo_nombre?: string;
    direccion?: string;
    telefono?: string;
    ciudad?: string;
    correo?: string;
    estado?: string;
};
export declare type TerceroCreateFormValidationValues = {
    tipo_tercero?: ValidationFunction<string>;
    identificacion?: ValidationFunction<string>;
    dv?: ValidationFunction<number>;
    expedida?: ValidationFunction<string>;
    lugar_nacimiento?: ValidationFunction<string>;
    fecha_nacimiento?: ValidationFunction<string>;
    nombre_completo?: ValidationFunction<string>;
    primer_apellido?: ValidationFunction<string>;
    segundo_apellido?: ValidationFunction<string>;
    primer_nombre?: ValidationFunction<string>;
    segundo_nombre?: ValidationFunction<string>;
    direccion?: ValidationFunction<string>;
    telefono?: ValidationFunction<string>;
    ciudad?: ValidationFunction<string>;
    correo?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TerceroCreateFormOverridesProps = {
    TerceroCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tipo_tercero?: PrimitiveOverrideProps<SelectFieldProps>;
    identificacion?: PrimitiveOverrideProps<TextFieldProps>;
    dv?: PrimitiveOverrideProps<TextFieldProps>;
    expedida?: PrimitiveOverrideProps<TextFieldProps>;
    lugar_nacimiento?: PrimitiveOverrideProps<TextFieldProps>;
    fecha_nacimiento?: PrimitiveOverrideProps<TextFieldProps>;
    nombre_completo?: PrimitiveOverrideProps<TextFieldProps>;
    primer_apellido?: PrimitiveOverrideProps<TextFieldProps>;
    segundo_apellido?: PrimitiveOverrideProps<TextFieldProps>;
    primer_nombre?: PrimitiveOverrideProps<TextFieldProps>;
    segundo_nombre?: PrimitiveOverrideProps<TextFieldProps>;
    direccion?: PrimitiveOverrideProps<TextFieldProps>;
    telefono?: PrimitiveOverrideProps<TextFieldProps>;
    ciudad?: PrimitiveOverrideProps<TextFieldProps>;
    correo?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TerceroCreateFormProps = React.PropsWithChildren<{
    overrides?: TerceroCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TerceroCreateFormInputValues) => TerceroCreateFormInputValues;
    onSuccess?: (fields: TerceroCreateFormInputValues) => void;
    onError?: (fields: TerceroCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TerceroCreateFormInputValues) => TerceroCreateFormInputValues;
    onValidate?: TerceroCreateFormValidationValues;
} & React.CSSProperties>;
export default function TerceroCreateForm(props: TerceroCreateFormProps): React.ReactElement;
