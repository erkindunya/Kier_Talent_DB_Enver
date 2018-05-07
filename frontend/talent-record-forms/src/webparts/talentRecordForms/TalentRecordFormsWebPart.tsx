import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Version} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TalentRecordFormsWebPartStrings';
import WrappedForm from './components/TalentRecordEditor/TalentRecordEditor';
import {ITalentRecordEditorProps} from './components/TalentRecordEditor/ITalentRecordEditorProps';
import {Form} from "antd";
import 'antd/dist/antd.css';
import {Provider} from "mobx-react";
import {AppStore} from "../../stores/AppStore";

export interface ITalentRecordFormsWebPartProps {
  description: string;
}

export default class TalentRecordFormsWebPart extends BaseClientSideWebPart<ITalentRecordFormsWebPartProps> {

  public render(): void {

    const element = React.createElement(WrappedForm);
    const appStore = AppStore.create({});
    ReactDom.render(<Provider store={appStore}><WrappedForm/></Provider>, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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