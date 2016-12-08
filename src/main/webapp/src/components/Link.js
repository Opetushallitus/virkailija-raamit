import Translation from './Translations';

const style={
    paddingLeft: 10,
    ":hover": {
        backgroundColor: 'green',
    }
};
const linkStyle={


    //wordBreak: 'break-all',

    maxWidth:300,
    fontSize: 14,
    verticalAlign: 'top',
    height: '100%',
    textDecoration: 'none',
    color: 'black',
    backgroundColor: '#F6FCFF'
};
//
//const style = {
//    display: 'block'
//};

export default ({key,href},hover, index) =>{
    return <a className="nav-link" style={linkStyle} href={href}><div  className="links" key={index}><Translation trans={key}/></div></a>;
}
