import * as React from 'react';

import {inject, observer} from "mobx-react";
import UserRemoteSelect from "./UserSelector";
import {Input} from 'antd';

@inject("store", "context")
@observer
class ManagerName extends React.Component<any, any> {

  render() {

    /* const options = (this.props.store.ViewStore.isEditing && this.props.store.Talent.Manager.value=="")?{
       initialValue: this.props.store.Talent.ManagerName,
       rules: [{required: true, message: this.props.validationMessage}]
     } : {
       rules: [{required: true, message: this.props.validationMessage}]
     }*/


    const options = {
      initialValue: this.props.store.Talent.ManagerName,
      rules: [{required: this.props.required, pattern: "\\w+,\\s{1}\\w+", message: this.props.validationMessage}]
    }

    /*
    if in Edit mode & Account is linked --> Show People Picker
    if in New mode --> Show People Picker
    if in Edit and account is not linked --> Show Free text field
    * */
    /*const element = (this.props.store.ViewStore.isEditing && this.props.item.value=="")?this.props.form.getFieldDecorator(this.props.controlId, options)(<Input id={this.props.controlId} size="small"  placeholder="Manager Name" disabled={this.props.disabled}/>) : <UserRemoteSelect changed={this.props.changed} item={this.props.store.Talent.Manager}    validationMessage={this.props.validationMessage}   form={this.props.form}    controlId={this.props.controlId}    disabled = {this.props.store.IsSubmittingData}/>*/

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(<Input id={this.props.controlId}
                                                                                            size="small"
                                                                                            placeholder="Surname, Forename"
                                                                                            disabled={this.props.disabled}
                                                                                            onChange={e => this.props.changed(e.target.value)}/>);


    return (element);
  }
}


export default ManagerName;



