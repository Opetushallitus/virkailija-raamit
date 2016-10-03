import Translation from './Translations';

const style={
    paddingLeft: 10,
    ":hover": {
        backgroundColor: 'green',
    }
};


export default ({key,href}, index) =>{
    return <div className="links" key={index}><a href={href}><Translation trans={key}/></a></div>;
}
