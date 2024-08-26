import { Config } from "./interface";

export enum ConfigActionTypes {
    GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS'
}

interface GetConfigSuccessAction {
    type: typeof ConfigActionTypes.GET_CONFIG_SUCCESS;
    payload: Config;
  }

export type ConfigActions =
    GetConfigSuccessAction;