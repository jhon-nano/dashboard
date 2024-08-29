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
import { Tercero } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TerceroCreateForm(props) {
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
    tipo_tercero: "",
    identificacion: "",
    dv: "",
    expedida: "",
    lugar_nacimiento: "",
    fecha_nacimiento: "",
    nombre_completo: "",
    primer_apellido: "",
    segundo_apellido: "",
    primer_nombre: "",
    segundo_nombre: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    correo: "",
    estado: "",
  };
  const [tipo_tercero, setTipo_tercero] = React.useState(
    initialValues.tipo_tercero
  );
  const [identificacion, setIdentificacion] = React.useState(
    initialValues.identificacion
  );
  const [dv, setDv] = React.useState(initialValues.dv);
  const [expedida, setExpedida] = React.useState(initialValues.expedida);
  const [lugar_nacimiento, setLugar_nacimiento] = React.useState(
    initialValues.lugar_nacimiento
  );
  const [fecha_nacimiento, setFecha_nacimiento] = React.useState(
    initialValues.fecha_nacimiento
  );
  const [nombre_completo, setNombre_completo] = React.useState(
    initialValues.nombre_completo
  );
  const [primer_apellido, setPrimer_apellido] = React.useState(
    initialValues.primer_apellido
  );
  const [segundo_apellido, setSegundo_apellido] = React.useState(
    initialValues.segundo_apellido
  );
  const [primer_nombre, setPrimer_nombre] = React.useState(
    initialValues.primer_nombre
  );
  const [segundo_nombre, setSegundo_nombre] = React.useState(
    initialValues.segundo_nombre
  );
  const [direccion, setDireccion] = React.useState(initialValues.direccion);
  const [telefono, setTelefono] = React.useState(initialValues.telefono);
  const [ciudad, setCiudad] = React.useState(initialValues.ciudad);
  const [correo, setCorreo] = React.useState(initialValues.correo);
  const [estado, setEstado] = React.useState(initialValues.estado);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTipo_tercero(initialValues.tipo_tercero);
    setIdentificacion(initialValues.identificacion);
    setDv(initialValues.dv);
    setExpedida(initialValues.expedida);
    setLugar_nacimiento(initialValues.lugar_nacimiento);
    setFecha_nacimiento(initialValues.fecha_nacimiento);
    setNombre_completo(initialValues.nombre_completo);
    setPrimer_apellido(initialValues.primer_apellido);
    setSegundo_apellido(initialValues.segundo_apellido);
    setPrimer_nombre(initialValues.primer_nombre);
    setSegundo_nombre(initialValues.segundo_nombre);
    setDireccion(initialValues.direccion);
    setTelefono(initialValues.telefono);
    setCiudad(initialValues.ciudad);
    setCorreo(initialValues.correo);
    setEstado(initialValues.estado);
    setErrors({});
  };
  const validations = {
    tipo_tercero: [{ type: "Required" }],
    identificacion: [{ type: "Required" }],
    dv: [],
    expedida: [],
    lugar_nacimiento: [],
    fecha_nacimiento: [],
    nombre_completo: [{ type: "Required" }],
    primer_apellido: [],
    segundo_apellido: [],
    primer_nombre: [],
    segundo_nombre: [],
    direccion: [],
    telefono: [],
    ciudad: [],
    correo: [],
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
          tipo_tercero,
          identificacion,
          dv,
          expedida,
          lugar_nacimiento,
          fecha_nacimiento,
          nombre_completo,
          primer_apellido,
          segundo_apellido,
          primer_nombre,
          segundo_nombre,
          direccion,
          telefono,
          ciudad,
          correo,
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
          await DataStore.save(new Tercero(modelFields));
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
      {...getOverrideProps(overrides, "TerceroCreateForm")}
      {...rest}
    >
      <SelectField
        label="Tipo tercero"
        placeholder="Please select an option"
        isDisabled={false}
        value={tipo_tercero}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero: value,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.tipo_tercero ?? value;
          }
          if (errors.tipo_tercero?.hasError) {
            runValidationTasks("tipo_tercero", value);
          }
          setTipo_tercero(value);
        }}
        onBlur={() => runValidationTasks("tipo_tercero", tipo_tercero)}
        errorMessage={errors.tipo_tercero?.errorMessage}
        hasError={errors.tipo_tercero?.hasError}
        {...getOverrideProps(overrides, "tipo_tercero")}
      >
        <option
          children="Cc"
          value="CC"
          {...getOverrideProps(overrides, "tipo_tercerooption0")}
        ></option>
        <option
          children="Nit"
          value="NIT"
          {...getOverrideProps(overrides, "tipo_tercerooption1")}
        ></option>
        <option
          children="Ti"
          value="TI"
          {...getOverrideProps(overrides, "tipo_tercerooption2")}
        ></option>
        <option
          children="Pasaporte"
          value="PASAPORTE"
          {...getOverrideProps(overrides, "tipo_tercerooption3")}
        ></option>
        <option
          children="Ce"
          value="CE"
          {...getOverrideProps(overrides, "tipo_tercerooption4")}
        ></option>
      </SelectField>
      <TextField
        label="Identificacion"
        isRequired={true}
        isReadOnly={false}
        value={identificacion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion: value,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.identificacion ?? value;
          }
          if (errors.identificacion?.hasError) {
            runValidationTasks("identificacion", value);
          }
          setIdentificacion(value);
        }}
        onBlur={() => runValidationTasks("identificacion", identificacion)}
        errorMessage={errors.identificacion?.errorMessage}
        hasError={errors.identificacion?.hasError}
        {...getOverrideProps(overrides, "identificacion")}
      ></TextField>
      <TextField
        label="Dv"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={dv}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv: value,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.dv ?? value;
          }
          if (errors.dv?.hasError) {
            runValidationTasks("dv", value);
          }
          setDv(value);
        }}
        onBlur={() => runValidationTasks("dv", dv)}
        errorMessage={errors.dv?.errorMessage}
        hasError={errors.dv?.hasError}
        {...getOverrideProps(overrides, "dv")}
      ></TextField>
      <TextField
        label="Expedida"
        isRequired={false}
        isReadOnly={false}
        value={expedida}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida: value,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.expedida ?? value;
          }
          if (errors.expedida?.hasError) {
            runValidationTasks("expedida", value);
          }
          setExpedida(value);
        }}
        onBlur={() => runValidationTasks("expedida", expedida)}
        errorMessage={errors.expedida?.errorMessage}
        hasError={errors.expedida?.hasError}
        {...getOverrideProps(overrides, "expedida")}
      ></TextField>
      <TextField
        label="Lugar nacimiento"
        isRequired={false}
        isReadOnly={false}
        value={lugar_nacimiento}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento: value,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.lugar_nacimiento ?? value;
          }
          if (errors.lugar_nacimiento?.hasError) {
            runValidationTasks("lugar_nacimiento", value);
          }
          setLugar_nacimiento(value);
        }}
        onBlur={() => runValidationTasks("lugar_nacimiento", lugar_nacimiento)}
        errorMessage={errors.lugar_nacimiento?.errorMessage}
        hasError={errors.lugar_nacimiento?.hasError}
        {...getOverrideProps(overrides, "lugar_nacimiento")}
      ></TextField>
      <TextField
        label="Fecha nacimiento"
        isRequired={false}
        isReadOnly={false}
        value={fecha_nacimiento}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento: value,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.fecha_nacimiento ?? value;
          }
          if (errors.fecha_nacimiento?.hasError) {
            runValidationTasks("fecha_nacimiento", value);
          }
          setFecha_nacimiento(value);
        }}
        onBlur={() => runValidationTasks("fecha_nacimiento", fecha_nacimiento)}
        errorMessage={errors.fecha_nacimiento?.errorMessage}
        hasError={errors.fecha_nacimiento?.hasError}
        {...getOverrideProps(overrides, "fecha_nacimiento")}
      ></TextField>
      <TextField
        label="Nombre completo"
        isRequired={true}
        isReadOnly={false}
        value={nombre_completo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo: value,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.nombre_completo ?? value;
          }
          if (errors.nombre_completo?.hasError) {
            runValidationTasks("nombre_completo", value);
          }
          setNombre_completo(value);
        }}
        onBlur={() => runValidationTasks("nombre_completo", nombre_completo)}
        errorMessage={errors.nombre_completo?.errorMessage}
        hasError={errors.nombre_completo?.hasError}
        {...getOverrideProps(overrides, "nombre_completo")}
      ></TextField>
      <TextField
        label="Primer apellido"
        isRequired={false}
        isReadOnly={false}
        value={primer_apellido}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido: value,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.primer_apellido ?? value;
          }
          if (errors.primer_apellido?.hasError) {
            runValidationTasks("primer_apellido", value);
          }
          setPrimer_apellido(value);
        }}
        onBlur={() => runValidationTasks("primer_apellido", primer_apellido)}
        errorMessage={errors.primer_apellido?.errorMessage}
        hasError={errors.primer_apellido?.hasError}
        {...getOverrideProps(overrides, "primer_apellido")}
      ></TextField>
      <TextField
        label="Segundo apellido"
        isRequired={false}
        isReadOnly={false}
        value={segundo_apellido}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido: value,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.segundo_apellido ?? value;
          }
          if (errors.segundo_apellido?.hasError) {
            runValidationTasks("segundo_apellido", value);
          }
          setSegundo_apellido(value);
        }}
        onBlur={() => runValidationTasks("segundo_apellido", segundo_apellido)}
        errorMessage={errors.segundo_apellido?.errorMessage}
        hasError={errors.segundo_apellido?.hasError}
        {...getOverrideProps(overrides, "segundo_apellido")}
      ></TextField>
      <TextField
        label="Primer nombre"
        isRequired={false}
        isReadOnly={false}
        value={primer_nombre}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre: value,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.primer_nombre ?? value;
          }
          if (errors.primer_nombre?.hasError) {
            runValidationTasks("primer_nombre", value);
          }
          setPrimer_nombre(value);
        }}
        onBlur={() => runValidationTasks("primer_nombre", primer_nombre)}
        errorMessage={errors.primer_nombre?.errorMessage}
        hasError={errors.primer_nombre?.hasError}
        {...getOverrideProps(overrides, "primer_nombre")}
      ></TextField>
      <TextField
        label="Segundo nombre"
        isRequired={false}
        isReadOnly={false}
        value={segundo_nombre}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre: value,
              direccion,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.segundo_nombre ?? value;
          }
          if (errors.segundo_nombre?.hasError) {
            runValidationTasks("segundo_nombre", value);
          }
          setSegundo_nombre(value);
        }}
        onBlur={() => runValidationTasks("segundo_nombre", segundo_nombre)}
        errorMessage={errors.segundo_nombre?.errorMessage}
        hasError={errors.segundo_nombre?.hasError}
        {...getOverrideProps(overrides, "segundo_nombre")}
      ></TextField>
      <TextField
        label="Direccion"
        isRequired={false}
        isReadOnly={false}
        value={direccion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion: value,
              telefono,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.direccion ?? value;
          }
          if (errors.direccion?.hasError) {
            runValidationTasks("direccion", value);
          }
          setDireccion(value);
        }}
        onBlur={() => runValidationTasks("direccion", direccion)}
        errorMessage={errors.direccion?.errorMessage}
        hasError={errors.direccion?.hasError}
        {...getOverrideProps(overrides, "direccion")}
      ></TextField>
      <TextField
        label="Telefono"
        isRequired={false}
        isReadOnly={false}
        value={telefono}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono: value,
              ciudad,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.telefono ?? value;
          }
          if (errors.telefono?.hasError) {
            runValidationTasks("telefono", value);
          }
          setTelefono(value);
        }}
        onBlur={() => runValidationTasks("telefono", telefono)}
        errorMessage={errors.telefono?.errorMessage}
        hasError={errors.telefono?.hasError}
        {...getOverrideProps(overrides, "telefono")}
      ></TextField>
      <TextField
        label="Ciudad"
        isRequired={false}
        isReadOnly={false}
        value={ciudad}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad: value,
              correo,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.ciudad ?? value;
          }
          if (errors.ciudad?.hasError) {
            runValidationTasks("ciudad", value);
          }
          setCiudad(value);
        }}
        onBlur={() => runValidationTasks("ciudad", ciudad)}
        errorMessage={errors.ciudad?.errorMessage}
        hasError={errors.ciudad?.hasError}
        {...getOverrideProps(overrides, "ciudad")}
      ></TextField>
      <TextField
        label="Correo"
        isRequired={false}
        isReadOnly={false}
        value={correo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo: value,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.correo ?? value;
          }
          if (errors.correo?.hasError) {
            runValidationTasks("correo", value);
          }
          setCorreo(value);
        }}
        onBlur={() => runValidationTasks("correo", correo)}
        errorMessage={errors.correo?.errorMessage}
        hasError={errors.correo?.hasError}
        {...getOverrideProps(overrides, "correo")}
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
              tipo_tercero,
              identificacion,
              dv,
              expedida,
              lugar_nacimiento,
              fecha_nacimiento,
              nombre_completo,
              primer_apellido,
              segundo_apellido,
              primer_nombre,
              segundo_nombre,
              direccion,
              telefono,
              ciudad,
              correo,
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
