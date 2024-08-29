import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers,legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//Reducres
import app from "./reducers/app";
import ajustes from './reducers/ajustes'
import carteras from "./reducers/carteras";
import compras from "./reducers/compras";
import cotizaciones from "./reducers/cotizaciones";
import inventarios from "./reducers/inventarios";
import informes from './reducers/informes';
import pedidos from "./reducers/pedidos";
import pagos from './reducers/pagos'
import productos from "./reducers/productos";
import terceros from "./reducers/terceros";
import usuario from "./reducers/usuario";
import ventas from "./reducers/ventas";

// middleware
const middleware = [thunk];

const combinedReducer = combineReducers({
  app,
  ajustes,
  carteras,
  compras,
  cotizaciones,
  inventarios,
  informes,
  productos,
  pagos,
  pedidos,
  terceros,
  usuario,
  ventas,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.compras) {
      nextState.compras = state.compras;
    } // preserve count value on client side navigation
    if (state.creditos) {
      nextState.creditos = state.creditos;
    } // preserve count value on client side navigation
    if (state.pagos) {
      nextState.pagos = state.pagos;
    } // preserve count value on client side navigation
    if (state.informes) {
      nextState.compras = [];
      nextState.pedidos = [];
    } // preserve count value on client side navigation

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
// creating store
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });
