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
        const {
          transkey,
          links,
          href,
          style,
          hover,
          show,
          hide,
          fade,
          fadingOut,
          media
        } = this.props;

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
            marginTop: 5,
            textDecoration:'none',
            color: 'white',
            borderLeft: headerBorderColor,
            boxSizing: 'border-box',
            textAlign: 'left',
            height:50
        };

        const textLinkStyle={
            textDecoration:'none',
            color: 'white',
        };

        const linkStyle={
            visibility:hover?'visible':'hidden',
            opacity: fade ? 100 : 0,
            height: hover?'85%':'0',
            backgroundColor: '#F6FCFF',
            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.20)',
            width:'100%',
            borderLeft: borderColor,
            textAlign: 'left',
            transition: 'opacity ease .3s'
        };

        return (
            <div style={{
                maxWidth: 300,
                flex: links ? 1 : '',
                pointerEvents: links && fadingOut ? 'none' : 'auto'
            }}>
                <div
                    style={{
                        ...style,
                        backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? '#1194bf' : '#159ECB',
                    }}
                    key={transkey}
                >
                    <div onMouseEnter={links ? show : null}
                         onMouseLeave={links ? hide : null}
                         style={{
                             ...textStyle,
                             backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? '#1194bf' : '',
                             borderBottom: media === 'desktop' && currentPage.indexOf(true) > -1 ? '5px solid #FFF' : ''
                         }}
                    >
                        {
                            href ?
                                <a className="nav-link" href={href} style={textLinkStyle}><Translation trans={transkey}/></a> : <Translation trans={transkey}/>
                        }
                    </div>
                </div>

                {links ?
                  <div onMouseEnter={show}
                       onMouseLeave={hide} style={linkStyle}>
                      {links ? links.map((item, ...rest) =>Link({...item}, hover, ...rest)) : ''}
                  </div> : ''
                }
            </div>
        );
    }
}
