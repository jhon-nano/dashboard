/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { Marca } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MarcaUpdateForm(props) {
  const {
    id: idProp,
    marca: marcaModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    nombreMarca: "",
    estado: "",
  };
  const [nombreMarca, setNombreMarca] = React.useState(
    initialValues.nombreMarca
  );
  const [estado, setEstado] = React.useState(initialValues.estado);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = marcaRecord
      ? { ...initialValues, ...marcaRecord }
      : initialValues;
    setNombreMarca(cleanValues.nombreMarca);
    setEstado(cleanValues.estado);
    setErrors({});
  };
  const [marcaRecord, setMarcaRecord] = React.useState(marcaModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Marca, idProp)
        : marcaModelProp;
      setMarcaRecord(record);
    };
    queryData();
  }, [idProp, marcaModelProp]);
  React.useEffect(resetStateValues, [marcaRecord]);
  const validations = {
    nombreMarca: [],
    estado: [],
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
          nombreMarca,
          estado,
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
          await DataStore.save(
            Marca.copyOf(marcaRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "MarcaUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nombre marca"
        isRequired={false}
        isReadOnly={false}
        value={nombreMarca}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nombreMarca: value,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.nombreMarca ?? value;
          }
          if (errors.nombreMarca?.hasError) {
            runValidationTasks("nombreMarca", value);
          }
          setNombreMarca(value);
        }}
        onBlur={() => runValidationTasks("nombreMarca", nombreMarca)}
        errorMessage={errors.nombreMarca?.errorMessage}
        hasError={errors.nombreMarca?.hasError}
        {...getOverrideProps(overrides, "nombreMarca")}
      ></TextField>
      <SelectField
        label="Estado"
        placeholder="Please select an option"
        isDisabled={false}
        value={estado}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              nombreMarca,
              estado: value,
            };
            const result = onChange(modelFields);
            value = result?.estado ?? value;
          }
          if (errors.estado?.hasError) {
            runValidationTasks("estado", value);
          }
          setEstado(value);
        }}
        onBlur={() => runValidationTasks("estado", estado)}
        errorMessage={errors.estado?.errorMessage}
        hasError={errors.estado?.hasError}
        {...getOverrideProps(overrides, "estado")}
      >
        <option
          children="Activo"
          value="ACTIVO"
          {...getOverrideProps(overrides, "estadooption0")}
        ></option>
        <option
          children="Inactivo"
          value="INACTIVO"
          {...getOverrideProps(overrides, "estadooption1")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || marcaModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || marcaModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
