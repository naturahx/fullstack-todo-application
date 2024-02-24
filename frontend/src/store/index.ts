// src/store/index.js
import { legacy_createStore } from "redux";
import dataReducer from "./dataReducer";

const store = legacy_createStore(dataReducer);

export default store;

