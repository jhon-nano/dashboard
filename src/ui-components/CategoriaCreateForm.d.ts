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
export declare type CategoriaCreateFormInputValues = {
    nombreCategoria?: string;
    estado?: string;
};
export declare type CategoriaCreateFormValidationValues = {
    nombreCategoria?: ValidationFunction<string>;
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CategoriaCreateFormOverridesProps = {
    CategoriaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombreCategoria?: PrimitiveOverrideProps<TextFieldProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type CategoriaCreateFormProps = React.PropsWithChildren<{
    overrides?: CategoriaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CategoriaCreateFormInputValues) => CategoriaCreateFormInputValues;
    onSuccess?: (fields: CategoriaCreateFormInputValues) => void;
    onError?: (fields: CategoriaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CategoriaCreateFormInputValues) => CategoriaCreateFormInputValues;
    onValidate?: CategoriaCreateFormValidationValues;
} & React.CSSProperties>;
export default function CategoriaCreateForm(props: CategoriaCreateFormProps): React.ReactElement;
