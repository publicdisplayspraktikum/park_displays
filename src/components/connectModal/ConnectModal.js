import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ConnectModal.module.scss';

class ConnectModal extends Component {
  render() {
    return (
      <div className={styles['modalWrapper']}>
        <div className={styles['modalInner']}>
          <div style={{display: 'flex', marginBottom: 16}}>
            <h3 style={{margin: 0}}>Connect</h3>
            <div style={{flexGrow: 1}}></div>
            <FontAwesomeIcon icon="times" />
          </div>
          <form>
            <div>
              <input type="text" placeholder="E-Mail"/>
            </div>
            <div>
              <input type="password" placeholder="Password"/>
            </div>
            <button>Log In</button>
          </form>
          <div>
            <button>Social 1</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectModal;