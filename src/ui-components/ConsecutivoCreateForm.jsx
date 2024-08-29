/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Consecutivo } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ConsecutivoCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    consecutivo: "",
    codigo: "",
  };
  const [consecutivo, setConsecutivo] = React.useState(
    initialValues.consecutivo
  );
  const [codigo, setCodigo] = React.useState(initialValues.codigo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setConsecutivo(initialValues.consecutivo);
    setCodigo(initialValues.codigo);
    setErrors({});
  };
  const validations = {
    consecutivo: [{ type: "Required" }],
    codigo: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          consecutivo,
          codigo,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new Consecutivo(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ConsecutivoCreateForm")}
      {...rest}
    >
      <TextField
        label="Consecutivo"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={consecutivo}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              consecutivo: value,
              codigo,
            };
            const result = onChange(modelFields);
            value = result?.consecutivo ?? value;
          }
          if (errors.consecutivo?.hasError) {
            runValidationTasks("consecutivo", value);
          }
          setConsecutivo(value);
        }}
        onBlur={() => runValidationTasks("consecutivo", consecutivo)}
        errorMessage={errors.consecutivo?.errorMessage}
        hasError={errors.consecutivo?.hasError}
        {...getOverrideProps(overrides, "consecutivo")}
      ></TextField>
      <TextField
        label="Codigo"
        isRequired={false}
        isReadOnly={false}
        value={codigo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              consecutivo,
              codigo: value,
            };
            const result = onChange(modelFields);
            value = result?.codigo ?? value;
          }
          if (errors.codigo?.hasError) {
            runValidationTasks("codigo", value);
          }
          setCodigo(value);
        }}
        onBlur={() => runValidationTasks("codigo", codigo)}
        errorMessage={errors.codigo?.errorMessage}
        hasError={errors.codigo?.hasError}
        {...getOverrideProps(overrides, "codigo")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
