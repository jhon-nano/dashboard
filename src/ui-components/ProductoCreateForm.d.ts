/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ProductoCreateFormInputValues = {
    codigo?: string;
    nombreProducto?: string;
    nombreCorto?: string;
    iva?: number;
    venta?: boolean;
    insumos?: boolean;
    preparacion?: boolean;
    barras?: string;
    presentacion?: string;
    descripcion?: string;
    cambio_precio?: boolean;
    datos_producto?: string;
    imagen?: string;
    estado?: string;
};
export declare type ProductoCreateFormValidationValues = {
    codigo?: ValidationFunction<string>;
    nombreProducto?: ValidationFunction<string>;
    nombreCorto?: ValidationFunction<string>;
    iva?: ValidationFunction<number>;
    venta?: ValidationFunction<boolean>;
    insumos?: ValidationFunction<boolean>;
    preparacion?: ValidationFunction<boolean>;
    barras?: ValidationFunction<string>;
    presentacion?: ValidationFunction<string>;
    descripcion?: ValidationFunction<string>;
    cambio_precio?: ValidationFunction<boolean>;
    datos_producto?: ValidationFunction<string>;
    imagen?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductoCreateFormOverridesProps = {
    ProductoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    codigo?: PrimitiveOverrideProps<TextFieldProps>;
    nombreProducto?: PrimitiveOverrideProps<TextFieldProps>;
    nombreCorto?: PrimitiveOverrideProps<TextFieldProps>;
    iva?: PrimitiveOverrideProps<TextFieldProps>;
    venta?: PrimitiveOverrideProps<SwitchFieldProps>;
    insumos?: PrimitiveOverrideProps<SwitchFieldProps>;
    preparacion?: PrimitiveOverrideProps<SwitchFieldProps>;
    barras?: PrimitiveOverrideProps<TextFieldProps>;
    presentacion?: PrimitiveOverrideProps<TextFieldProps>;
    descripcion?: PrimitiveOverrideProps<TextFieldProps>;
    cambio_precio?: PrimitiveOverrideProps<SwitchFieldProps>;
    datos_producto?: PrimitiveOverrideProps<TextAreaFieldProps>;
    imagen?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ProductoCreateFormProps = React.PropsWithChildren<{
    overrides?: ProductoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProductoCreateFormInputValues) => ProductoCreateFormInputValues;
    onSuccess?: (fields: ProductoCreateFormInputValues) => void;
    onError?: (fields: ProductoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductoCreateFormInputValues) => ProductoCreateFormInputValues;
    onValidate?: ProductoCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProductoCreateForm(props: ProductoCreateFormProps): React.ReactElement;
