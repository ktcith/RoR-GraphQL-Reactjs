import React, { PropTypes } from 'react';
import classnames from 'classnames';
import svg4everybody from 'svg4everybody';

svg4everybody();

class BoardTileIcon extends React.Component {

  static propTypes = {
    container: PropTypes.oneOf(['default', 'circle']),
    fillColor: PropTypes.string, // #FF0000
    iconColor: PropTypes.string, // #FFFFFF
    category: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['x-small', 'small', 'large']),
    align: PropTypes.oneOf(['left', 'right']),
  };

  static defaultProps = {
    container: 'default',
    fillColor: '#FF0000',
    iconColor: '#FFFFFF',
    size: 'small',
    align: 'left'
  };

  render() {
    const { container, fillColor, iconColor,
      category, icon, size, align } = this.props;

    const containerClassName = classnames(
      'slds-icon__container',
      'slds-tile--board__icon',
      container === 'circle' ? 'slds-icon__container--circle' : null
    );

    const iconClassNames = classnames(
      {
        [`slds-icon--${size}`]: /^(x-small|small|large)$/.test(size),
        'slds-m-left--x-small': align === 'right',
        'slds-m-right--x-small': align === 'left',
      },
      ''
    );

    /* eslint max-len: 0 */
    const useHtml = `<use xlink:href="/images/icons/${category}-sprite/svg/symbols.svg#${icon}"></use>`;

    /* eslint react/no-string-refs:0 */
    /* eslint react/no-danger:0 */
    return (
      <span
        style={{ backgroundColor: iconColor }}
        className={containerClassName}
        ref="iconContainer"
      >
        <svg
          className={iconClassNames}
          aria-hidden
          dangerouslySetInnerHTML={{ __html: useHtml }}
          ref="svgIcon"
          style={{ fill: fillColor }}
        />
      </span>
    );
  }

}

module.exports = BoardTileIcon;
