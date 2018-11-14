import React from 'react';
import firebase from 'firebase/app';
import SpinnerOverlay from '../components/SpinnerOverlay/SpinnerOverlay';
import createNewComponent from './createNewComponent';

class Craft extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      body: [],
      config: {}
    };
    this.pageRefreshed = true;
    this.unsubscribeFromSnapshot = false;
    this.updateCraft = this.updateCraft.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.updateAppConfig = this.updateAppConfig.bind(this);
    this.handleRemoteAction = this.handleRemoteAction.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
    this.docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Craft exists => Subscribe to onSnapshot');
          this.unsubscribeFromSnapshot = this.docRef.onSnapshot(
            this.handleRemoteAction
          );
          this.setState({
            isLoading: false
          });
        } else {
          console.log('Craft does not exist');
        }
      })
      .catch(err => {
        console.log('Error getting document.', err);
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  addComponent(componentMeta) {
    console.log('addComponent:', componentMeta);
    const ui = this.state.config.uiToolkit;
    return createNewComponent(ui, componentMeta.index).then(NewComponent => {
      const { body } = this.state;
      const newBody = body.slice();
      const { props } = componentMeta;
      const propsObj = {};
      Object.keys(props).forEach(key => {
        if (key !== 'children') {
          propsObj[key] = props[key].value || props[key].default;
        }
      });
      propsObj.key = newBody.length;
      newBody.push(
        React.createElement(
          NewComponent,
          { ...propsObj },
          props.children.value || props.children.default
        )
      );
      console.log('newBody=', newBody);
      this.setState({
        body: newBody
      });
    });
  }

  updateAppConfig(config, doUpdateCraft = false) {
    console.log('App config updated:', config);
    const newConfig = Object.assign(this.state.config, config);
    this.setState({
      config: newConfig
    });
    if (doUpdateCraft) {
      this.updateCraft();
    }
  }

  updateCraft() {
    this.setState({
      body: []
    });
    this.docRef.get().then(doc => {
      const { actions } = doc.data();
      if (actions.length > 0) {
        actions
          .filter(act => act.action === 'ADD')
          .forEach(act => {
            this.addComponent({
              index: act.index,
              label: act.label,
              props: act.props || {}
            });
          });
      }
    });
  }

  handleRemoteAction(doc) {
    let updates = doc.data();
    console.log('handleRemoteAction() - updates=', updates);
    if (this.pageRefreshed) {
      this.pageRefreshed = false;
      console.log('Rebuild craft with', updates);
      this.updateAppConfig(updates.config, true);
    } else {
      if (updates.actions.length > 0) {
        const latestUpdate = updates.actions[updates.actions.length - 1];
        console.log('New update: ', latestUpdate);
        switch (latestUpdate.action) {
          case 'ADD':
            this.addComponent({
              index: latestUpdate.index,
              label: latestUpdate.label,
              props: latestUpdate.props
            });
            break;

          case 'CONFIG':
            // Any config update is purely a global css update at this point
            this.updateAppConfig(latestUpdate, false);
            break;

          case 'UPDATE':
            this.updateCraft();
            break;

          default:
            break;
        }
      } else {
        this.updateAppConfig(updates.config, true);
      }
    }
  }

  render() {
    const { isLoading, config } = this.state;
    if (isLoading) {
      return (
        <React.Fragment>
          <SpinnerOverlay isOpen={isLoading} />
        </React.Fragment>
      );
    } else {
      if (config.uiToolkit === 'blueprint') {
        import(`${process.env.REACT_APP_BLUEPRINT_ICONS_CSS}`);
        import(`${process.env.REACT_APP_BLUEPRINT_CORE_CSS}`);
      }
      if (config.globalCss && config.globalCss !== false) {
        if (config.globalCss.backgroundColor) {
          document.body.style.backgroundColor =
            config.globalCss.backgroundColor;
        }
      }
      return <React.Fragment>{this.state.body}</React.Fragment>;
    }
  }
}

export default Craft;
