import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Version} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TalentRecordTimeLineWebPartStrings';
import TalentRecordTimeLine from './components/TalentRecordTimeLine';
import {ITalentRecordTimeLineProps} from './components/ITalentRecordTimeLineProps';


export interface ITalentRecordTimeLineWebPartProps {
  description: string;
}

export default class TalentRecordTimeLineWebPart extends BaseClientSideWebPart<ITalentRecordTimeLineWebPartProps> {


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public render(): void {
    const element: React.ReactElement<ITalentRecordTimeLineProps> = React.createElement(
      TalentRecordTimeLine,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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
