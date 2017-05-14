module.exports = `import React from 'react';
  
class {{componentName}} extends React.Component {
  constructor() {
    super();       
  }
  
  render() {
    return (
      <div>
      </div>
    );
  }
  
  export default {{componentName}};
}
`;