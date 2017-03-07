var React = require('react');

var Component = React.createClass({
  render: function() {
    return (
      <html>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = Component;