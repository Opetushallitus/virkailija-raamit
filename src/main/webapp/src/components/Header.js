import Translation from './Translations';
import Link from './Link';

const headerBorderColor = "1px solid #56B6D6";
const borderColor = "1px solid #F0F0F0";

const headerLinks={

};

export default ({key, links, href, style},hover, show, hide, index) =>{
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
        borderLeft: headerBorderColor,
        textDecoration:'none',
        color: 'white',

        textAlign: 'center',
        height:40
    };
    const textLinkStyle={
        textDecoration:'none',
        color: 'white',
    };

    const linkStyle={
        visibility:hover?'visible':'hidden',
        height: hover?'100%':'0',
        backgroundColor: 'white',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.20)',
        display:`inline-table`,
        width:'100%',
        borderLeft: borderColor,
    };


    return <div style={{...style}} key={index}>
            <div onMouseEnter={show}
                  onMouseLeave={hide} style={{...textStyle, backgroundColor:currentPage.indexOf(true)>-1?'#1194bf':''}}>
                {
                href?
                    <a href={href} style={textLinkStyle}><Translation trans={key}/></a>:<Translation trans={key}/>
                }
            </div>
        {links ?
            <div onMouseEnter={show}
                 onMouseLeave={hide} style={linkStyle}>
                {links ? links.map((item, ...rest) =>Link({...item}, hover, ...rest)) : ''}
            </div>:''
        }
    </div>;
}
