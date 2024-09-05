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
export declare type InventarioCreateFormInputValues = {
    inventario?: number;
    separado?: number;
    costo_promedio?: number;
    costo?: number;
    precio?: number;
    estado?: string;
};
export declare type InventarioCreateFormValidationValues = {
    inventario?: ValidationFunction<number>;
    separado?: ValidationFunction<number>;
    costo_promedio?: ValidationFunction<number>;
    costo?: ValidationFunction<number>;
    precio?: ValidationFunction<number>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InventarioCreateFormOverridesProps = {
    InventarioCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    inventario?: PrimitiveOverrideProps<TextFieldProps>;
    separado?: PrimitiveOverrideProps<TextFieldProps>;
    costo_promedio?: PrimitiveOverrideProps<TextFieldProps>;
    costo?: PrimitiveOverrideProps<TextFieldProps>;
    precio?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type InventarioCreateFormProps = React.PropsWithChildren<{
    overrides?: InventarioCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InventarioCreateFormInputValues) => InventarioCreateFormInputValues;
    onSuccess?: (fields: InventarioCreateFormInputValues) => void;
    onError?: (fields: InventarioCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InventarioCreateFormInputValues) => InventarioCreateFormInputValues;
    onValidate?: InventarioCreateFormValidationValues;
} & React.CSSProperties>;
export default function InventarioCreateForm(props: InventarioCreateFormProps): React.ReactElement;
