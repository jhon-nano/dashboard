/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Producto } from "../models";
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
export declare type ProductoUpdateFormInputValues = {
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
export declare type ProductoUpdateFormValidationValues = {
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
export declare type ProductoUpdateFormOverridesProps = {
    ProductoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ProductoUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProductoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    producto?: Producto;
    onSubmit?: (fields: ProductoUpdateFormInputValues) => ProductoUpdateFormInputValues;
    onSuccess?: (fields: ProductoUpdateFormInputValues) => void;
    onError?: (fields: ProductoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductoUpdateFormInputValues) => ProductoUpdateFormInputValues;
    onValidate?: ProductoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProductoUpdateForm(props: ProductoUpdateFormProps): React.ReactElement;
