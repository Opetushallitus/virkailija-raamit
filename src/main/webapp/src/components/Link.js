import Translation from './Translations';

const style={
    paddingLeft: 10,
    ":hover": {
        backgroundColor: 'green',
    }
};


export default ({key,href}, index) =>{
    return <a href={href}><div className="links" key={index}><Translation trans={key}/></div></a>;
}
