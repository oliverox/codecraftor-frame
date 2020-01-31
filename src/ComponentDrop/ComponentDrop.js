import React from 'react';

import styles from './ComponentDrop.module.css';

class ComponentDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragOver: false
    };
    this.componentDropRef = React.createRef();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
  }

  componentDidMount() {
    
  }

  handleDrop(e) {
    console.log('handleDrop()', e);
    // const { target, page } = this.props
    // const componentName = e.dataTransfer.getData('component')
    // // const queryString = `componentName=${componentName}&target=${target}&page=${page}`
    // // // fetch(`/_cc/add?${queryString}`).then(() => {
    // // //   this.setState({
    // // //     isDragOver: false,
    // // //   })
    // // // })
  }

  handleOnDragOver(e) {
    console.log('onDragOver()');
    // e.stopPropagation()
    e.preventDefault();
    return false;
  }

  handleOnDragEnter() {
    console.log('handleOnDragEnter()');
    this.setState({
      isDragOver: true
    });
  }

  handleOnDragLeave() {
    this.setState({
      isDragOver: false
    });
  }

  render() {
    console.log('rendering ComponentDrop...');
    const { dropText } = this.props;
    let cn = styles.dropContainer;
    if (this.state.isDragOver) {
      cn = `${cn} ${styles.isDragOver}`;
    }
    return (
      <div>
        {/* <div
          onDragStart={() => {
            console.log('onDragStart()');
          }}
          style={{width: 200, height: 100, backgroundColor: 'red'}}
        >
          
        </div> */}
        <div
          ref={this.componentDropRef}
          className={cn}
          onDrop={() => {
            console.log('onDrop');
          }}
          onDragOver={() => {
            console.log('onDragOver');
          }}
          onDragEnter={() => {
            console.log('onDragEnter');
          }}
          onDragLeave={() => {
            console.log('onDragLeave');
          }}
        >
          {dropText}
        </div>
      </div>
    );
  }
}

export default ComponentDrop;

ComponentDrop.defaultProps = {
  target: 'root',
  page: 'index',
  dropText: 'Drag & Drop Component Here'
};
