import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Version} from '@microsoft/sp-core-library';
import pnp from "sp-pnp-js";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TalentRecordFormsWebPartStrings';
import WrappedForm from './components/TalentRecordEditor/TalentRecordEditor';
import {ITalentRecordEditorProps} from './components/TalentRecordEditor/ITalentRecordEditorProps';
import {Form} from "antd";
import 'antd/dist/antd.less';
import {Provider} from "mobx-react";
import {AppStore} from "../../stores/AppStore";
import {onAction, onPatch, onSnapshot} from "mobx-state-tree";

export interface ITalentRecordFormsWebPartProps {
  description: string;
}

export default class TalentRecordFormsWebPart extends BaseClientSideWebPart<ITalentRecordFormsWebPartProps> {

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const appStore = AppStore.create({});
    onPatch(appStore.Talent,
      patch => {
        console.log(patch)
      });

    onAction(appStore, (call) => {

    })
    //Todo : refactor the code that calculates the web part mode

    ReactDom.render(<Provider store={appStore} context={this.context}><WrappedForm/></Provider>, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
