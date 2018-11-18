import React from "react";
import PropTypes from "prop-types";

import { createLocation } from "history";


function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * The public API for rendering a history-aware <a>.
 */
class Link extends React.Component {

    handleClick(event, context) {
        if (this.props.onClick) this.props.onClick(event);

        if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore everything but left clicks
            !this.props.target && // let browser handle "target=_blank" etc.
            !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
            event.preventDefault();
			context.history.push;
            method(this.props.to);
        }
    }

    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    invariant(context, "You should not use <Link> outside a <Router>");

                    const location =
                        typeof to === "string"
                            ? createLocation(to, null, null, context.location)
                            : to;
                    const href = location ? context.history.createHref(location) : "";

                    return (
                        <a
                            {...props}
                            onClick={event => this.handleClick(event, context)}
                            href={href}
                            ref={innerRef}
                        />
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}

if (__DEV__) {
    const toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

    Link.propTypes = {
        innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        onClick: PropTypes.func,
        target: PropTypes.string,
        to: toType.isRequired
    };
}

export default Link;
