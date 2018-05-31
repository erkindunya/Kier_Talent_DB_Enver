import {override} from '@microsoft/decorators';
import {Log} from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import {Dialog} from '@microsoft/sp-dialog';
import * as strings from 'TalentPortalCommandSetCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITalentPortalCommandSetCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'TalentPortalCommandSetCommandSet';

export default class TalentPortalCommandSetCommandSet extends BaseListViewCommandSet<ITalentPortalCommandSetCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized TalentPortalCommandSetCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('Edit_TALENT_RECORD');
    Log.info(LOG_SOURCE, JSON.stringify(event));
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'Edit_TALENT_RECORD':
        //get record id & employee Id
        //redirect to Talent Record Editor
        var employeeId = event.selectedRows[0].getValueByName("KTPEmployeeID");
        var recordId = event.selectedRows[0].getValueByName("ID");
        var url = "/sites/talent/SitePages/TalentEditor.aspx?talentId=" + recordId + "&employeeId=" + employeeId;
        window.location.href = url;
        break;
      case 'NEW_TALENT_RECORD':
        var url = "/sites/talent/SitePages/TalentEditor.aspx";
        window.location.href = url;
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
