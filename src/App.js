import React from 'react';
import ReactDOM from 'react-dom';
import Highlight from 'react-highlight'

import withUniversalRouter, {Link} from './withUniversalRouter'

import PagerDemo from './PagerDemo'
import FetcherDemo from './FetcherDemo'
import PagerFetcherDemo from './PagerFetcherDemo'

const fs = require('fs');
const pager_code = fs.readFileSync (__dirname + '/../src/' + 'PagerDemo.js', 'utf8')
const fetcher_code = fs.readFileSync (__dirname + '/../src/' + 'FetcherDemo.js', 'utf8')
const pager_fetcher_code = fs.readFileSync (__dirname + '/../src/' + 'PagerFetcherDemo.js', 'utf8')

const Demo = (props) => (
    <div className='demo-wrapper'>
        <h3>{props.title}</h3>
        <div className='demo-target-wrapper'>
            {props.children}
        </div>
        <Highlight className='javascript'>{props.source}</Highlight>
    </div>
)

class Location {
    constructor(href) {
        this.href = href
    }
}

const Home = () => (<div>Home</div>)

class HomeLocation extends Location {
    static route = '/';
    static component = Home
}

class PagerLocation extends Location {
    static route = '/pager';
    static component = PagerDemo
    static code = pager_code
    static title = 'Pager Demo'
}

class FetcherLocation extends Location {
    static route = '/fetcher';
    static component = FetcherDemo
    static code = fetcher_code
    static title = 'Fetcher Demo'
}

class PagerFetcherLocation extends Location {
    static route = '/pager_fetcher';
    static component = PagerFetcherDemo
    static code = pager_fetcher_code
    static title = 'Pager / Fetcher Demo'
}

const Routes = [HomeLocation, PagerLocation, FetcherLocation, PagerFetcherLocation]


const _App = (props) => {
    const loc = props.location
    var comp = React.createElement(props.component, {href: loc.href})
    if (loc.code) {
        comp = (
            <Demo title={loc.title} source={loc.code} >
                {comp}
            </Demo>
        )
    }
    return (
        <div>
            <ul>
                <li><Link  to='/'>Home</Link></li>
                <li><Link  to='/pager'>Pager</Link></li>
                <li><Link  to='/fetcher'>Fetcher</Link></li>
                <li><Link  to='/pager_fetcher'>Pager / Fetcher</Link></li>
                <li><Link  to='/test'>Location Test</Link></li>
            </ul>
            { comp }
        </div>
    )
}

const App = withUniversalRouter(_App, Routes, {debug:false})

ReactDOM.render(<App />, document.querySelector('#app'))


