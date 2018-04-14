import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

function ItemsTableValue ({
	className,
	component,
	empty,
	exterior,
	field,
	href,
	interior,
	padded,
	to,
	truncate,
	...props
}) {
	// TODO remove in the next release
	if (href) {
		console.warn('ItemsTableValue: `href` will be deprecated in the next release, use `to`.');
	}
	const linkRef = to || href;
	const Component = linkRef ? Link : component;

	props.className = classnames('ItemList__value', (
		field ? `ItemList__value--${field}` : null
	), {
		'ItemList__link--empty': empty,
		'ItemList__link--exterior': linkRef && exterior,
		'ItemList__link--interior': linkRef && interior,
		'ItemList__link--padded': linkRef && padded,
		'ItemList__value--truncate': truncate,
	}, className);
	props.to = linkRef;

	// Xiangx customization
	if (to) {
		const isImageUrl = to.search('[.](jpg|jpeg|png)') > 0;
		if (isImageUrl) {
			return <img className={'ItemList__url--img'} src={to} width={"50"} />;
		} else if (to.startsWith('/xiangx/erp/upload_product')) {
			return <a href={to}>上传到erp</a>;
		}
	}
	
	return <Component {...props} />;
};

ItemsTableValue.propTypes = {
	component: PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.func,
	]),
	empty: PropTypes.bool,
	exterior: PropTypes.bool, // FIXME this should be "external" e.g. an external link
	field: PropTypes.string,
	href: PropTypes.string, // TODO remove in next release
	interior: PropTypes.bool, // FIXME this should be "internal" e.g. an internal link
	padded: PropTypes.bool,
	to: PropTypes.string,
	truncate: PropTypes.bool,
};
ItemsTableValue.defaultProps = {
	component: 'div',
	truncate: true,
};

module.exports = ItemsTableValue;
