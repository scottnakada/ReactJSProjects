/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './ContactPage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Contact Us';

@withStyles(s)
class ContactPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>
            <a href="http://www.linkedin.com/in/scottnakada">
              <button type="button">Linked In</button>
            </a><br /><br />
            <a href="http://www.facebook.com/scottnakada">
              <button type="button">Facebook</button>
            </a><br /><br />
            <a href="mailto:scottnakada@gmail.com">
              <button type="button">scottnakada@gmail.com</button>
            </a><br /><br />
            <a href="tel:760-583-8366">
              <button type="button">760-583-8366</button>
            </a>
          </p>
        </div>
      </div>
    );
  }

}

export default ContactPage;
