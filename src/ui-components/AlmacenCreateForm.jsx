/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Almacen } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function AlmacenCreateForm(props) {
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
    codigo: "",
    nit: "",
    nombreAlmacen: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    secciones: [],
    estantes: [],
    niveles: [],
    cajas: [],
    estado: "",
  };
  const [codigo, setCodigo] = React.useState(initialValues.codigo);
  const [nit, setNit] = React.useState(initialValues.nit);
  const [nombreAlmacen, setNombreAlmacen] = React.useState(
    initialValues.nombreAlmacen
  );
  const [direccion, setDireccion] = React.useState(initialValues.direccion);
  const [ciudad, setCiudad] = React.useState(initialValues.ciudad);
  const [telefono, setTelefono] = React.useState(initialValues.telefono);
  const [secciones, setSecciones] = React.useState(initialValues.secciones);
  const [estantes, setEstantes] = React.useState(initialValues.estantes);
  const [niveles, setNiveles] = React.useState(initialValues.niveles);
  const [cajas, setCajas] = React.useState(initialValues.cajas);
  const [estado, setEstado] = React.useState(initialValues.estado);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCodigo(initialValues.codigo);
    setNit(initialValues.nit);
    setNombreAlmacen(initialValues.nombreAlmacen);
    setDireccion(initialValues.direccion);
    setCiudad(initialValues.ciudad);
    setTelefono(initialValues.telefono);
    setSecciones(initialValues.secciones);
    setCurrentSeccionesValue("");
    setEstantes(initialValues.estantes);
    setCurrentEstantesValue("");
    setNiveles(initialValues.niveles);
    setCurrentNivelesValue("");
    setCajas(initialValues.cajas);
    setCurrentCajasValue("");
    setEstado(initialValues.estado);
    setErrors({});
  };
  const [currentSeccionesValue, setCurrentSeccionesValue] = React.useState("");
  const seccionesRef = React.createRef();
  const [currentEstantesValue, setCurrentEstantesValue] = React.useState("");
  const estantesRef = React.createRef();
  const [currentNivelesValue, setCurrentNivelesValue] = React.useState("");
  const nivelesRef = React.createRef();
  const [currentCajasValue, setCurrentCajasValue] = React.useState("");
  const cajasRef = React.createRef();
  const validations = {
    codigo: [],
    nit: [],
    nombreAlmacen: [{ type: "Required" }],
    direccion: [],
    ciudad: [],
    telefono: [],
    secciones: [],
    estantes: [],
    niveles: [],
    cajas: [],
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
          nit,
          nombreAlmacen,
          direccion,
          ciudad,
          telefono,
          secciones,
          estantes,
          niveles,
          cajas,
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
          await DataStore.save(new Almacen(modelFields));
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
      {...getOverrideProps(overrides, "AlmacenCreateForm")}
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
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas,
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
        label="Nit"
        isRequired={false}
        isReadOnly={false}
        value={nit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nit: value,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.nit ?? value;
          }
          if (errors.nit?.hasError) {
            runValidationTasks("nit", value);
          }
          setNit(value);
        }}
        onBlur={() => runValidationTasks("nit", nit)}
        errorMessage={errors.nit?.errorMessage}
        hasError={errors.nit?.hasError}
        {...getOverrideProps(overrides, "nit")}
      ></TextField>
      <TextField
        label="Nombre almacen"
        isRequired={true}
        isReadOnly={false}
        value={nombreAlmacen}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen: value,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas,
              estado,
            };
            const result = onChange(modelFields);
            value = result?.nombreAlmacen ?? value;
          }
          if (errors.nombreAlmacen?.hasError) {
            runValidationTasks("nombreAlmacen", value);
          }
          setNombreAlmacen(value);
        }}
        onBlur={() => runValidationTasks("nombreAlmacen", nombreAlmacen)}
        errorMessage={errors.nombreAlmacen?.errorMessage}
        hasError={errors.nombreAlmacen?.hasError}
        {...getOverrideProps(overrides, "nombreAlmacen")}
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
              codigo,
              nit,
              nombreAlmacen,
              direccion: value,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas,
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
        label="Ciudad"
        isRequired={false}
        isReadOnly={false}
        value={ciudad}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen,
              direccion,
              ciudad: value,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas,
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
        label="Telefono"
        isRequired={false}
        isReadOnly={false}
        value={telefono}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono: value,
              secciones,
              estantes,
              niveles,
              cajas,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones: values,
              estantes,
              niveles,
              cajas,
              estado,
            };
            const result = onChange(modelFields);
            values = result?.secciones ?? values;
          }
          setSecciones(values);
          setCurrentSeccionesValue("");
        }}
        currentFieldValue={currentSeccionesValue}
        label={"Secciones"}
        items={secciones}
        hasError={errors?.secciones?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("secciones", currentSeccionesValue)
        }
        errorMessage={errors?.secciones?.errorMessage}
        setFieldValue={setCurrentSeccionesValue}
        inputFieldRef={seccionesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Secciones"
          isRequired={false}
          isReadOnly={false}
          value={currentSeccionesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.secciones?.hasError) {
              runValidationTasks("secciones", value);
            }
            setCurrentSeccionesValue(value);
          }}
          onBlur={() => runValidationTasks("secciones", currentSeccionesValue)}
          errorMessage={errors.secciones?.errorMessage}
          hasError={errors.secciones?.hasError}
          ref={seccionesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "secciones")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes: values,
              niveles,
              cajas,
              estado,
            };
            const result = onChange(modelFields);
            values = result?.estantes ?? values;
          }
          setEstantes(values);
          setCurrentEstantesValue("");
        }}
        currentFieldValue={currentEstantesValue}
        label={"Estantes"}
        items={estantes}
        hasError={errors?.estantes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("estantes", currentEstantesValue)
        }
        errorMessage={errors?.estantes?.errorMessage}
        setFieldValue={setCurrentEstantesValue}
        inputFieldRef={estantesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Estantes"
          isRequired={false}
          isReadOnly={false}
          value={currentEstantesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.estantes?.hasError) {
              runValidationTasks("estantes", value);
            }
            setCurrentEstantesValue(value);
          }}
          onBlur={() => runValidationTasks("estantes", currentEstantesValue)}
          errorMessage={errors.estantes?.errorMessage}
          hasError={errors.estantes?.hasError}
          ref={estantesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "estantes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles: values,
              cajas,
              estado,
            };
            const result = onChange(modelFields);
            values = result?.niveles ?? values;
          }
          setNiveles(values);
          setCurrentNivelesValue("");
        }}
        currentFieldValue={currentNivelesValue}
        label={"Niveles"}
        items={niveles}
        hasError={errors?.niveles?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("niveles", currentNivelesValue)
        }
        errorMessage={errors?.niveles?.errorMessage}
        setFieldValue={setCurrentNivelesValue}
        inputFieldRef={nivelesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Niveles"
          isRequired={false}
          isReadOnly={false}
          value={currentNivelesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.niveles?.hasError) {
              runValidationTasks("niveles", value);
            }
            setCurrentNivelesValue(value);
          }}
          onBlur={() => runValidationTasks("niveles", currentNivelesValue)}
          errorMessage={errors.niveles?.errorMessage}
          hasError={errors.niveles?.hasError}
          ref={nivelesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "niveles")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              codigo,
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas: values,
              estado,
            };
            const result = onChange(modelFields);
            values = result?.cajas ?? values;
          }
          setCajas(values);
          setCurrentCajasValue("");
        }}
        currentFieldValue={currentCajasValue}
        label={"Cajas"}
        items={cajas}
        hasError={errors?.cajas?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("cajas", currentCajasValue)
        }
        errorMessage={errors?.cajas?.errorMessage}
        setFieldValue={setCurrentCajasValue}
        inputFieldRef={cajasRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Cajas"
          isRequired={false}
          isReadOnly={false}
          value={currentCajasValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.cajas?.hasError) {
              runValidationTasks("cajas", value);
            }
            setCurrentCajasValue(value);
          }}
          onBlur={() => runValidationTasks("cajas", currentCajasValue)}
          errorMessage={errors.cajas?.errorMessage}
          hasError={errors.cajas?.hasError}
          ref={cajasRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "cajas")}
        ></TextField>
      </ArrayField>
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
              nit,
              nombreAlmacen,
              direccion,
              ciudad,
              telefono,
              secciones,
              estantes,
              niveles,
              cajas,
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
