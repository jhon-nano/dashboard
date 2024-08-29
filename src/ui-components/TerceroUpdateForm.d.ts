/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Tercero } from "../models";
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
export declare type TerceroUpdateFormInputValues = {
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
export declare type TerceroUpdateFormValidationValues = {
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
export declare type TerceroUpdateFormOverridesProps = {
    TerceroUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type TerceroUpdateFormProps = React.PropsWithChildren<{
    overrides?: TerceroUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tercero?: Tercero;
    onSubmit?: (fields: TerceroUpdateFormInputValues) => TerceroUpdateFormInputValues;
    onSuccess?: (fields: TerceroUpdateFormInputValues) => void;
    onError?: (fields: TerceroUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TerceroUpdateFormInputValues) => TerceroUpdateFormInputValues;
    onValidate?: TerceroUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TerceroUpdateForm(props: TerceroUpdateFormProps): React.ReactElement;
