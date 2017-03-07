var React = require('react');
var Layout = require('./layout.jsx');

var Component = React.createClass({
  render: function() {
    return (
      <Layout>
          Error code: {this.props.statusCode}
        <h1>  {this.props.errorTitle}</h1>
        <p>{this.props.errorMessage}</p>
        <p>
        {this.props.message}
        {this.props.validation}
        </p>
      </Layout>
    );
  }
});

module.exports = Component;