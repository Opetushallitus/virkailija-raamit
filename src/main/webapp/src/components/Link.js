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
    verticalAlign: 'top',
    height: '100%',
    textDecoration: 'none',
    color: 'black'

};


export default ({key,href},hover, index) =>{
    return <a style={linkStyle} href={href}><div  className="links" key={index}><Translation trans={key}/></div></a>;
}
