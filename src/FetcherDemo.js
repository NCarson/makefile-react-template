
import React from 'react';
import PropTypes from 'prop-types';

import withFetcher from './withFetcher'
import PostgrestFetcher from './PostgrestFetcher'
import Query from './PostgrestQuery'
            

const Item = (props) => (<li>{props.name}</li>)
            
// returned data
const ChessFetchSuccess = (props) => {
    console.log(props)
    return(
    <div>
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

const fetcher = new PostgrestFetcher(true)
const host = 'https://devapi.chessindex.org'
const page = '/v_opening_var3_agg'
var query = new Query()
query.paginate(1, 5)

const DemoFetcher = (props) => {
    console.log(props);
    return(
    <ChessFetcher
        get={fetcher.get}
        url={host + page + query.toSearch()}
        url_config={query.toConfig()}
        {...props}
    />
)}

export default DemoFetcher
