import React from 'react'
import PropTypes from 'prop-types'

import {Location, QueryParam} from './Location.js'
import Pager from './Pager.js'

const ParamPage = new QueryParam((page, limit) => 'page: ' + page + ' limit: ' + limit, null, null)

class TestLocation extends Location {
    static params = {
        'p': ParamPage,
    }

    page() {
        return Number(this.search()['p'])
    }
    hrefByPage(page) {
        return this.hrefFromSearch({p:page})
    }
}


const PagerDemo = (props) => {
    const location = new TestLocation(props.href)
    return(
        <Pager
            href={props.href}
            count={5}
            hrefByPage={ location.hrefByPage.bind(location) // XXX watch the bind  
            }
        />
    )
}
PagerDemo.propTypes = {
    href: PropTypes.string.isRequired,
}
export default PagerDemo

