import React from 'react';
import LD from 'LD';
import CopyToClipboard from 'react-copy-to-clipboard';

class CopyPasteExportButton extends React.Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onCopy: React.PropTypes.func,
  };

  static defaultProps = {
    onCopy: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      copied: false,
    };
    // Try to fix problem where it copies with a span and HTML type
    document.addEventListener('copy', e => {
      console.log("custom copy handler", e, this.props.text);
      e.clipboardData.setData('text/plain', this.props.text);
      e.preventDefault();
    });
  }

  handleCopy = () => {
    this.setState({ copied: true });
    this.props.onCopy();
  };

  render() {
    const { text, showTextArea } = this.props;
    return (
      <div>
        <LD.Text category="body" type="medium">
          {
            showTextArea ? (
              "Copy the text below and paste into spreadsheet:"
            ) : (
              "Click the button below to copy data, then paste into spreadsheet:"
            )
          }
        </LD.Text>
        <div className="slds-m-top--medium">
          <CopyToClipboard text={text} onCopy={this.handleCopy}>
            <LD.Button
              type='brand'
            >
              Copy Data to Clipboard
            </LD.Button>
          </CopyToClipboard>
          {this.state.copied && <span style={{ color: "red" }}>&nbsp;Copied!</span>}
        </div>
        {showTextArea && (
          <div className="slds-m-top--medium">
            <textarea cols="50" rows="4" value={text || ""} readOnly />
          </div>
        )}
      </div>
    );
  }

}

module.exports = CopyPasteExportButton;
