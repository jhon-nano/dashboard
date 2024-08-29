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
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { Producto } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProductoUpdateForm(props) {
  const {
    id: idProp,
    producto: productoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    codigo: "",
    nombreProducto: "",
    nombreCorto: "",
    iva: "",
    venta: false,
    insumos: false,
    preparacion: false,
    barras: "",
    presentacion: "",
    descripcion: "",
    cambio_precio: false,
    datos_producto: "",
    imagen: "",
    estado: "",
  };
  const [codigo, setCodigo] = React.useState(initialValues.codigo);
  const [nombreProducto, setNombreProducto] = React.useState(
    initialValues.nombreProducto
  );
  const [nombreCorto, setNombreCorto] = React.useState(
    initialValues.nombreCorto
  );
  const [iva, setIva] = React.useState(initialValues.iva);
  const [venta, setVenta] = React.useState(initialValues.venta);
  const [insumos, setInsumos] = React.useState(initialValues.insumos);
  const [preparacion, setPreparacion] = React.useState(
    initialValues.preparacion
  );
  const [barras, setBarras] = React.useState(initialValues.barras);
  const [presentacion, setPresentacion] = React.useState(
    initialValues.presentacion
  );
  const [descripcion, setDescripcion] = React.useState(
    initialValues.descripcion
  );
  const [cambio_precio, setCambio_precio] = React.useState(
    initialValues.cambio_precio
  );
  const [datos_producto, setDatos_producto] = React.useState(
    initialValues.datos_producto
  );
  const [imagen, setImagen] = React.useState(initialValues.imagen);
  const [estado, setEstado] = React.useState(initialValues.estado);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = productoRecord
      ? { ...initialValues, ...productoRecord }
      : initialValues;
    setCodigo(cleanValues.codigo);
    setNombreProducto(cleanValues.nombreProducto);
    setNombreCorto(cleanValues.nombreCorto);
    setIva(cleanValues.iva);
    setVenta(cleanValues.venta);
    setInsumos(cleanValues.insumos);
    setPreparacion(cleanValues.preparacion);
    setBarras(cleanValues.barras);
    setPresentacion(cleanValues.presentacion);
    setDescripcion(cleanValues.descripcion);
    setCambio_precio(cleanValues.cambio_precio);
    setDatos_producto(
      typeof cleanValues.datos_producto === "string" ||
        cleanValues.datos_producto === null
        ? cleanValues.datos_producto
        : JSON.stringify(cleanValues.datos_producto)
    );
    setImagen(cleanValues.imagen);
    setEstado(cleanValues.estado);
    setErrors({});
  };
  const [productoRecord, setProductoRecord] = React.useState(productoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Producto, idProp)
        : productoModelProp;
      setProductoRecord(record);
    };
    queryData();
  }, [idProp, productoModelProp]);
  React.useEffect(resetStateValues, [productoRecord]);
  const validations = {
    codigo: [],
    nombreProducto: [{ type: "Required" }],
    nombreCorto: [],
    iva: [{ type: "Required" }],
    venta: [],
    insumos: [],
    preparacion: [],
    barras: [],
    presentacion: [],
    descripcion: [],
    cambio_precio: [],
    datos_producto: [{ type: "JSON" }],
    imagen: [],
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
          codigo,
          nombreProducto,
          nombreCorto,
          iva,
          venta,
          insumos,
          preparacion,
          barras,
          presentacion,
          descripcion,
          cambio_precio,
          datos_producto,
          imagen,
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
            Producto.copyOf(productoRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ProductoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Codigo"
        isRequired={false}
        isReadOnly={false}
        value={codigo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo: value,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
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
      <TextField
        label="Nombre producto"
        isRequired={true}
        isReadOnly={false}
        value={nombreProducto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto: value,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.nombreProducto ?? value;
          }
          if (errors.nombreProducto?.hasError) {
            runValidationTasks("nombreProducto", value);
          }
          setNombreProducto(value);
        }}
        onBlur={() => runValidationTasks("nombreProducto", nombreProducto)}
        errorMessage={errors.nombreProducto?.errorMessage}
        hasError={errors.nombreProducto?.hasError}
        {...getOverrideProps(overrides, "nombreProducto")}
      ></TextField>
      <TextField
        label="Nombre corto"
        isRequired={false}
        isReadOnly={false}
        value={nombreCorto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto: value,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.nombreCorto ?? value;
          }
          if (errors.nombreCorto?.hasError) {
            runValidationTasks("nombreCorto", value);
          }
          setNombreCorto(value);
        }}
        onBlur={() => runValidationTasks("nombreCorto", nombreCorto)}
        errorMessage={errors.nombreCorto?.errorMessage}
        hasError={errors.nombreCorto?.hasError}
        {...getOverrideProps(overrides, "nombreCorto")}
      ></TextField>
      <TextField
        label="Iva"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={iva}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva: value,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.iva ?? value;
          }
          if (errors.iva?.hasError) {
            runValidationTasks("iva", value);
          }
          setIva(value);
        }}
        onBlur={() => runValidationTasks("iva", iva)}
        errorMessage={errors.iva?.errorMessage}
        hasError={errors.iva?.hasError}
        {...getOverrideProps(overrides, "iva")}
      ></TextField>
      <SwitchField
        label="Venta"
        defaultChecked={false}
        isDisabled={false}
        isChecked={venta}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta: value,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.venta ?? value;
          }
          if (errors.venta?.hasError) {
            runValidationTasks("venta", value);
          }
          setVenta(value);
        }}
        onBlur={() => runValidationTasks("venta", venta)}
        errorMessage={errors.venta?.errorMessage}
        hasError={errors.venta?.hasError}
        {...getOverrideProps(overrides, "venta")}
      ></SwitchField>
      <SwitchField
        label="Insumos"
        defaultChecked={false}
        isDisabled={false}
        isChecked={insumos}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos: value,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.insumos ?? value;
          }
          if (errors.insumos?.hasError) {
            runValidationTasks("insumos", value);
          }
          setInsumos(value);
        }}
        onBlur={() => runValidationTasks("insumos", insumos)}
        errorMessage={errors.insumos?.errorMessage}
        hasError={errors.insumos?.hasError}
        {...getOverrideProps(overrides, "insumos")}
      ></SwitchField>
      <SwitchField
        label="Preparacion"
        defaultChecked={false}
        isDisabled={false}
        isChecked={preparacion}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion: value,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.preparacion ?? value;
          }
          if (errors.preparacion?.hasError) {
            runValidationTasks("preparacion", value);
          }
          setPreparacion(value);
        }}
        onBlur={() => runValidationTasks("preparacion", preparacion)}
        errorMessage={errors.preparacion?.errorMessage}
        hasError={errors.preparacion?.hasError}
        {...getOverrideProps(overrides, "preparacion")}
      ></SwitchField>
      <TextField
        label="Barras"
        isRequired={false}
        isReadOnly={false}
        value={barras}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras: value,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.barras ?? value;
          }
          if (errors.barras?.hasError) {
            runValidationTasks("barras", value);
          }
          setBarras(value);
        }}
        onBlur={() => runValidationTasks("barras", barras)}
        errorMessage={errors.barras?.errorMessage}
        hasError={errors.barras?.hasError}
        {...getOverrideProps(overrides, "barras")}
      ></TextField>
      <TextField
        label="Presentacion"
        isRequired={false}
        isReadOnly={false}
        value={presentacion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion: value,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.presentacion ?? value;
          }
          if (errors.presentacion?.hasError) {
            runValidationTasks("presentacion", value);
          }
          setPresentacion(value);
        }}
        onBlur={() => runValidationTasks("presentacion", presentacion)}
        errorMessage={errors.presentacion?.errorMessage}
        hasError={errors.presentacion?.hasError}
        {...getOverrideProps(overrides, "presentacion")}
      ></TextField>
      <TextField
        label="Descripcion"
        isRequired={false}
        isReadOnly={false}
        value={descripcion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion: value,
              cambio_precio,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.descripcion ?? value;
          }
          if (errors.descripcion?.hasError) {
            runValidationTasks("descripcion", value);
          }
          setDescripcion(value);
        }}
        onBlur={() => runValidationTasks("descripcion", descripcion)}
        errorMessage={errors.descripcion?.errorMessage}
        hasError={errors.descripcion?.hasError}
        {...getOverrideProps(overrides, "descripcion")}
      ></TextField>
      <SwitchField
        label="Cambio precio"
        defaultChecked={false}
        isDisabled={false}
        isChecked={cambio_precio}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio: value,
              datos_producto,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.cambio_precio ?? value;
          }
          if (errors.cambio_precio?.hasError) {
            runValidationTasks("cambio_precio", value);
          }
          setCambio_precio(value);
        }}
        onBlur={() => runValidationTasks("cambio_precio", cambio_precio)}
        errorMessage={errors.cambio_precio?.errorMessage}
        hasError={errors.cambio_precio?.hasError}
        {...getOverrideProps(overrides, "cambio_precio")}
      ></SwitchField>
      <TextAreaField
        label="Datos producto"
        isRequired={false}
        isReadOnly={false}
        value={datos_producto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto: value,
              imagen,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.datos_producto ?? value;
          }
          if (errors.datos_producto?.hasError) {
            runValidationTasks("datos_producto", value);
          }
          setDatos_producto(value);
        }}
        onBlur={() => runValidationTasks("datos_producto", datos_producto)}
        errorMessage={errors.datos_producto?.errorMessage}
        hasError={errors.datos_producto?.hasError}
        {...getOverrideProps(overrides, "datos_producto")}
      ></TextAreaField>
      <TextField
        label="Imagen"
        isRequired={false}
        isReadOnly={false}
        value={imagen}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen: value,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.imagen ?? value;
          }
          if (errors.imagen?.hasError) {
            runValidationTasks("imagen", value);
          }
          setImagen(value);
        }}
        onBlur={() => runValidationTasks("imagen", imagen)}
        errorMessage={errors.imagen?.errorMessage}
        hasError={errors.imagen?.hasError}
        {...getOverrideProps(overrides, "imagen")}
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
              codigo,
              nombreProducto,
              nombreCorto,
              iva,
              venta,
              insumos,
              preparacion,
              barras,
              presentacion,
              descripcion,
              cambio_precio,
              datos_producto,
              imagen,
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
          isDisabled={!(idProp || productoModelProp)}
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
              !(idProp || productoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
