import {translation} from './translations';

const style={
    paddingLeft: 10,
    ":hover": {
        backgroundColor: 'green',
    }
};


export default ({title,href}, index) =>{
    return <div className="links" key={index}><a href={href}>{translation(title)}</a></div>;
}
