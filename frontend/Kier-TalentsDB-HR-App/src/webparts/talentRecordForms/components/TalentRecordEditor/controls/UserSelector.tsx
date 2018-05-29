import {Icon, Select, Spin} from 'antd';
import {debounce} from 'lodash';

const Option = Select.Option;
import * as React from 'react';
import {SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration, ISPHttpClientOptions} from '@microsoft/sp-http';
import {inject, observer} from "mobx-react";

import pnp, {ClientPeoplePickerQueryParameters} from "sp-pnp-js";

@inject("store", "context")
@observer
export default class UserRemoteSelect extends React.Component<any, any> {
  lastFetchId: any;
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  fetchUser = (value) => {

    const opt: ClientPeoplePickerQueryParameters = {
      AllowEmailAddresses: true,
      MaximumEntitySuggestions: 10,
      PrincipalSource: 15,
      PrincipalType: 15,
      QueryString: value
    }

    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({data: [], fetching: true});
    pnp.sp.profiles.clientPeoplePickerSearchUser(opt).then(response => {
      if (fetchId !== this.lastFetchId) { // for fetch callback order
        return;
      }
      const data = response.map((user) => ({
        text: user.DisplayText,
        value: user.Key
      }));
      this.setState({data, fetching: false})
    });
  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
    (value.length >= 1) ? this.props.changed(value[0].key) : "";
  }

  buildPeoplePicker = () => {
    const {fetching, data, value} = this.state;
    return (
      <Select
        size="small"
        mode="multiple"
        labelInValue
        placeholder="Select user"
        notFoundContent={fetching ? <Spin size="small"/> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{width: '100%'}}

      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>
    );
  }

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    //Todo: write more robust condition test
    if (this.props.item.value !== "") {
      this.state = {
        data: [this.props.item],
        value: [{key: this.props.item.value}],
        fetching: false
      }
    }

  }

  render() {
    console.log("UserSelector: " + this.props.item);
    let initialValue = (this.props.item) ? {key: this.props.item.value} : {};

    const options = (this.props.item) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildPeoplePicker());
    return element;
  }
}
