import React, { Component } from 'react';
import 'normalize.css/normalize.css';

// import styles from './CraftFrame.module.css';

class CraftFrame extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      page: false,
      siteMeta: { updated: -1 }
    };
    this.key = 0;
    this.meta = {};
    this.components = {};
    this.refreshPage = this.refreshPage.bind(this);
    this.buildDomTree = this.buildDomTree.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.importComponents = this.importComponents.bind(this);
    this.getComponentIndex = this.getComponentIndex.bind(this);
    this.getComponentAndChildren = this.getComponentAndChildren.bind(this);
  }
  componentDidMount() {
    window.addEventListener('message', this.handleMsgRcvd);
    this.refreshPage();
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMsgRcvd);
  }
  
  refreshPage() {
    if (this.state.siteMeta.updated === -1) {
      return;
    }
    this.importComponents().then(() => {
      this.buildDomTree();
      this.setState({
        loading: false
      });
    });
  }

  getComponentIndex(componentName) {
    const { page } = this.state;
    return this.meta.pages[page].imports.indexOf(componentName);
  }
  
  importComponents() {
    console.log('Importing components needed to render page...');
    this.meta = this.state.siteMeta;
    const { page } = this.state;
    const componentImportArray = this.meta.pages[page].imports.map(componentName => {
      console.log(`>> importing ${componentName}...`);
      return import(`../components/${componentName}/${componentName}`);
    });
    return Promise.all(componentImportArray).then(importedComponents => {
      let index = this.getComponentIndex(this.meta.pages[page].root.componentName);
      this.components.root = {
        Module: importedComponents[index].default,
        props: this.meta.pages[page].root.props,
        children: this.meta.pages[page].root.children
      };
      for (let i = 0; i < this.meta.pages[page].components.length; i++) {
        console.log(
          'updating component:',
          this.meta.pages[page].components[i].componentName
        );
        const { id, props = '', children = [] } = this.meta.pages[page].components[i];
        const componentIndex = this.getComponentIndex(
          this.meta.pages[page].components[i].componentName
        );
        this.components[id] = {
          Module: importedComponents[componentIndex].default,
          props,
          children
        };
      }
    });
  }

  getComponentAndChildren(id) {
    const { Module, props = '{}', children = [] } = this.components[id];
    let childrenComponents = [];
    if (children && children.length > 0) {
      childrenComponents = children.map(childId => {
        return this.getComponentAndChildren(childId);
      });
    }
    return (
      <Module key={this.key++} {...JSON.parse(props)}>
        {childrenComponents.length > 0 ? childrenComponents : null}
      </Module>
    );
  }

  buildDomTree() {
    console.log('buildDomTree()...');
    this.rootComponent = this.getComponentAndChildren('root', 0);
  }


  handleMsgRcvd(msg) {
    if (msg.origin !== process.env.REACT_APP_MAIN_FRAME_URL) {
      return;
    }
    console.log('Craft msg rcvd:', msg.data);
    const {siteMeta, page } = msg.data;
    if (siteMeta.updated !== this.state.siteMeta.updated) {
      this.setState({
        siteMeta,
        page
      });
      this.refreshPage();
    }
  }

  render() {
    console.log('Rendering Craft...');
    return (
      <>
        {this.state.loading ? (
          'Loading'
        ) : (
          <div>
            {this.rootComponent}
            {/* {process.env.NODE_ENV === 'development' ? (
              <ComponentDrop page={this.meta.name} />
            ) : null} */}
          </div>
        )}
      </>
    );
  }
}

export default CraftFrame;
