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
import { Inventario } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function InventarioUpdateForm(props) {
  const {
    id: idProp,
    inventario: inventarioModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    inventario: "",
    separado: "",
    costo_promedio: "",
    costo: "",
    precio: "",
    estado: "",
  };
  const [inventario, setInventario] = React.useState(initialValues.inventario);
  const [separado, setSeparado] = React.useState(initialValues.separado);
  const [costo_promedio, setCosto_promedio] = React.useState(
    initialValues.costo_promedio
  );
  const [costo, setCosto] = React.useState(initialValues.costo);
  const [precio, setPrecio] = React.useState(initialValues.precio);
  const [estado, setEstado] = React.useState(initialValues.estado);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = inventarioRecord
      ? { ...initialValues, ...inventarioRecord }
      : initialValues;
    setInventario(cleanValues.inventario);
    setSeparado(cleanValues.separado);
    setCosto_promedio(cleanValues.costo_promedio);
    setCosto(cleanValues.costo);
    setPrecio(cleanValues.precio);
    setEstado(cleanValues.estado);
    setErrors({});
  };
  const [inventarioRecord, setInventarioRecord] =
    React.useState(inventarioModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Inventario, idProp)
        : inventarioModelProp;
      setInventarioRecord(record);
    };
    queryData();
  }, [idProp, inventarioModelProp]);
  React.useEffect(resetStateValues, [inventarioRecord]);
  const validations = {
    inventario: [{ type: "Required" }],
    separado: [{ type: "Required" }],
    costo_promedio: [],
    costo: [{ type: "Required" }],
    precio: [{ type: "Required" }],
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
          inventario,
          separado,
          costo_promedio,
          costo,
          precio,
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
            Inventario.copyOf(inventarioRecord, (updated) => {
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
      {...getOverrideProps(overrides, "InventarioUpdateForm")}
      {...rest}
    >
      <TextField
        label="Inventario"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={inventario}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              inventario: value,
              separado,
              costo_promedio,
              costo,
              precio,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.inventario ?? value;
          }
          if (errors.inventario?.hasError) {
            runValidationTasks("inventario", value);
          }
          setInventario(value);
        }}
        onBlur={() => runValidationTasks("inventario", inventario)}
        errorMessage={errors.inventario?.errorMessage}
        hasError={errors.inventario?.hasError}
        {...getOverrideProps(overrides, "inventario")}
      ></TextField>
      <TextField
        label="Separado"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={separado}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              inventario,
              separado: value,
              costo_promedio,
              costo,
              precio,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.separado ?? value;
          }
          if (errors.separado?.hasError) {
            runValidationTasks("separado", value);
          }
          setSeparado(value);
        }}
        onBlur={() => runValidationTasks("separado", separado)}
        errorMessage={errors.separado?.errorMessage}
        hasError={errors.separado?.hasError}
        {...getOverrideProps(overrides, "separado")}
      ></TextField>
      <TextField
        label="Costo promedio"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={costo_promedio}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              inventario,
              separado,
              costo_promedio: value,
              costo,
              precio,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.costo_promedio ?? value;
          }
          if (errors.costo_promedio?.hasError) {
            runValidationTasks("costo_promedio", value);
          }
          setCosto_promedio(value);
        }}
        onBlur={() => runValidationTasks("costo_promedio", costo_promedio)}
        errorMessage={errors.costo_promedio?.errorMessage}
        hasError={errors.costo_promedio?.hasError}
        {...getOverrideProps(overrides, "costo_promedio")}
      ></TextField>
      <TextField
        label="Costo"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={costo}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              inventario,
              separado,
              costo_promedio,
              costo: value,
              precio,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.costo ?? value;
          }
          if (errors.costo?.hasError) {
            runValidationTasks("costo", value);
          }
          setCosto(value);
        }}
        onBlur={() => runValidationTasks("costo", costo)}
        errorMessage={errors.costo?.errorMessage}
        hasError={errors.costo?.hasError}
        {...getOverrideProps(overrides, "costo")}
      ></TextField>
      <TextField
        label="Precio"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={precio}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              inventario,
              separado,
              costo_promedio,
              costo,
              precio: value,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.precio ?? value;
          }
          if (errors.precio?.hasError) {
            runValidationTasks("precio", value);
          }
          setPrecio(value);
        }}
        onBlur={() => runValidationTasks("precio", precio)}
        errorMessage={errors.precio?.errorMessage}
        hasError={errors.precio?.hasError}
        {...getOverrideProps(overrides, "precio")}
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
              inventario,
              separado,
              costo_promedio,
              costo,
              precio,
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
          isDisabled={!(idProp || inventarioModelProp)}
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
              !(idProp || inventarioModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
