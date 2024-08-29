/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps } from "@aws-amplify/ui-react";
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
export declare type ModuloUserAlmacenesCreateFormInputValues = {
    estado?: string;
};
export declare type ModuloUserAlmacenesCreateFormValidationValues = {
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModuloUserAlmacenesCreateFormOverridesProps = {
    ModuloUserAlmacenesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ModuloUserAlmacenesCreateFormProps = React.PropsWithChildren<{
    overrides?: ModuloUserAlmacenesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ModuloUserAlmacenesCreateFormInputValues) => ModuloUserAlmacenesCreateFormInputValues;
    onSuccess?: (fields: ModuloUserAlmacenesCreateFormInputValues) => void;
    onError?: (fields: ModuloUserAlmacenesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModuloUserAlmacenesCreateFormInputValues) => ModuloUserAlmacenesCreateFormInputValues;
    onValidate?: ModuloUserAlmacenesCreateFormValidationValues;
} & React.CSSProperties>;
export default function ModuloUserAlmacenesCreateForm(props: ModuloUserAlmacenesCreateFormProps): React.ReactElement;
