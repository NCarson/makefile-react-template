
import Query from './PostgrestQuery'
import {Location, QueryParam, QueryEnumParam} from './Location.js'
import PostgrestFetcher from './PostgrestFetcher'


/****************************************************************************
 *  params
/****************************************************************************/

//sort
const ParamSortName = new QueryEnumParam('abc',     () => new Query().order('eco_name'), null, 'by Name')
const ParamSortPop = new QueryEnumParam('pop',      () => new Query().order('count', false), null, 'by Popularity')
const ParamSortWin = new QueryEnumParam('win',      () => new Query().order('win_pct', false), null, 'by Win %')
const ParamSortRating = new QueryEnumParam('rating',() => new Query().order('rating_mu', false) ,null , 'by Rating')
const ParamSortDiff = new QueryEnumParam('rdiff',   () => new Query().order('white_adv', true), null, 'by Rating Diff')

// 
const ParamSearch = new QueryParam( (v) => new Query().plfts('search', v), null, 'Search')
const ParamPage = new QueryParam(   (page, limit) => new Query().paginate(page, limit), null, null)

//url matches
const ParamID = new QueryParam(     (v) => new Query().eq('id', v), null, null)
const ParamName = new QueryParam(   (v) => new Query().order('name', v), null, null)

class FetcherLocation extends Location {

    static host = 'https://devapi.chessindex.org';


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

class BaseOpeningLocation extends FetcherLocation {

    static params = {
        'o': [
            ParamSortName,
            ParamSortPop,
            ParamSortWin,
            ParamSortRating,
            ParamSortDiff,
        ],
        'q': ParamSearch,
        'p': ParamPage,
    }

    static default_params = {
        'p': 1,
        'o': 'abc',
    }
}

/*

class OpeningSystemsLocation extends BaseOpeningLocation {

    static route = '/openings/';
    static component = OpeningSystems
    static display = 'Opening Systems';
    static view ='/v_opening_name_agg'

}

class OpeningSystemLocation extends BaseOpeningLocation {

    static route = '/opening/system/:name/';
    static component = OpeningSystem
    static display = 'Opening System';
    static view = '/v_opening_var3_agg'

}

class OpeningLocation extends BaseOpeningLocation {

    static route = '/opening/:id(\\d+)/';
    static component = Opening
    static display = 'Opening';
    static view ='/v_opening_var3_agg'
}

// TODO set 404 status
class NotFoundLocation extends Location {
    static route = '*'  
    static component = NotFound
    static display = 'Not Found'
}

class HomeLocation extends Location {
    static route = '/'  
    static component = Home
    static display = 'Home'
}

class OpeningStreamLocation extends Location {
    static route = '/opening/streamgraph/';
    static component = ChessStream
    static display = 'Opening Stream-Graph'
}

class OpeningSunburstLocation extends Location {
    static route = '/opening/sunburst/';
    static component = OpeningSunburst
    static display = 'Sunburst of Openings'
}
*/

