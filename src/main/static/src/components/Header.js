import React from 'react';
import Translation from './Translations';
import Link from './Link';
import { colors } from './colors';

export default class Header extends React.Component {
    render() {
        const {
          transkey,
          testEnvironment,
          isIE11,
          links,
          maxLinksLength,
          href,
          target,
          style,
          hover,
          show,
          hide,
          fade,
          fadingOut,
          media
        } = this.props;

        let currentPage = [];

        if (links !== undefined) {
            currentPage = links.map(({href}) => {
                return (window.location.href.indexOf(href) > -1);

            });
        }

        if (href) {
            currentPage = [(window.location.href.indexOf(href) > -1)];
        }

        const theme = testEnvironment ? colors.test : colors.production;

        const textStyle={
            paddingLeft: links ? 10 : 0,
            paddingRight: links ? 10 : 0,
            textDecoration:'none',
            color: 'white',
            borderLeft: theme.headerBorderColor,
            boxSizing: 'border-box',
            textAlign: 'left',
            height: 45,
            cursor: media === 'desktop' ? 'pointer' : '',
            backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.textBackground : '',
            borderBottom: media === 'desktop' && currentPage.indexOf(true) > -1 ? theme.textBorder : ''
        };

        const textLinkStyle={
            paddingLeft: 10,
            paddingRight: 10,
            height: 45,
            display: 'block',
            textDecoration:'none',
            color: 'white',
            boxSizing: 'border-box',
            backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.textLinkBackground : '',
            borderBottom: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.textLinkBorder : ''
        };

        const linkStyle={
            paddingTop: media === 'desktop' ? 5 : 0,
            paddingBottom: media === 'desktop' ? 5 : 0,
            flex: 1,
            visibility:hover ? 'visible' : 'hidden',
            opacity: fade ? 100 : 0,
            height: hover ? 'auto' : 0,
            borderLeft: theme.borderColor,
            textAlign: 'left',
            transition: 'opacity ease .3s'
        };

        const containerHeight = (isIE11) => {
            if (isIE11 && hover) {
                return (maxLinksLength * 55);
            }
            else if (hover) {
                return 'auto';
            }
            else {
                return '0';
            }
        };

        const containerStyle = {
            backgroundColor: '#FFF',
            height: links ? containerHeight(isIE11) : 40,
            flex: links ? 1 : '',
            display: links && media === 'desktop' ? 'flex' : 'block',
            flexDirection: 'column',
            pointerEvents: links && fadingOut ? 'none' : 'auto',
            boxShadow: links ? '' : 'inset 0 0 0 5px #159ECB',
            zIndex: links ? '' : 2
        };

        return (
            <div className="nav-container" style={containerStyle}>
                <div
                    style={{
                        ...style,
                      boxShadow: media === 'desktop' ? theme.tabBoxShadowLight : '',
                      backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.tabColorLight: theme.tabColorDark,
                    }}
                    key={transkey}
                >
                    <div
                        onMouseEnter={links ? show : null}
                        onMouseLeave={links ? hide : null}
                        style={textStyle}
                    >
                        {
                            href ?
                                <a
                                    className="nav-link"
                                    href={href}
                                    target={target}
                                    style={textLinkStyle}
                                >
                                    <Translation trans={transkey}/>
                                </a>
                                : <Translation trans={transkey}/>
                        }
                    </div>
                </div>

                {links ?
                    <div
                        className="nav-menu"
                        onMouseEnter={show}
                        onMouseLeave={hide} style={linkStyle}
                    >
                      {links ? links.map((item, ...rest) =>Link({...item}, hover, ...rest)) : ''}
                    </div> : ''
                }
            </div>
        );
    }
}
