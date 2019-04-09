import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Button } from '../../admin/client/App/elemental';

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
		const isOldCosImage = to.search('com/XiangX-App/product/') !== -1;
		const hasImageExtension = to.search('[.](jpg|jpeg|png)') !== -1;
		const isWechatAvatar = to.search('qlogo') !== -1;
		if (hasImageExtension || isOldCosImage || isWechatAvatar) {
			// image url
			return <img className={'ItemList__url--img'} src={to} width={"50"} />;
		} else {
			const xiangxStartIndex = to.search('/xiangx/');

			if (xiangxStartIndex !== -1) {
				// xiangx api
				const actionUrlToName = [
					{ url: '/xiangx/erp/upload_product', name: '上传到erp' },
					{ url: '/xiangx/cos/product_files', name: '所有图片' },
					{ url: /\/operations/, name: '操作' }
				];

				const actionMatched = actionUrlToName.find(function (action) {
					return to.search(action.url) !== -1;
				});

				if (actionMatched) {
					return <Button size="xsmall" target="_blank" href={to.substring(xiangxStartIndex)}>{actionMatched.name}</Button>;
				}
			}
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
