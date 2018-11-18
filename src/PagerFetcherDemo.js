
import React from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs'

import withFetcher from './withFetcher'
import PostgrestFetcher from './PostgrestFetcher'
import Query from './PostgrestQuery'

import {Location, QueryParam} from './Location.js'
import Pager from './Pager.js'

const ParamPage = new QueryParam((page, limit) => new Query().paginate(page, limit || 10 ), null, null)

class TestLocation extends Location {

    static params = {
        'p': ParamPage,
    }
    static default_params = {
        'p': 1
    }
    static host = 'https://devapi.chessindex.org';
    static view = '/v_opening_var3_agg'

    constructor(href) {
        super(href)
        this.fetcher = new PostgrestFetcher(true)
    }

    page() {
        return Number(this.search()['p'])
    }

    hrefByPage(page) {
        return this.hrefFromSearch({p:page})
    }

    query() {
        var query = new Query()
        this.matches().forEach(q => {query.combine(q)})
        return query
    }

    apiUrl() {
        return this.constructor.host + this.constructor.view + this.query().toSearch()
    }
}

const Item = (props) => (<li>{props.name}</li>)

// returned data
const ChessFetchSuccess = (props) => {

    const location = new TestLocation(props.href)
    return(
    <div>
        <Pager
            href={props.href}
            count={5}
            hrefByPage={ location.hrefByPage.bind(location) // XXX watch the bind  
            }
        />
        <ul>
        { props.data.map(item => {
                item.key=item.id; 
                return React.createElement(Item, item)
            }
        )}
        </ul>
    </div>
)}
ChessFetchSuccess.propTypes = {
    data: PropTypes.object.isRequired,
}

const ChessFetchError= () => {return(
    <div>error</div>
)}

const ChessFetchLoading= () => {return(
    <div>loading</div>
)}

//const ChessFetcher = withFetcher(FetchSuccess, FetchLoading, FetchFailed, FetchTimedOut)
const ChessFetcher = withFetcher(ChessFetchSuccess, ChessFetchLoading, ChessFetchError)

const PagerFetcherDemo = (props) => {

    const location = new TestLocation(props.href)
    return (
        <ChessFetcher
            get={location.fetcher.get}
            url={location.apiUrl()}
            url_config={location.query().toConfig()}
            {...props}
        />
    )
}

PagerFetcherDemo.propTypes = {
    href: PropTypes.string.isRequired,
}

export default PagerFetcherDemo


