import {types, IModelType} from "mobx-state-tree";

export type __IModelType = IModelType<any, any>;

export const LookupDataModel = types.model({
  value: types.identifier(types.string),
  label: types.string
});

export type LookupDataModel = typeof LookupDataModel.Type;
