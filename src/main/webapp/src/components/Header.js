import {translation} from './translations';


export default ({title, links, style}, index) =>{
    const currentPage = links.map(({href}) => {
        return (window.location.href.indexOf(href) > -1);

    });
    const textStyle={
        paddingLeft: 10,
        paddingRight: 10,
    };

    return <div style={{...style, borderBottom:currentPage.indexOf(true)>-1?'3px solid white':''}} key={index}><div style={textStyle}>{translation(title)}</div></div>;
}
