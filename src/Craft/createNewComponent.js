const createNewComponent = (ui, index) => {
  return new Promise((resolve, reject) => {
    import(`../components/react/${ui}/components`).then(componentList => {
      console.log('%%%%%%%%%%%%%%%%%%% componentList=', componentList.default);
      const newComponent = componentList.default[index].component;
      if (newComponent) {
        resolve(newComponent);
      } else {
        reject();
      }
    });
  });
};

export default createNewComponent;
