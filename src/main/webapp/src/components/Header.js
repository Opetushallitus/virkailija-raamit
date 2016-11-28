import Translation from './Translations';
import Link from './Link';

const headerBorderColor = "1px solid #56B6D6";
const borderColor = "1px solid #F0F0F0";

const headerLinks={

};

export default class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {transkey, links, href, style,hover, show, hide} = this.props;
        var currentPage = [];
        if (links != undefined) {
            currentPage = links.map(({href}) => {
                return (window.location.href.indexOf(href) > -1);

            });
        }
        if (href) {
            currentPage = [(window.location.href.indexOf(href) > -1)];
        }
        const textStyle={
            paddingLeft: 10,
            paddingRight: 10,
            borderLeft: headerBorderColor,
            textDecoration:'none',
            color: 'white',

            textAlign: 'left',
            height:40
        };
        const textLinkStyle={
            textDecoration:'none',
            color: 'white',
        };

        const linkStyle={
            visibility:hover?'visible':'hidden',
            height: hover?'85%':'0',
            backgroundColor: '#F6FCFF',
            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.20)',
            width:'100%',
            borderLeft: borderColor,
            textAlign: 'left',
        };
        return <div style={{...style}} key={transkey}>
            <div onMouseEnter={show}
                 onMouseLeave={hide}
                 style={{...textStyle, backgroundColor: currentPage.indexOf(true) > -1 ? '#1194bf' : ''}}>
                {
                    href ?
                        <a href={href} style={textLinkStyle}><Translation trans={transkey}/></a> : <Translation trans={transkey}/>
                }
            </div>
            {links ?
                <div onMouseEnter={show}
                     onMouseLeave={hide} style={linkStyle}>
                    {links ? links.map((item, ...rest) =>Link({...item}, hover, ...rest)) : ''}
                </div> : ''
            }
        </div>;
    }
}
7