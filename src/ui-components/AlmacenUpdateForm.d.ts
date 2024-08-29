/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Almacen } from "../models";
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
export declare type AlmacenUpdateFormInputValues = {
    codigo?: string;
    nit?: string;
    nombreAlmacen?: string;
    direccion?: string;
    ciudad?: string;
    telefono?: string;
    secciones?: string[];
    estantes?: string[];
    niveles?: string[];
    cajas?: string[];
    estado?: string;
};
export declare type AlmacenUpdateFormValidationValues = {
    codigo?: ValidationFunction<string>;
    nit?: ValidationFunction<string>;
    nombreAlmacen?: ValidationFunction<string>;
    direccion?: ValidationFunction<string>;
    ciudad?: ValidationFunction<string>;
    telefono?: ValidationFunction<string>;
    secciones?: ValidationFunction<string>;
    estantes?: ValidationFunction<string>;
    niveles?: ValidationFunction<string>;
    cajas?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AlmacenUpdateFormOverridesProps = {
    AlmacenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    codigo?: PrimitiveOverrideProps<TextFieldProps>;
    nit?: PrimitiveOverrideProps<TextFieldProps>;
    nombreAlmacen?: PrimitiveOverrideProps<TextFieldProps>;
    direccion?: PrimitiveOverrideProps<TextFieldProps>;
    ciudad?: PrimitiveOverrideProps<TextFieldProps>;
    telefono?: PrimitiveOverrideProps<TextFieldProps>;
    secciones?: PrimitiveOverrideProps<TextFieldProps>;
    estantes?: PrimitiveOverrideProps<TextFieldProps>;
    niveles?: PrimitiveOverrideProps<TextFieldProps>;
    cajas?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type AlmacenUpdateFormProps = React.PropsWithChildren<{
    overrides?: AlmacenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    almacen?: Almacen;
    onSubmit?: (fields: AlmacenUpdateFormInputValues) => AlmacenUpdateFormInputValues;
    onSuccess?: (fields: AlmacenUpdateFormInputValues) => void;
    onError?: (fields: AlmacenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AlmacenUpdateFormInputValues) => AlmacenUpdateFormInputValues;
    onValidate?: AlmacenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AlmacenUpdateForm(props: AlmacenUpdateFormProps): React.ReactElement;
