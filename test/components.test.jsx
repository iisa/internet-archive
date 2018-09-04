import React from 'react';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import {Breadcrumbs, MetaDataDetails} from '../src/components/components';

describe('<MetaDataDetails/>', () => {
  it('displays all metadata contents', () => {
    const meta = { hello: 'there', it: 'is', me: 'you'};
    const wrapper = shallow(<MetaDataDetails />);
    wrapper.setProps(meta);
    expect( wrapper.find('p').length).to.equal(Object.keys(meta).length);
  });
});

describe('<Breadcrumbs />', () => {
  it('returns safely when no props are passed', () => {
    const wrapper = shallow(<Breadcrumbs />);
    expect(wrapper.props().info).to.equal(undefined);
    wrapper.setProps({info: undefined});
    expect(wrapper.find('#breadcrumbs')).to.have.lengthOf(1);
    expect(wrapper.find('#breadcrumbs').children()).to.have.lengthOf(0);
  });

  it ('returns at least 3 breadcrumbs when info.metadata is present', () => {
    const info = {
      metadata: {
        collection: 'boop',
        identifier: 'beep'
      }
    };
    const wrapper = shallow(<Breadcrumbs />);
    wrapper.setProps({ info });
    const numberOfLinks = wrapper.find('a').length;
    expect(numberOfLinks).to.be.at.least(3);
  })
});