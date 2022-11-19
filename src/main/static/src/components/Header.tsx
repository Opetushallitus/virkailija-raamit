import React from 'react';
import Translation from './Translations';
import Link from './Link';
import {colors} from './colors';

type Props = {
    transkey: any;
    testEnvironment: any;
    links?: any;
    maxLinksLength?: any;
    href: any;
    target: any;
    style: any;
    hover?: any;
    show?: any;
    hide?: any;
    fade?: any;
    fadingOut?: any;
    media?: any;
}
export default class Header extends React.Component<Props,{}> {
    render() {
        const {
            transkey,
            testEnvironment,
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

        let currentPage: any[] = [];

        if (links !== undefined) {
            currentPage = links.map(({href}) => {
                return (window.location.href.indexOf(href) > -1);

            });
        }

        if (href) {
            currentPage = [(window.location.href.indexOf(href) > -1)];
        }

        const theme = testEnvironment ? colors.test : colors.production;

        const textStyle: any = {
            paddingLeft: links ? 10 : 0,
            paddingRight: links ? 10 : 0,
            textDecoration: 'none',
            color: 'white',
            borderLeft: theme.headerBorderColor,
            boxSizing: 'border-box',
            textAlign: 'left',
            height: 45,
            cursor: media === 'desktop' ? 'pointer' : '',
            backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.textBackground : '',
            borderBottom: media === 'desktop' && currentPage.indexOf(true) > -1 ? theme.textBorder : ''
        };

        const textLinkStyle: any = {
            paddingLeft: 10,
            paddingRight: 10,
            height: 45,
            display: 'block',
            textDecoration: 'none',
            color: 'white',
            boxSizing: 'border-box',
            backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.textLinkBackground : '',
            borderBottom: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.textLinkBorder : ''
        };

        const linkStyle: any = {
            paddingTop: media === 'desktop' ? 5 : 0,
            paddingBottom: media === 'desktop' ? 5 : 0,
            flex: 1,
            visibility: hover ? 'visible' : 'hidden',
            opacity: fade ? 100 : 0,
            height: hover ? 'auto' : 0,
            borderLeft: theme.borderColor,
            textAlign: 'left',
            transition: 'opacity ease .3s'
        };

        const containerHeight = () => {
            if (hover) {
                return 'auto';
            } else {
                return '0';
            }
        };

        const containerStyle: any = {
            backgroundColor: '#FFF',
            height: links ? containerHeight() : 40,
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
                        backgroundColor: media !== 'desktop' && currentPage.indexOf(true) > -1 ? theme.tabColorLight : theme.tabColorDark,
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
                        {links ? links.map((item) => <Link key={item.key} translationKey={item.key} resolvedHref={item.resolvedRef}/>) : ''}
                    </div> : ''
                }
            </div>
        );
    }
}
