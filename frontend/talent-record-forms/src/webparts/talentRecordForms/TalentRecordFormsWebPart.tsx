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
import 'antd/dist/antd.less';
import {Provider} from "mobx-react";
import {AppStore} from "../../stores/AppStore";

export interface ITalentRecordFormsWebPartProps {
  description: string;
}

export default class TalentRecordFormsWebPart extends BaseClientSideWebPart<ITalentRecordFormsWebPartProps> {

  public render(): void {
    const appStore = AppStore.create({});

    let url = new URL(window.location.href);
    if (url.searchParams.has("talentId")) {
      console.log("Talent Id " + url.searchParams.get("talentId"));
      appStore.TalentDataStore.GetTalentById(parseInt(url.searchParams.get("talentId")));
    }
    else {
      //appStore.TalentDataStore.Talent = Talent.create({});
    }

    ReactDom.render(<Provider store={appStore} context={this.context}><WrappedForm/></Provider>, this.domElement);
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
