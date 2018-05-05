import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TalentRecordFormsWebPartStrings';
import WrappedForm from './components/TalentRecordForms';
import { ITalentRecordFormsProps } from './components/ITalentRecordFormsProps';
import {Form} from "antd";
import 'antd/dist/antd.css';

export interface ITalentRecordFormsWebPartProps {
  description: string;
}

export default class TalentRecordFormsWebPart extends BaseClientSideWebPart<ITalentRecordFormsWebPartProps> {

  public render(): void {

    const element = React.createElement(WrappedForm);
    /*const element: React.ReactElement<ITalentRecordFormsProps > = React.createElement(
      TalentRecordForms,
      {
        description: this.properties.description
      }
    );*/

    ReactDom.render(element, this.domElement);
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
