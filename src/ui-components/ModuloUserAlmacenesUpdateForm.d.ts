/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps } from "@aws-amplify/ui-react";
import { ModuloUserAlmacenes } from "../models";
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
export declare type ModuloUserAlmacenesUpdateFormInputValues = {
    estado?: string;
};
export declare type ModuloUserAlmacenesUpdateFormValidationValues = {
    estado?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModuloUserAlmacenesUpdateFormOverridesProps = {
    ModuloUserAlmacenesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    estado?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ModuloUserAlmacenesUpdateFormProps = React.PropsWithChildren<{
    overrides?: ModuloUserAlmacenesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    moduloUserAlmacenes?: ModuloUserAlmacenes;
    onSubmit?: (fields: ModuloUserAlmacenesUpdateFormInputValues) => ModuloUserAlmacenesUpdateFormInputValues;
    onSuccess?: (fields: ModuloUserAlmacenesUpdateFormInputValues) => void;
    onError?: (fields: ModuloUserAlmacenesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModuloUserAlmacenesUpdateFormInputValues) => ModuloUserAlmacenesUpdateFormInputValues;
    onValidate?: ModuloUserAlmacenesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ModuloUserAlmacenesUpdateForm(props: ModuloUserAlmacenesUpdateFormProps): React.ReactElement;
