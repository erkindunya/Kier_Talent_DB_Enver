import {types, IModelType} from "mobx-state-tree";
import {Node} from "webpack";

export type __IModelType = IModelType<any, any>;

export const LookupDataModel = types.model({
  value: types.identifier(types.string),
  label: types.string
});


interface INode {
  value: string;
  label: string;
  children: INode[]
}

export const NestedLookupDataModel: IModelType<Partial<INode>, INode> = types.model({
  value: types.string,
  label: types.string,
  children: types.optional(types.array(types.late(() => NestedLookupDataModel)), [])
})


export type LookupDataModel = typeof LookupDataModel.Type;
export type NestedLookupDataModel = typeof NestedLookupDataModel.Type;
