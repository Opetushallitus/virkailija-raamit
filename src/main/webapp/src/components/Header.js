import Translation from './Translations';

const headerLinks={
    textDecoration: 'none',
    color: 'white',
};

export default ({key, links, href, style}, index) =>{
    var currentPage=[];
    if(links != undefined){
        currentPage = links.map(({href}) => {
            return (window.location.href.indexOf(href) > -1);

        });
    }
    if(href){
        currentPage = [(window.location.href.indexOf(href) > -1)];
    }
    const textStyle={
        paddingLeft: 10,
        paddingRight: 10,
    };

    return <div style={{...style, backgroundColor:currentPage.indexOf(true)>-1?'#1194bf':''}} key={index}>
            {href?

            <a href={href} style={headerLinks}><div style={textStyle}><Translation trans={key}/></div></a>:<div style={textStyle}><Translation trans={key}/></div>}

    </div>;
}
