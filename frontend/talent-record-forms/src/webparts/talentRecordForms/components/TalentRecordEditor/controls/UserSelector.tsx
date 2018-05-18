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

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }


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


  render() {
    const {fetching, data, value} = this.state;
    return (
      <Select
        size="small"
        mode="multiple"
        labelInValue
        value={value}
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
}
